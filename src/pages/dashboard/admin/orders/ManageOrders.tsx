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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orderApi";
import { Order, ShippingStatus } from "@/utils/types";
import {
  CheckCircle,
  Clock,
  Package,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<
    ShippingStatus | string
  >("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAllOrdersQuery({
    page,
    limit: 5,
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
    if (data?.data?.data) {
      setOrders(data.data.data);
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

        <Table>
          <TableCaption className="mt-8 text-gray-500">
            A list of all orders and their current status
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Customer Name</TableHead>
              <TableHead className="font-semibold">Product Name</TableHead>
              <TableHead className="font-semibold">Payment</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: Order) => (
              <TableRow key={order._id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {order?.user?.name || "User Not Found"}
                </TableCell>
                <TableCell className="font-medium">
                  {order.products[0].product.name}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      order?.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order?.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`flex items-center gap-2 ${getStatusColor(
                          order?.status,
                        )} border-0`}
                      >
                        {getStatusIcon(order?.status)}
                        {order?.status}
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
                              setSelectedOrderId(order?._id);
                            }}
                          >
                            {option.icon}
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{order?.products[0]?.quantity}</TableCell>
                <TableCell className="font-medium">
                  ${order?.totalPrice}
                </TableCell>
                <TableCell className="text-center">
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
                            <p>Customer: {order?.user?.name}</p>
                            <p>Product: {order.products[0].product.name}</p>
                            <p>Amount: ${order?.totalPrice}</p>
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
                          onClick={() => handleDeleteOrder(order._id)}
                        >
                          Delete Order
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-6 gap-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="hover:bg-gray-100"
          >
            Previous
          </Button>

          <span className="flex items-center font-medium text-lg text-gray-700">
            Page {page}
          </span>

          <Button
            variant="outline"
            disabled={orders.length < 5}
            onClick={() => setPage((prev) => prev + 1)}
            className="hover:bg-gray-100"
          >
            Next
          </Button>
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
