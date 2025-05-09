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
import { Card, Divider, Form, Input, Select, Typography } from "antd";
import { useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const { Title } = Typography;
const { Option } = Select;

const ManageProfile = () => {
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;

  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  const [updateUser, { isLoading: isSubmitting }] = useUpdateUserMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data?.data) {
      const user = data.data;
      form.setFieldsValue({
        ...user,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : undefined,
      });
    }
  }, [data, form]);

  const onProfileUpdate = async (values: any) => {
    try {
      await updateUser({ userId: userId!, updateData: values }).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
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

  const sectionCard = (title: string, fields: React.ReactNode) => (
    <Card
      className="shadow-md"
      title={<span className="font-semibold text-lg">{title}</span>}
    >
      {fields}
    </Card>
  );

  return (
    <div className="min-h-screen w-[90%] mx-auto pb-16">
      <ProfileHeader data={data} />
      <div className="mt-12 space-y-10">
        <Title level={3} className="text-center text-blue-700">
          Edit Your Profile
        </Title>

        <Form layout="vertical" form={form} onFinish={onProfileUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Personal Info */}
            {sectionCard(
              "Personal Info",
              <>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name="gender" label="Gender">
                  <Select placeholder="Select gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="dateOfBirth" label="Date of Birth">
                  <Input type="date" />
                </Form.Item>
              </>
            )}

            {/* Contact Info */}
            {sectionCard(
              "Contact Info",
              <>
                <Form.Item name="phone" label="Phone">
                  <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item name="emergencyContact" label="Emergency Contact">
                  <Input placeholder="Emergency number" />
                </Form.Item>
                <Form.Item name="image" label="Image URL">
                  <Input placeholder="Link to profile image" />
                </Form.Item>
                <Form.Item name="bloodGroup" label="Blood Group">
                  <Input placeholder="Your blood group" />
                </Form.Item>
              </>
            )}

            {/* Address Info */}
            {sectionCard(
              "Address Info",
              <>
                <Form.Item name="address" label="Street Address">
                  <Input.TextArea rows={4} placeholder="Your address" />
                </Form.Item>
                <Form.Item name="country" label="Country">
                  <Input placeholder="Country name" />
                </Form.Item>
                <Form.Item name="city" label="City">
                  <Input placeholder="City name" />
                </Form.Item>
                <Form.Item name="state" label="State">
                  <Input placeholder="State name" />
                </Form.Item>
                <Form.Item name="zipCode" label="Zip Code">
                  <Input placeholder="Postal code" />
                </Form.Item>
              </>
            )}
          </div>

          <Divider />
          <Form.Item className="mt-8 text-center">
            <CustomButton
              type="submit"
              className="w-full md:w-1/2 lg:w-1/3 mx-auto block"
              textName={
                isSubmitting ? (
                  <TbFidgetSpinner className="animate-spin text-xl" />
                ) : (
                  "Save Changes"
                )
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ManageProfile;
