/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../../redux/api/authApi";

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  // 🛠️ Handle form submission
  const handleSubmit = async (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const toastId = toast.loading("Changing password...");

    // frontend validation
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match!", { id: toastId });
      return;
    }

    try {
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      const res = await changePassword(payload).unwrap();
      toast.success("Password changed successfully!", { id: toastId });

      if (res?.token) {
        localStorage.setItem("authToken", res.token);
      }

      form.resetFields();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full bg-gray-50">
      <div className="p-8  bg-white w-full max-w-md">
        <Form
          form={form}
          name="change-password"
          style={{ maxWidth: 360 }}
          onFinish={handleSubmit}
          className="space-y-4 flex flex-col items-center w-full"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Update Password
          </h2>

          <label className="text-gray-700 font-medium w-full">Old Password</label>
          <Form.Item
            name="oldPassword"
            className="w-full"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Old Password"
              className="py-2"
            />
          </Form.Item>

          <label className="text-gray-700 font-medium w-full">New Password</label>
          <Form.Item
            name="newPassword"
            className="w-full"
            rules={[
              { required: true, message: "Please enter a new password" },
              { min: 4, message: "Minimum 4 characters required" },
              { max: 20, message: "Maximum 20 characters allowed" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter new password"
              className="py-2"
            />
          </Form.Item>

          <label className="text-gray-700 font-medium w-full">
            Confirm New Password
          </label>
          <Form.Item
            className="w-full"
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm new password"
              className="py-2"
            />
          </Form.Item>

          <Form.Item>
            <CustomButton
              type="submit"
              className="w-full !py-2.5 text-base font-medium"
              textName={
                isLoading ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Change Password"
                )
              }
            />
          </Form.Item>
        </Form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Make sure your password is strong and unique</p>
          <p className="mt-1">Minimum 4 characters, maximum 20 characters</p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
