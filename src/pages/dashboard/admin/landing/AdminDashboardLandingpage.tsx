/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/components/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { useGetAllUsersQuery, useGetUserByIdQuery } from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Progress, ProgressProps, Steps } from "antd";
import {
  Boxes,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OrderStatusData {
  name: string;
  value: number;
}

interface RevenueData {
  date: string;
  revenue: number;
}

interface UserData {
  date: string;
  count: number;
}

interface ProductData {
  date: string;
  count: number;
}

//* cards colors
const conicColors: ProgressProps["strokeColor"] = {
  "0%": "#87d068",
  "50%": "#ffe58f",
  "100%": "#ffccc7",
};

const AdminDashboardLandingpage = () => {
  //* Get full user from Redux
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;

  //* Get user by id
  const { isLoading: userLoading } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  //* Get all orders
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery(
    {
      page: 1,
      limit: 1000,
    },
  );

  //* Get all products
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProductsQuery({});

  //* Get all users
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();

  //* Calculate month-over-month changes
  const calculateMonthOverMonthChange = (
    currentValue: number,
    previousValue: number,
  ) => {
    if (previousValue === 0) return 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  //* Get current and previous month data
  const getCurrentAndPreviousMonthData = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const orders = ordersData?.data?.data || [];
    const users = usersData?.data || [];
    const products = productsData?.data?.result || [];

    // Filter data for current month
    const currentMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    });

    const currentMonthUsers = users.filter((user) => {
      if (!user?.createdAt) return false;
      const userDate = new Date(user.createdAt);
      return (
        userDate.getMonth() === currentMonth &&
        userDate.getFullYear() === currentYear
      );
    });

    const currentMonthProducts = products.filter((product) => {
      if (!product?.createdAt) return false;
      const productDate = new Date(product.createdAt);
      return (
        productDate.getMonth() === currentMonth &&
        productDate.getFullYear() === currentYear
      );
    });

    // Filter data for previous month
    const previousMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return (
        orderDate.getMonth() === prevMonth &&
        orderDate.getFullYear() === prevYear
      );
    });

    const previousMonthUsers = users.filter((user) => {
      if (!user?.createdAt) return false;
      const userDate = new Date(user.createdAt);
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return (
        userDate.getMonth() === prevMonth && userDate.getFullYear() === prevYear
      );
    });

    const previousMonthProducts = products.filter((product) => {
      if (!product?.createdAt) return false;
      const productDate = new Date(product.createdAt);
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return (
        productDate.getMonth() === prevMonth &&
        productDate.getFullYear() === prevYear
      );
    });

    return {
      currentMonthOrders,
      previousMonthOrders,
      currentMonthUsers,
      previousMonthUsers,
      currentMonthProducts,
      previousMonthProducts,
    };
  };

  const {
    currentMonthOrders,
    previousMonthOrders,
    currentMonthUsers,
    previousMonthUsers,
    currentMonthProducts,
    previousMonthProducts,
  } = getCurrentAndPreviousMonthData();

  //* Calculate statistics
  const totalOrders = ordersData?.data?.totalOrders || 0;
  const totalProducts = productsData?.data?.meta?.total || 0;
  const totalUsers = usersData?.data?.length || 0;
  const totalRevenue =
    ordersData?.data?.data?.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0,
    ) || 0;

  //* Calculate month-over-month changes
  const ordersChange = calculateMonthOverMonthChange(
    currentMonthOrders.length,
    previousMonthOrders.length,
  );

  const revenueChange = calculateMonthOverMonthChange(
    currentMonthOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0),
    previousMonthOrders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0,
    ),
  );

  const usersChange = calculateMonthOverMonthChange(
    currentMonthUsers.length,
    previousMonthUsers.length,
  );

  const productsChange = calculateMonthOverMonthChange(
    currentMonthProducts.length,
    previousMonthProducts.length,
  );

  //* loading state
  if (userLoading || ordersLoading || productsLoading || usersLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div>
    );
  }

  //* Prepare data for charts
  const orderStatusData: OrderStatusData[] = [
    {
      name: "Pending",
      value:
        ordersData?.data?.data?.filter((order) => order.status === "PENDING")
          .length || 0,
    },
    {
      name: "Processing",
      value:
        ordersData?.data?.data?.filter((order) => order.status === "PROCESSING")
          .length || 0,
    },
    {
      name: "Shipped",
      value:
        ordersData?.data?.data?.filter((order) => order.status === "SHIPPED")
          .length || 0,
    },
    {
      name: "Delivered",
      value:
        ordersData?.data?.data?.filter((order) => order.status === "DELIVERED")
          .length || 0,
    },
  ];


  //* Prepare user growth data
  const userGrowthData: UserData[] =
    usersData?.data
      ?.filter((user) => user?.createdAt)
      .reduce((acc: UserData[], user) => {
        const createdAt = user.createdAt;
        if (!createdAt) return acc;

        const date = new Date(createdAt).toLocaleDateString();
        const existingDate = acc.find((item) => item.date === date);

        if (existingDate) {
          existingDate.count += 1;
        } else {
          acc.push({ date, count: 1 });
        }

        return acc;
      }, [])
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ) || [];

  //* Prepare product growth data
  const productGrowthData: ProductData[] =
    productsData?.data?.result
      ?.filter((product) => product?.createdAt)
      .reduce((acc: ProductData[], product) => {
        const createdAt = product.createdAt;
        if (!createdAt) return acc;

        const date = new Date(createdAt).toLocaleDateString();
        const existingDate = acc.find((item) => item.date === date);

        if (existingDate) {
          existingDate.count += 1;
        } else {
          acc.push({ date, count: 1 });
        }

        return acc;
      }, [])
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ) || [];

  //* Revenue data for line chart
  const revenueData: RevenueData[] =
    ordersData?.data?.data
      ?.reduce((acc: RevenueData[], order) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        const existingDate = acc.find((item) => item.date === date);

        if (existingDate) {
          existingDate.revenue += order.totalPrice || 0;
        } else {
          acc.push({ date, revenue: order.totalPrice || 0 });
        }

        return acc;
      }, [])
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ) || [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderChangeIndicator = (change: number) => {
    const isPositive = change > 0;
    const color = isPositive ? "text-green-500" : "text-red-500";
    const icon = isPositive ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );

    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {icon}
        <span>{Math.abs(change).toFixed(1)}% from last month</span>
      </div>
    );
  };

  //* Prepare trend data for charts
  const prepareTrendData = (data: any[], dateKey: string, valueKey: string) => {
    return (
      data
        ?.reduce((acc: { date: string; value: number }[], item) => {
          const date = new Date(item[dateKey]).toLocaleDateString();
          const existingDate = acc.find((d) => d.date === date);
          if (existingDate) {
            existingDate.value += item[valueKey] || 0;
          } else {
            acc.push({ date, value: item[valueKey] || 0 });
          }
          return acc;
        }, [])
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ) || []
    );
  };

  const ordersTrendData = prepareTrendData(
    ordersData?.data?.data || [],
    "createdAt",
    "totalPrice",
  );
  const usersTrendData = prepareTrendData(
    usersData?.data || [],
    "createdAt",
    "1",
  );
  const productsTrendData = prepareTrendData(
    productsData?.data?.result || [],
    "createdAt",
    "1",
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
                if (user?.name) completedSteps++;
                if (user?.email) completedSteps++;
                if (user?.phone) completedSteps++;
                if (user?.address) completedSteps++;
                if (user?.dateOfBirth) completedSteps++;
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
                  (field) => user?.[field as keyof typeof user],
                ).length;
                return Math.round((completed / fields.length) * 100);
              })()}
              status="active"
              strokeColor={conicColors}
            />
          </div>
        </CardContent>
      </Card>

      {/* Total Stats Cards */}
      <h3 className="text-lg font-semibold mb-4">Total Statistics</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            {/* <div className="text-xs text-muted-foreground">
              {renderChangeIndicator(ordersChange)}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            {/* <div className="text-xs text-muted-foreground">
              {renderChangeIndicator(usersChange)}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            {/* <div className="text-xs text-muted-foreground">
              {renderChangeIndicator(productsChange)}
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            {/* <div className="text-xs text-muted-foreground">
              {renderChangeIndicator(revenueChange)}
            </div> */}
          </CardContent>
        </Card>
      </div>

      {/* Current Month Stats */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Current Month Statistics</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentMonthOrders.length}
              </div>
              <div className="text-xs text-muted-foreground">
                {renderChangeIndicator(ordersChange)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentMonthUsers.length}
              </div>
              <div className="text-xs text-muted-foreground">
                {renderChangeIndicator(usersChange)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month Products
              </CardTitle>
              <Boxes className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentMonthProducts.length}
              </div>
              <div className="text-xs text-muted-foreground">
                {renderChangeIndicator(productsChange)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $
                {currentMonthOrders
                  .reduce((sum, order) => sum + (order.totalPrice || 0), 0)
                  .toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">
                {renderChangeIndicator(revenueChange)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Graphs</h3>

      {/* Trend Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Orders Trend */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Users Trend */}
        {/* <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Users Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usersTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

        {/* Products Trend */}
        {/* <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Products Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productsTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ffc658"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

        {/* Revenue Trend */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Order Status Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({
                      name,
                      percent,
                    }: {
                      name: string;
                      percent: number;
                    }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Product Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Product Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardLandingpage;
