import Loading from "@/components/shared/Loading";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orderApi";
import { useEffect, useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Order } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ManageOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetAllOrdersQuery({ page, limit });
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  // console.log(data);
  const orderStatusOptions = [
    { label: "PENDING", value: "pending" },
    { label: "PROCESSING", value: "processing" },
    { label: "ON THE WAY", value: "on-the-way" },
    { label: "DELIVERED", value: "delivered" },
    { label: "CANCELED", value: "canceled" },
  ];
  useEffect(() => {
    if (data?.data) {
      setOrders(data.data.data);
    }
  }, [data]);

  const handleDeleteOrder = async (orderId: string) => {
    console.log(orderId);

    try {
       const result = await deleteOrder(orderId)
       if (result?.data.success) {
        toast.success(result?.data?.message)
       }
       console.log(result.data);
    } catch (err) {
        console.log(err);
    }

  };

  console.log(orders);

  if (isLoading) return <Loading />;
  if (orders.length < 1) {
    return (
      <div>
        <h2 className="text-center font-bold text-3xl mb-14">
          Till now There is no order to show!!
        </h2>
      </div>
    );
  }
  if (isError) return <p>Failed to load orders.</p>;

  return (
    <div className="lg:w-2/3 p-6 border-2 shadow-md border-purple-600 shadow-purple-600 rounded-2xl overflow-x-auto">
      <h2 className="text-center font-bold text-3xl mb-14">
        All of your Orders
      </h2>

      <Table>
        <TableCaption className="mt-8">
          A list of your recent Orders
        </TableCaption>
        <TableHeader className="text-l">
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Update Shipping Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order.user.name}</TableCell>
              <TableCell className="font-medium">
                {order.products[0].product.name}
              </TableCell>
              <TableCell>{order?.paymentStatus}</TableCell>
              <TableCell className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant="outline">
                      {order?.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2">
                    <DropdownMenuLabel>Shipping Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {orderStatusOptions.map((option) => (
                        <DropdownMenuItem
                          key={option?.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>{order?.totalPrice}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-purple-600">Delete</Button>

                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this Order data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageOrders;
