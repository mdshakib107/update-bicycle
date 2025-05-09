/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import Loading from "@/components/shared/Loading";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Form, Input, Select, Typography } from "antd";
import { useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const { Title } = Typography;

const ManageProfile = () => {
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;
  // const isAdmin = user?.role === "admin";

  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isSubmitting }] = useUpdateUserMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.data) {
      const {
        name,
        email,
        image,
        address,
        phone,
        bloodGroup,
        emergencyContact,
        gender,
        dateOfBirth,
        country,
        city,
        state,
        zipCode,
      } = data.data;
      form.setFieldsValue({
        name,
        email,
        image,
        address,
        phone,
        bloodGroup,
        emergencyContact,
        gender,
        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth).toISOString().split("T")[0]
          : null,
        country,
        city,
        state,
        zipCode,
      });
    }
  }, [data, form]);

  const handleSubmit = async (values: any) => {
    try {
      await updateUser({ userId: userId!, updateData: values }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Cover image + Avatar */}
      <ProfileHeader data={data} />

      <div className="flex justify-center items-center w-full mt-10 px-6">
        <div className="space-y-20 w-full">
          <Title level={3} className="text-center mb-6">
            Update Account
          </Title>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input placeholder="Enter name" />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                  label="Image URL"
                  name="image"
                  rules={[
                    {
                      required: false,
                      message: "Please Give a valid image URL",
                    },
                  ]}
                >
                  <Input placeholder="Enter image URL" />
                </Form.Item>

                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    { required: false, message: "Please enter your address" },
                  ]}
                >
                  <Input.TextArea placeholder="Enter address" rows={5} />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[
                    {
                      required: false,
                      message: "Please enter your date of birth",
                    },
                  ]}
                >
                  <Input
                    type="date"
                    className="w-full"
                    onChange={(e) => {
                      form.setFieldValue("dateOfBirth", e.target.value);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    { required: false, message: "Please enter your gender" },
                  ]}
                >
                  <Select placeholder="Select gender">
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: false,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                  label="Blood Group"
                  name="bloodGroup"
                  rules={[
                    {
                      required: false,
                      message: "Please enter your blood group",
                    },
                  ]}
                >
                  <Input placeholder="Enter blood group" />
                </Form.Item>

                <Form.Item
                  label="Emergency Contact"
                  name="emergencyContact"
                  rules={[
                    {
                      required: false,
                      message: "Please enter your emergency contact",
                    },
                  ]}
                >
                  <Input placeholder="Enter emergency contact" />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[
                    { required: false, message: "Please enter your country" },
                  ]}
                >
                  <Input placeholder="Enter country" />
                </Form.Item>

                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: false, message: "Please enter your city" },
                  ]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>

                <Form.Item
                  label="State"
                  name="state"
                  rules={[
                    { required: false, message: "Please enter your state" },
                  ]}
                >
                  <Input placeholder="Enter state" />
                </Form.Item>

                <Form.Item
                  label="Zip Code"
                  name="zipCode"
                  rules={[
                    { required: false, message: "Please enter your zip code" },
                  ]}
                >
                  <Input placeholder="Enter zip code" />
                </Form.Item>
              </div>
            </div>

            <Form.Item>
              <CustomButton
                type="submit"
                className="w-full"
                textName={
                  isSubmitting ? (
                    <TbFidgetSpinner className="animate-spin" />
                  ) : (
                    "Update Profile"
                  )
                }
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
