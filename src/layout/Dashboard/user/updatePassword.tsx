// pages/ForgotPassword.tsx
import CustomButton from "@/components/shared/CustomButton";
import { LockOutlined } from "@ant-design/icons";
import { Flex, Form, Input } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../redux/api/authApi";

const updatePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const toastId = toast.loading("Changing password...");

    try {
      await changePassword(values).unwrap();
      toast.success("Password changed successfully!", { id: toastId });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          name="forgot-password"
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
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
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Old Password"
            />
          </Form.Item>

          <label>New Password</label>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item>
            <CustomButton
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

export default updatePassword;
