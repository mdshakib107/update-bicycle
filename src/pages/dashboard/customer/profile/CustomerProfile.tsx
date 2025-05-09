import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
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
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";

const { Title, Text } = Typography;

const InfoItem = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: React.ReactNode;
}) => (
  <Descriptions.Item
    label={
      <Space>
        {icon}
        {label}
      </Space>
    }
  >
    {value}
  </Descriptions.Item>
);

const CustomerProfile = () => {
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;

  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text type="danger">Unable to fetch user profile.</Text>
      </div>
    );
  }

  const userInfo = data.data;

  return (
    <div className="w-[90vw] mx-auto py-6 min-h-screen">
      <Card className="shadow-md mb-6">
        {/* <ProfileHeader data={data} /> */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-6">
          <Badge count={userInfo.role.toUpperCase()} offset={[-10, 80]}>
            <Avatar
              size={96}
              src={
                userInfo.image ||
                "https://i.ibb.co.com/Fz38g1t/human-celebrating.png"
              }
              icon={<UserOutlined />}
            />
          </Badge>
          <div>
            <Title level={3}>{userInfo.name}</Title>
            <Text type="secondary">{userInfo.email}</Text>
          </div>
        </div>
      </Card>

      <Card title="Account Information" className="shadow-sm mb-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Descriptions column={1} bordered>
              <InfoItem
                label="Full Name"
                icon={<UserOutlined />}
                value={<Text>{userInfo.name}</Text>}
              />
              <InfoItem
                label="Email"
                icon={<MailOutlined />}
                value={<Text copyable>{userInfo.email}</Text>}
              />
              <InfoItem
                label="Status"
                icon={<CheckCircleOutlined />}
                value={
                  <Tag
                    color={userInfo.status === "active" ? "green" : "orange"}
                  >
                    {userInfo.status}
                  </Tag>
                }
              />
              <InfoItem
                label="Password Change Required"
                icon={<LockOutlined />}
                value={
                  <Tag color={userInfo.needsPasswordChange ? "red" : "blue"}>
                    {userInfo.needsPasswordChange ? "Yes" : "No"}
                  </Tag>
                }
              />
              {userInfo.passwordChangedAt && (
                <InfoItem
                  label="Last Password Change"
                  icon={<ClockCircleOutlined />}
                  value={new Date(userInfo.passwordChangedAt).toLocaleString()}
                />
              )}
            </Descriptions>
          </Col>
          <Col xs={24} md={12}>
            <Descriptions column={1} bordered>
              <InfoItem
                label="Role"
                icon={<CrownOutlined />}
                value={<Tag>{userInfo.role}</Tag>}
              />
              <InfoItem
                label="Phone"
                icon={<PhoneOutlined />}
                value={userInfo.phone}
              />
              <InfoItem
                label="Emergency Contact"
                icon={<AlertOutlined />}
                value={userInfo.emergencyContact}
              />
              <InfoItem
                label="Blood Group"
                icon={<HeartOutlined />}
                value={<Text type="danger">{userInfo.bloodGroup}</Text>}
              />
              <InfoItem
                label="Gender"
                icon={<UserOutlined />}
                value={<Text>{userInfo.gender}</Text>}
              />
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Card title="Location & Other Details" className="shadow-sm">
        <Descriptions column={1} bordered>
          <InfoItem
            label="Date of Birth"
            icon={<CalendarOutlined />}
            value={
              userInfo.dateOfBirth
                ? new Date(userInfo.dateOfBirth).toLocaleDateString()
                : "Not Provided"
            }
          />
          <InfoItem
            label="Address"
            icon={<HomeOutlined />}
            value={userInfo.address}
          />
          <InfoItem
            label="Country"
            icon={<GlobalOutlined />}
            value={userInfo.country}
          />
          <InfoItem
            label="City"
            icon={<EnvironmentOutlined />}
            value={userInfo.city}
          />
          <InfoItem
            label="State"
            icon={<CompassOutlined />}
            value={userInfo.state}
          />
          <InfoItem
            label="Zip Code"
            icon={<NumberOutlined />}
            value={userInfo.zipCode}
          />
          <InfoItem
            label="Account Created"
            icon={<FieldTimeOutlined />}
            value={
              userInfo.createdAt
                ? new Date(userInfo.createdAt).toLocaleDateString()
                : "N/A"
            }
          />
          <InfoItem
            label="Last Password Change"
            icon={<ClockCircleOutlined />}
            value={
              userInfo.passwordChangedAt
                ? new Date(userInfo.passwordChangedAt).toLocaleString()
                : "Not Set"
            }
          />
        </Descriptions>
      </Card>
    </div>
  );
};

export default CustomerProfile;
