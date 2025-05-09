/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import Loading from "@/components/shared/Loading";
import { verifyToken } from "@/utils/verifyToken";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/images/logo/logo.png";
import { useRegisterMutation } from "../../redux/api/authApi";

const Register = () => {
  //* useRegister mutation hook
  const [register, { isLoading }] = useRegisterMutation();

  //* loading effect state
  const [redirecting, setRedirecting] = useState(false);

  //* navigation
  const navigate = useNavigate();

  //* onFinish function for submitting the form
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

        navigate("/login");
      } else {
        toast.error("Failed to verify Registration", { id: toastId });
      }
    } catch (error: any) {
      toast.error(`${error?.data?.message || "Something went wrong!"}`, {
        id: toastId,
      });
    }
  };

  //* Check if the user is already logged in when the component is mounted
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      const user = verifyToken(token);
      if (user) {
        setRedirecting(true);

        const timeout = setTimeout(() => {
          toast.info("You are already logged in!");
          navigate("/");
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }
  }, [navigate]);

  //* loading
  if (redirecting) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-8 text-center flex justify-around items-center">
            <NavLink to="/">
              <img
                src={logo}
                alt="logo"
                className="w-[60px] border-2 border-purple-600 rounded-full"
              />
            </NavLink>
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h1>
              <p className="text-purple-100">Join us and start your journey</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <Form
              name="register"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              {/* Name Field */}
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-purple-500" />}
                  placeholder="Full Name"
                  className="rounded-lg hover:border-purple-500 focus:border-purple-500 transition-colors"
                />
              </Form.Item>

              {/* Email Field */}
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
                <Input
                  prefix={<MailOutlined className="text-purple-500" />}
                  placeholder="Email"
                  className="rounded-lg hover:border-purple-500 focus:border-purple-500 transition-colors"
                />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-purple-500" />}
                  placeholder="Password"
                  className="rounded-lg hover:border-purple-500 focus:border-purple-500 transition-colors"
                />
              </Form.Item>

              {/* Confirm Password Field */}
              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-purple-500" />}
                  placeholder="Confirm Password"
                  className="rounded-lg hover:border-purple-500 focus:border-purple-500 transition-colors"
                />
              </Form.Item>

              {/* Register Button */}
              <Form.Item>
                <CustomButton
                  type="submit"
                  className="w-full !py-2.5 !rounded-lg transition-colors !text-white !font-semibold !text-base"
                  textName={
                    isLoading ? (
                      <TbFidgetSpinner className="animate-spin mx-auto" />
                    ) : (
                      "Create Account"
                    )
                  }
                />
              </Form.Item>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                  >
                    Log in now!
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>

        {/* Back to Home Link */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mt-6 text-purple-600 hover:text-purple-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
