import Loading from "@/components/shared/Loading";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Card, Descriptions, Tag } from "antd";
import { UserOutlined } from '@ant-design/icons';

const CustomerDashboardLandingpage = () => {

  // Get full user from Redux
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;

  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  // loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }

  // error state
  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-100px)] ">
      <Card
        className="w-full p-4! shadow-md! rounded border border-purple-600 shadow-purple-600"
        bordered={false}
        title={
          <div className="flex items-center gap-4">
            <Avatar size={48} icon={<UserOutlined />} />
            <div>
              <h2 className="text-xl font-bold m-0">{data?.data?.name}</h2>
              <p className="text-sm text-gray-500 m-0">{data?.data?.email}</p>
            </div>
          </div>
        }
      >
        <Descriptions
          title="Profile Details"
          bordered
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xxl: 1, xl: 1 }}
          className="mt-4"
        >
          <Descriptions.Item label="Name">{data?.data?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{data?.data?.email}</Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color={data?.data?.role === "admin" ? "purple" : "blue"}>
              {data?.data?.role.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
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
          <Descriptions.Item label="Password Change Required">
            <Tag color={data?.data?.needsPasswordChange ? "red" : "green"}>
              {data?.data?.needsPasswordChange ? "Yes" : "No"}
            </Tag>
          </Descriptions.Item>
          {data?.data?.passwordChangedAt && (
            <Descriptions.Item label="Last Password Change">
              {new Date(data?.data?.passwordChangedAt).toLocaleString()}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
};

export default CustomerDashboardLandingpage;
