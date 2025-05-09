import Loading from "@/components/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  HeartOutlined,
  HomeOutlined,
  InboxOutlined,
  MailOutlined,
  NumberOutlined,
  PhoneOutlined,
  RiseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Descriptions, Progress, ProgressProps, Steps } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

//* cards colors
const conicColors: ProgressProps["strokeColor"] = {
  "0%": "#87d068",
  "50%": "#ffe58f",
  "100%": "#ffccc7",
};

const CustomerDashboardLandingpage = () => {
  // Get full user from Redux
  const currentUser = useAppSelector(useCurrentUser);
  const userId = currentUser?._id;

  const { data: userData, isLoading: userLoading } = useGetUserByIdQuery(
    userId!,
    {
      skip: !userId,
    },
  );

  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({
    id: userId,
    page: 1,
    limit: 1000,
  });

  // loading state
  if (userLoading || ordersLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }

  // error state
  if (!userData || !ordersData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  const userDetails = userData.data;
  const orders = ordersData.data.data;

  // Calculate statistics
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

  // Prepare order history data for charts
  const orderHistoryData = orders
    .reduce((acc: { date: string; amount: number }[], order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      const existingDate = acc.find((item) => item.date === date);

      if (existingDate) {
        existingDate.amount += order.totalPrice;
      } else {
        acc.push({ date, amount: order.totalPrice });
      }

      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Prepare order status data
  const orderStatusData = orders.reduce(
    (acc: { status: string; count: number }[], order) => {
      const existingStatus = acc.find((item) => item.status === order.status);
      if (existingStatus) {
        existingStatus.count += 1;
      } else {
        acc.push({ status: order.status, count: 1 });
      }
      return acc;
    },
    [],
  );

  return (
    <div className="px-6 space-y-6 w-full h-screen">
      {/* Information Progression History */}
      <Card className="mb-6 w-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Information Progression History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6 w-full">
            <Steps
              type="navigation"
              current={(() => {
                let completedSteps = 0;
                if (userDetails.name) completedSteps++;
                if (userDetails.email) completedSteps++;
                if (userDetails.phone) completedSteps++;
                if (userDetails.address) completedSteps++;
                if (userDetails.dateOfBirth) completedSteps++;
                return completedSteps;
              })()}
              items={[
                { title: "Basic Info", description: "Name & Email" },
                { title: "Contact", description: "Phone" },
                { title: "Address", description: "Location" },
                { title: "Personal", description: "Birth Date" },
                { title: "Complete", description: "All Set!" },
              ]}
              className="w-full [&_.ant-steps-item]:flex-1 [&_.ant-steps-item]:min-w-0 [&_.ant-steps-item-title]:whitespace-normal [&_.ant-steps-item-description]:whitespace-normal"
            />
            <Progress
              percent={(() => {
                const fields = [
                  "name",
                  "email",
                  "phone",
                  "address",
                  "dateOfBirth",
                ];
                const completed = fields.filter(
                  (field) => userDetails[field as keyof typeof userDetails],
                ).length;
                return Math.round((completed / fields.length) * 100);
              })()}
              status="active"
              strokeColor={conicColors}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingOutlined className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarOutlined className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <RiseOutlined className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageOrderValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <InboxOutlined className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status !== "DELIVERED").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spending
            </CardTitle>
            <DollarOutlined className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {totalOrders} orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Order History Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Descriptions bordered>
            <Descriptions.Item
              label={
                <>
                  <MailOutlined /> Email
                </>
              }
              span={3}
            >
              {userDetails.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <PhoneOutlined /> Phone
                </>
              }
              span={3}
            >
              {userDetails.phone || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <HomeOutlined /> Address
                </>
              }
              span={3}
            >
              {userDetails.address || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <GlobalOutlined /> Country
                </>
              }
              span={3}
            >
              {userDetails.country || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <EnvironmentOutlined /> City
                </>
              }
              span={3}
            >
              {userDetails.city || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <NumberOutlined /> Zip Code
                </>
              }
              span={3}
            >
              {userDetails.zipCode || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <CalendarOutlined /> Date of Birth
                </>
              }
              span={3}
            >
              {userDetails.dateOfBirth
                ? new Date(userDetails.dateOfBirth).toLocaleDateString()
                : "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <HeartOutlined /> Blood Group
                </>
              }
              span={3}
            >
              {userDetails.bloodGroup || "Not provided"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <ClockCircleOutlined /> Member Since
                </>
              }
              span={3}
            >
              {userDetails.createdAt
                ? new Date(userDetails.createdAt).toLocaleDateString()
                : "Not provided"}
            </Descriptions.Item>
          </Descriptions>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboardLandingpage;
