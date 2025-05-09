import CustomButton from "@/components/shared/CustomButton";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { LockOutlined } from "@ant-design/icons";
import { Card, Form, Input, Typography } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const { Title, Text } = Typography;

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const toastId = toast.loading("Updating...");

    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match!", { id: toastId });
      return;
    }

    try {
      const res = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      toast.success("Password changed!", { id: toastId });

      if (res?.token) {
        localStorage.setItem("authToken", res.token);
      }

      form.resetFields();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Error updating password", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card
        bordered={false}
        className="w-full max-w-2xl shadow-md bg-white p-8 rounded-lg"
      >
        <Title level={3} className="text-center text-blue-700 mb-8">
          Change Your Password
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Enter your current password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Current password"
              size="large"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Enter new password" },
                { min: 4, message: "At least 4 characters" },
                { max: 20, message: "At most 20 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Confirm your password" },
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
                prefix={<LockOutlined />}
                placeholder="Confirm new password"
                size="large"
              />
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <CustomButton
              type="submit"
              className="w-full !py-2 text-base font-semibold"
              textName={
                isLoading ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Update Password"
                )
              }
            />
          </Form.Item>
        </Form>

        <div className="text-center mt-4 text-gray-500 text-sm">
          <Text>Choose a strong and unique password for better security.</Text>
        </div>
      </Card>
    </div>
  );
};

export default UpdatePassword;
