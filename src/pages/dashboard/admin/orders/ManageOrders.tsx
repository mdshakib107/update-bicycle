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
import { Table as AntTable } from "antd";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Package,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const orderStatusOptions = [
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

  if (isLoading) return <Loading />;
  if (orders?.length < 1) {
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
      <Card className="p-6 border-0 shadow-lg">
        <h2 className="text-center font-bold text-3xl mb-8 text-gray-800">
          Order Management
        </h2>

        <div className="w-full overflow-x-auto">
          {isTableLoading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <AntTable
              loading={isLoading}
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
          )}
        </div>
      </Card>

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
