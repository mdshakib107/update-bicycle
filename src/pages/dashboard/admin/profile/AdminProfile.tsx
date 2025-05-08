import Loading from "@/components/shared/Loading";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Card, Descriptions, Tag } from "antd";
import {
  AlertOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  CrownOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  GlobalOutlined,
  HeartOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
  PhoneOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProfileHeader from "@/components/shared/ProfileHeader";

const AdminProfile = () => {
  //* Get full user from Redux
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;

  //* Get user by id
  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  // const { name, email, image, address, phone, bloodGroup, emergencyContact, gender, dateOfBirth, country, city, state, zipCode } = data;

  //* loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }

  //* error state
  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      {/* Cover image + Avatar */}
      <ProfileHeader data={data}/>

      <Card
        className="w-full !rounded-none"
        variant="borderless"
        title={
          <div className="flex items-center gap-4 pt-12">
            <Avatar
              size={48}
              // icon={data?.data?.image || <UserOutlined />}
              src={
                data?.data?.image ||
                "https://i.ibb.co.com/Fz38g1t/human-celebrating.png"
              }
            />
            <div>
              <h2 className="text-xl font-bold m-0">{data?.data?.name}</h2>
              <p className="text-sm text-gray-500 m-0">{data?.data?.email}</p>
            </div>
          </div>
        }
      >
        <Descriptions
          title={
            <div className="flex items-center gap-2 !overflow-y-auto !h-20 md:h-auto md:overflow-hidden">
              <UserOutlined className="text-2xl text-blue-600" />
              <span className="text-2xl font-semibold text-gray-800">
                Personal Information
              </span>
            </div>
          }
          bordered
          column={{ xs: 1, sm: 2, md: 2, lg: 3, xxl: 4, xl: 3 }}
          className="mt-4"
          styles={{
            label: {
              fontWeight: 500,
              color: "#4B5563",
              backgroundColor: "#F9FAFB",
              padding: "12px 16px",
            },
            content: {
              backgroundColor: "white",
              padding: "12px 16px",
            },
          }}
        >
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <UserOutlined /> Name
              </div>
            }
          >
            <span className="font-medium">{data?.data?.name}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <MailOutlined /> Email
              </div>
            }
          >
            <span className="text-blue-600">{data?.data?.email}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <CrownOutlined /> Role
              </div>
            }
          >
            <Tag
              color={data?.data?.role === "admin" ? "purple" : "blue"}
              className="px-3 py-1 text-sm font-medium"
            >
              {data?.data?.role.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <CheckCircleOutlined /> Status
              </div>
            }
          >
            <Tag
              className="px-3 py-1 text-sm font-medium"
              color={
                data?.data?.status === "active"
                  ? "green"
                  : data?.data?.status === "inactive"
                  ? "orange"
                  : "red"
              }
            >
              {data?.data?.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <LockOutlined /> Password Change
              </div>
            }
          >
            <Tag
              color={data?.data?.needsPasswordChange ? "red" : "green"}
              className="px-3 py-1 text-sm font-medium"
            >
              {data?.data?.needsPasswordChange ? "Yes" : "No"}
            </Tag>
          </Descriptions.Item>
          {data?.data?.passwordChangedAt && (
            <Descriptions.Item
              label={
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined /> Last Password Update
                </div>
              }
            >
              <span className="text-gray-600">
                {new Date(data?.data?.passwordChangedAt).toLocaleString()}
              </span>
            </Descriptions.Item>
          )}
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <HomeOutlined /> Address
              </div>
            }
          >
            <span className="text-gray-700">{data?.data?.address}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <PhoneOutlined /> Phone
              </div>
            }
          >
            <span className="text-gray-700">{data?.data?.phone}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <HeartOutlined /> Blood Group
              </div>
            }
          >
            <span className="font-medium text-red-600">
              {data?.data?.bloodGroup}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <AlertOutlined /> Emergency Contact
              </div>
            }
          >
            <span className="text-gray-700">
              {data?.data?.emergencyContact}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <UserOutlined /> Gender
              </div>
            }
          >
            <span className="capitalize text-gray-700">
              {data?.data?.gender}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <CalendarOutlined /> Date of Birth
              </div>
            }
          >
            <span className="text-gray-700">
              {data?.data?.dateOfBirth
                ? new Date(data?.data?.dateOfBirth).toLocaleDateString()
                : ""}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <GlobalOutlined /> Country
              </div>
            }
          >
            <span className="text-gray-700">{data?.data?.country}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <EnvironmentOutlined /> City
              </div>
            }
          >
            <span className="text-gray-700">{data?.data?.city}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <CompassOutlined /> State
              </div>
            }
          >
            <span className="text-gray-700">{data?.data?.state}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <NumberOutlined /> Zip Code
              </div>
            }
          >
            <span className="text-gray-700">{data?.data?.zipCode}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <FieldTimeOutlined /> Created At
              </div>
            }
          >
            <span className="text-gray-600">
              {data?.data?.createdAt
                ? new Date(data?.data?.createdAt).toLocaleDateString()
                : ""}
            </span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div className="flex items-center gap-2">
                <SyncOutlined /> Updated At
              </div>
            }
          >
            <span className="text-gray-600">
              {data?.data?.updatedAt
                ? new Date(data?.data?.updatedAt).toLocaleDateString()
                : ""}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default AdminProfile;
