/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orderApi";
import { Order, ShippingStatus } from "@/utils/types";
import { Table as AntTable, Statistic, Typography } from "antd";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Package,
  PackageCheck,
  ShoppingCart,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

const { Title, Text } = Typography;

interface OrderStatusOption {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
}

const orderStatusOptions: OrderStatusOption[] = [
  {
    label: "PENDING",
    value: "pending",
    icon: <Clock className="w-4 h-4" />,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    label: "PROCESSING",
    value: "processing",
    icon: <Package className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-800",
  },
  {
    label: "SHIPPED",
    value: "shipped",
    icon: <Truck className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-800",
  },
  {
    label: "DELIVERED",
    value: "delivered",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "bg-green-100 text-green-800",
  },
  {
    label: "CANCELED",
    value: "canceled",
    icon: <XCircle className="w-4 h-4" />,
    color: "bg-red-100 text-red-800",
  },
];

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<
    ShippingStatus | string
  >("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    paidOrders: 0,
    unpaidOrders: 0,
    deliveredOrders: 0,
    currentMonthOrders: 0,
    currentMonthRevenue: 0,
    currentMonthPaidOrders: 0,
    currentMonthUnpaidOrders: 0,
    currentMonthDeliveredOrders: 0,
  });

  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { data: statsData } = useGetAllOrdersQuery({
    page: 1,
    limit: 1000,
  });

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    if (data?.data) {
      setOrders(data.data.data);
      setPagination((prev) => ({
        ...prev,
        total: data.data.totalOrders || 0,
      }));
      setIsTableLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (statsData?.data?.data) {
      const allOrders = statsData.data.data;
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Filter current month orders
      const currentMonthOrders = allOrders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear
        );
      });

      setStats({
        totalOrders: statsData.data.totalOrders || 0,
        totalRevenue: allOrders.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0,
        ),
        paidOrders: allOrders.filter((order) => order.paymentStatus === "PAID")
          .length,
        unpaidOrders: allOrders.filter(
          (order) => order.paymentStatus === "UNPAID",
        ).length,
        deliveredOrders: allOrders.filter(
          (order) => order.status === "DELIVERED",
        ).length,
        // Current month stats
        currentMonthOrders: currentMonthOrders.length,
        currentMonthRevenue: currentMonthOrders.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0,
        ),
        currentMonthPaidOrders: currentMonthOrders.filter(
          (order) => order.paymentStatus === "PAID",
        ).length,
        currentMonthUnpaidOrders: currentMonthOrders.filter(
          (order) => order.paymentStatus === "UNPAID",
        ).length,
        currentMonthDeliveredOrders: currentMonthOrders.filter(
          (order) => order.status === "DELIVERED",
        ).length,
      });
    }
  }, [statsData]);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const result = await deleteOrder(orderId);
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        refetch();
      }
    } catch (err: any) {
      toast.error("Failed to delete order", err);
    }
  };

  const handleUpdateOrder = async (orderId: string, status: ShippingStatus) => {
    if (selectedOrderId && selectedStatus) {
      try {
        const result = await updateOrder({
          orderId: orderId,
          updateData: { status },
        });
        if (result?.data?.success) {
          toast.success(result?.data?.message);
          setOpenStatusDialog(false);
        }
      } catch (err: any) {
        toast.error("Failed to update order", err);
      }
    }
  };

  const handleUpdatePayment = async (orderId: string) => {
    try {
      const result = await updateOrder({
        orderId: orderId,
        updateData: { paymentStatus: "PAID" },
      });
      if (result?.data?.success) {
        toast.success("Payment status updated successfully");
        setOpenPaymentDialog(false);
        refetch();
      }
    } catch (err: any) {
      toast.error("Failed to update payment status");
      console.log(err);
    }
  };

  const getStatusColor = (status: string) => {
    const option = orderStatusOptions.find(
      (opt) => opt.value === status.toLowerCase(),
    );
    return option?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    const option = orderStatusOptions.find(
      (opt) => opt.value === status.toLowerCase(),
    );
    return option?.icon || <Clock className="w-4 h-4" />;
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: ["user", "name"],
      key: "customerName",
      render: (text: string) => text || "User Not Found",
    },
    {
      title: "Product Name",
      dataIndex: ["products", "0", "product", "name"],
      key: "productName",
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string, record: Order) =>
        status === "PAID" ? (
          <span className="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            {status}
          </span>
        ) : (
          <AlertDialog
            open={openPaymentDialog && selectedOrder?._id === record._id}
            onOpenChange={setOpenPaymentDialog}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-0"
                onClick={() => setSelectedOrder(record)}
              >
                <CreditCard className="w-4 h-4" />
                {status}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold text-gray-900">
                  Update Payment Status
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-3">
                  <p>Are you sure you want to mark this order as paid?</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">Order Details:</p>
                    <p>Customer: {record?.user?.name}</p>
                    <p>Product: {record.products[0].product.name}</p>
                    <p>Amount: ${record?.totalPrice}</p>
                  </div>
                  <p className="text-yellow-600 font-medium">
                    This action cannot be undone.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover:bg-gray-100">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleUpdatePayment(record._id)}
                >
                  Mark as Paid
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Order) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${getStatusColor(
                status,
              )} border-0`}
            >
              {getStatusIcon(status)}
              {status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 p-2">
            <DropdownMenuGroup>
              {orderStatusOptions.map((option) => (
                <DropdownMenuItem
                  key={option?.label}
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 ${option.color}`}
                  onClick={() => {
                    setSelectedStatus(option?.label);
                    setOpenStatusDialog(true);
                    setSelectedOrderId(record?._id);
                  }}
                >
                  {option.icon}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      title: "Quantity",
      dataIndex: ["products", "0", "quantity"],
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "amount",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Order) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-gray-900">
                Delete Order
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>Are you sure you want to delete this order?</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">Order Details:</p>
                  <p>Customer: {record?.user?.name}</p>
                  <p>Product: {record.products[0].product.name}</p>
                  <p>Amount: ${record?.totalPrice}</p>
                </div>
                <p className="text-red-600 font-medium">
                  This action cannot be undone.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:bg-gray-100">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleDeleteOrder(record._id)}
              >
                Delete Order
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setIsTableLoading(true);
    setPagination(pagination);
  };

  if (isLoading && !isTableLoading) return <Loading />;
  if (orders?.length < 1 && !isTableLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <h2 className="text-center font-bold text-3xl text-gray-600">
          No orders to display
        </h2>
      </div>
    );
  }
  if (isError) return <p>Failed to load orders.</p>;

  return (
    <div className="w-full p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Title Section */}
          <div className="flex flex-col justify-center">
            <Title level={2} className="!mb-1">
              Order Management
            </Title>
            <Text type="secondary">Manage and monitor all orders</Text>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Statistic
              title={
                <span className="text-gray-600 text-base">Total Orders</span>
              }
              value={stats.totalOrders}
              prefix={<ShoppingCart />}
              className="bg-gradient-to-br from-purple-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100"
              valueStyle={{ color: "#6B46C1", fontWeight: "bold" }}
            />
            <Statistic
              title={
                <span className="text-gray-600 text-base">Total Revenue</span>
              }
              value={stats.totalRevenue}
              prefix={<DollarSign />}
              precision={2}
              className="bg-gradient-to-br from-green-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100"
              valueStyle={{ color: "#059669", fontWeight: "bold" }}
            />
            <Statistic
              title={
                <span className="text-gray-600 text-base">Paid Orders</span>
              }
              value={stats.paidOrders}
              prefix={<PackageCheck />}
              className="bg-gradient-to-br from-blue-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
              valueStyle={{ color: "#2563EB", fontWeight: "bold" }}
            />
            <Statistic
              title={
                <span className="text-gray-600 text-base">Unpaid Orders</span>
              }
              value={stats.unpaidOrders}
              prefix={<AlertCircle />}
              className="bg-gradient-to-br from-red-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-red-100"
              valueStyle={{ color: "#DC2626", fontWeight: "bold" }}
            />
            <Statistic
              title={
                <span className="text-gray-600 text-base">
                  Delivered Orders
                </span>
              }
              value={stats.deliveredOrders}
              prefix={<Package />}
              className="bg-gradient-to-br from-amber-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100"
              valueStyle={{ color: "#B45309", fontWeight: "bold" }}
            />
          </div>

          {/* Current Month Stats */}
          <div className="mt-6">
            <Title level={4} className="!mb-4">
              Current Month Statistics
            </Title>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Statistic
                title={
                  <span className="text-gray-600 text-base">
                    This Month Orders
                  </span>
                }
                value={stats.currentMonthOrders}
                prefix={<ShoppingCart />}
                className="bg-gradient-to-br from-purple-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100"
                valueStyle={{ color: "#6B46C1", fontWeight: "bold" }}
              />
              <Statistic
                title={
                  <span className="text-gray-600 text-base">
                    This Month Revenue
                  </span>
                }
                value={stats.currentMonthRevenue}
                prefix={<DollarSign />}
                precision={2}
                className="bg-gradient-to-br from-green-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100"
                valueStyle={{ color: "#059669", fontWeight: "bold" }}
              />
              <Statistic
                title={
                  <span className="text-gray-600 text-base">
                    This Month Paid
                  </span>
                }
                value={stats.currentMonthPaidOrders}
                prefix={<PackageCheck />}
                className="bg-gradient-to-br from-blue-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100"
                valueStyle={{ color: "#2563EB", fontWeight: "bold" }}
              />
              <Statistic
                title={
                  <span className="text-gray-600 text-base">
                    This Month Unpaid
                  </span>
                }
                value={stats.currentMonthUnpaidOrders}
                prefix={<AlertCircle />}
                className="bg-gradient-to-br from-red-50 to-white !p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-red-100"
                valueStyle={{ color: "#DC2626", fontWeight: "bold" }}
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <Card className="p-6 border-0 shadow-lg">
          <div className="w-full overflow-x-auto">
            <AntTable
              loading={isTableLoading}
              columns={columns}
              dataSource={orders}
              rowKey="_id"
              bordered
              scroll={{ x: "max-content" }}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} orders`,
                className: "px-4",
                responsive: true,
                size: "default",
                showQuickJumper: true,
                position: ["bottomCenter"],
              }}
              onChange={handleTableChange}
              className="rounded-lg"
              size="middle"
              tableLayout="auto"
            />
          </div>
        </Card>
      </div>

      <AlertDialog open={openStatusDialog} onOpenChange={setOpenStatusDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              Update Order Status
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>Are you sure you want to change the status to:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                    selectedStatus.toLowerCase(),
                  )}`}
                >
                  {selectedStatus}
                </span>
              </div>
              <p className="text-gray-600">
                This will update the order's shipping status in the system.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-gray-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() =>
                handleUpdateOrder(
                  selectedOrderId,
                  selectedStatus as ShippingStatus,
                )
              }
            >
              Update Status
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManageOrders;
