import CustomButton from "@/components/shared/CustomButton";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterMutation } from "../../redux/features/auth/authApi"; // Import register mutation

const Register = () => {
  // useRegister mutation hook
  const [register, { isLoading }] = useRegisterMutation();

  // navigation
  const navigate = useNavigate();

  // onFinish function for submitting the form
  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const toastId = toast.loading("Registering...");

    const userInfo = {
      name: values?.name,
      email: values?.email,
      password: values?.password,
    };
    console.log(userInfo);
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match", { id: toastId });
      return;
    }

    try {
      const res = await register(userInfo).unwrap();

      if (res) {
        toast.success("Registration successful. Please log in.", {
          id: toastId,
          duration: 2000,
        });

        navigate("/login"); // Navigate to login after registration
      } else {
        toast.error("Failed to verify Registration", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.data.stack);
      toast.error(`${error?.data?.message || "Something went wrong!"}`, {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 border rounded shadow-md border-purple-600 shadow-purple-600">
        <Form
          name="register"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          {/* Name */}
          <label>Name</label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input prefix={<UserOutlined />} type="text" placeholder="Name" />
          </Form.Item>

          {/* Email */}
          <label>Email</label>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
          </Form.Item>

          {/* Password */}
          <label>Password</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <label>Confirm Password</label>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your Password!" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          {/* Remember Me */}
          {/* <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Flex>
          </Form.Item> */}

          {/* Register Button */}
          <Form.Item>
            <CustomButton
              className="w-full !py-1.5"
              textName={
                isLoading ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Register"
                )
              }
            />
            <p className="text-center mt-2">
              Already have an account? <Link to="/login">Log in now!</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
