/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import Loading from "@/components/shared/Loading";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { 
  Form,
   Input, 
  //  Select, 
   Typography 
} from "antd";
import { useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const { Title } = Typography;
// const { Option } = Select;

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
      const { name, email, image } = data.data;
      form.setFieldsValue({ name, email, image });
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
    <div className="flex justify-center items-center w-full">
      <div className="p-8 border rounded shadow-md border-purple-600 shadow-purple-600 w-full max-w-2xl">
        <Title level={3} className="text-center mb-6">
          Update Account
        </Title>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please Give a valid image URL" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          {/* 
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 4, message: "Minimum 4 characters required" },
              { max: 20, message: "Maximum 20 characters allowed" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item> */}

          {/* {isAdmin && (
            <>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select role" }]}
              >
                <Select>
                  <Option value="admin">Admin</Option>
                  <Option value="customer">Customer</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="banned">Banned</Option>
                </Select>
              </Form.Item>
            </>
          )} */}

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
  );
};

export default ManageProfile;
