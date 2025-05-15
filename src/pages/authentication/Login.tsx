import CustomButton from "@/components/shared/CustomButton";
import Loading from "@/components/shared/Loading";
import {
  CrownOutlined,
  LockOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox, Flex, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/images/logo/logo.png";
import { useLoginMutation } from "../../redux/api/authApi";
import { setUser, TUserFromToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  //* useLogin mutation hook
  const [login, { isLoading }] = useLoginMutation();

  //* navigation
  const navigate = useNavigate();

  //* useAppDispatch hook
  const dispatch = useAppDispatch();

  //* loading effect state
  const [redirecting, setRedirecting] = useState(false);

  //* onFinish function for submitting the form
  const onFinish = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    // console.log("Received values of form: ", values);

    const toastId = toast.loading("Logging in...");

    const userInfo = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.token);

      if (user) {
        dispatch(
          setUser({
            user: res?.data as TUserFromToken,
            token: res?.token,
          })
        );

        //! Persist token based on "remember me"
        if (values.remember) {
          localStorage.setItem("authToken", res.token);
          localStorage.setItem("userData", JSON.stringify(res.data));
          sessionStorage.setItem("authToken", res.token);
          sessionStorage.setItem("userData", JSON.stringify(res.data));
        } else {
          localStorage.setItem("authToken", res.token);
          localStorage.setItem("userData", JSON.stringify(res.data));
        }

        toast.success("Logged in successfully", {
          id: toastId,
          duration: 2000,
        });

        navigate("/");
      } else {
        toast.error("Failed to verify", { id: toastId });
        return <Navigate to="/login" replace={true} />;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log('error',error)
      toast.error(`${error?.data?.message || "Something went wrong!"}`, {
        id: toastId,
      });
      return <Navigate to="/login" replace={true} />;
    }
  };

  //* Check if the user is already logged in when the component is mounted
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      const user = verifyToken(token); //? You can verify if the token is valid here
      if (user) {
        setRedirecting(true); //? Trigger Loading state

        //* Delay the navigation by 1 second (1000 ms)
        const timeout = setTimeout(() => {
          toast.info("You are already logged in!");
          //* If the token is valid, redirect to home
          navigate("/");
        }, 1000);

        //* Optional: clear timeout if the component unmounts before it completes
        return () => clearTimeout(timeout);
      }
    }
  }, [navigate]); //? Empty dependency array to run once when the component is mounted

  //* Quick login function
  const handleQuickLogin = (email: string) => {
    onFinish({
      email,
      password: "1234",
      remember: true,
    });
  };

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
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-8 text-center flex justify-around items-center">
            <NavLink to="/">
              {/* <MdDashboard className="h-20px w-20px" /> */}
              {/* logo */}
              <img
                src={logo}
                alt="logo"
                className="w-[60px] border-2 border-purple-600 rounded-full"
              />
            </NavLink>
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-purple-100">
                Sign in to continue your journey
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
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
                  prefix={<UserOutlined className="text-purple-500" />}
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

              {/* Remember Me & Forgot Password */}
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-600 hover:text-purple-600 transition-colors">
                      Remember me
                    </Checkbox>
                  </Form.Item>
                  {/* <Link
                    to="/forgot-password"
                    className="text-blue-500 hover:text-purple-600 transition-colors"
                  >
                    Forgot password?
                  </Link> */}
                </Flex>
              </Form.Item>

              {/* Login Button */}
              <Form.Item>
                <CustomButton
                  type="submit"
                  className="w-full !py-2.5 !rounded-lg transition-colors !text-white !font-semibold !text-base"
                  textName={
                    isLoading ? (
                      <TbFidgetSpinner className="animate-spin mx-auto" />
                    ) : (
                      "Sign In"
                    )
                  }
                />
              </Form.Item>

              {/* Quick Login Buttons */}
              <div className="space-y-3 mt-4">
                <p className="text-center text-gray-500 text-sm">Quick Login</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("mina@mail.com")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <CrownOutlined />
                    <span>Admin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("nina@mail.com")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <UserAddOutlined />
                    <span>User</span>
                  </button>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                  >
                    Register now!
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

export default Login;
