import Loading from "@/components/shared/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { Order } from "@/utils/types";
import { Progress } from "antd";
import { useEffect, useState } from "react";

const ViewOrders = () => {
  // State for user ID and orders
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; //? orders per page

  // Get user ID from localStorage on component mount
  useEffect(() => {
    const localUser = localStorage.getItem("userData");
    if (localUser) {
      const user = JSON.parse(localUser);
      setUserId(user?._id);
    }
  }, []);

  // Fetch orders data
  const { data, isLoading, isError } = useGetAllOrdersQuery(
    { id: userId },
    { skip: !userId },
  );

  // Update orders state when data changes
  useEffect(() => {
    if (data?.data) {
      setOrders(data.data.data);
    }
  }, [data]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate pagination values
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Loading state
  if (isLoading) return <Loading />;

  // Empty state
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

  // Error state
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

  // Get color classes for shipping status
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

  // Get color classes for payment status
  const getPaymentStatusColor = (status: string) => {
    return status === "PAID"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  // Calculate order statistics
  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const averageOrderValue = totalSpent / orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status !== "DELIVERED",
  ).length;

  return (
    <div className="w-full flex flex-col justify-center gap-6 px-6">
      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <Progress percent={100} showInfo={false} strokeColor="#8B5CF6" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <Progress percent={100} showInfo={false} strokeColor="#10B981" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageOrderValue.toFixed(2)}
            </div>
            <Progress percent={100} showInfo={false} strokeColor="#3B82F6" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <Progress
              percent={Math.round((pendingOrders / orders.length) * 100)}
              showInfo={false}
              strokeColor="#F59E0B"
            />
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Your Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-gray-50 text-sm font-semibold text-gray-600">
                <div>Product Name</div>
                <div>Order Date</div>
                <div>Payment</div>
                <div>Shipping</div>
                <div className="text-right">Amount</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <div
                    key={order?._id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium">
                      {order.products[0].product.name}
                    </div>
                    <div className="text-gray-600">
                      {formatDate(order.createdAt)}
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${getPaymentStatusColor(
                          order.paymentStatus,
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right font-semibold">
                      ${order.totalPrice.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewOrders;
