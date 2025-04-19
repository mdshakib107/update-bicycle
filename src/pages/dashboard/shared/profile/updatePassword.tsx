/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import { LockOutlined } from "@ant-design/icons";
import { Flex, Form, Input } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link } from "react-router-dom";
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
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 border rounded shadow-md border-purple-600 shadow-purple-600">
        <Form
          form={form}
          name="change-password"
          style={{ maxWidth: 360 }}
          onFinish={handleSubmit}
        >
          <Form.Item>
            <Flex justify="start" align="center">
              <Link to="/login">🔙 Back</Link>
            </Flex>
          </Form.Item>

          <label>Old Password</label>
          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Old Password"
            />
          </Form.Item>

          <label>New Password</label>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please enter a new password" },
              { min: 4, message: "Minimum 4 characters required" },
              { max: 20, message: "Maximum 20 characters allowed" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter new password"
            />
          </Form.Item>

          <label>Confirm New Password</label>
          <Form.Item
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
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <CustomButton
              type="submit"
              className="w-full !py-1.5"
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
      </div>
    </div>
  );
};

export default UpdatePassword;
