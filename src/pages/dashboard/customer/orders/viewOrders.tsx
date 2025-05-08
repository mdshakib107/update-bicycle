import Loading from "@/components/shared/Loading";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { Order } from "@/utils/types";
import { useEffect, useState } from "react";

const ViewOrders = () => {
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 7;

  useEffect(() => {
    const localUser = localStorage.getItem("userData");
    if (localUser) {
      const user = JSON.parse(localUser);
      setUserId(user?._id);
    }
  }, []);

  const { data, isLoading, isError } = useGetAllOrdersQuery(
    { id: userId },
    { skip: !userId },
  );

  useEffect(() => {
    if (data?.data) {
      setOrders(data.data.data);
    }
  }, [data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Loading />;

  if (orders.length < 1) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Orders Yet
          </h2>
          <p className="text-gray-500">
            You haven't placed any orders yet. Start shopping to see your orders
            here!
          </p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Card className="p-8 text-center border-red-200 bg-red-50">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error Loading Orders
          </h2>
          <p className="text-red-500">
            Failed to load your orders. Please try again later.
          </p>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING":
        return "bg-gray-100 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    return status === "PAID"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="p-6 border-purple-100 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Your Order History
        </h2>

        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-gray-500">
              A list of your recent orders and their current status
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Product Name</TableHead>
                <TableHead className="font-semibold">Order Date</TableHead>
                <TableHead className="font-semibold">Payment</TableHead>
                <TableHead className="font-semibold">Shipping</TableHead>
                <TableHead className="font-semibold text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order?._id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {order.products[0].product.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${getPaymentStatusColor(
                        order.paymentStatus,
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-purple-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ViewOrders;
