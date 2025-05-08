/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/api/userApi";
import { TUser } from "@/utils/types";
import {
  CheckCircleOutlined,
  CrownOutlined,
  DeleteOutlined,
  StopOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Popconfirm,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import { toast } from "sonner";

const { Title, Text } = Typography;

const UserManagement = () => {
  const { data, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  //   console.log("users", data?.data);
  const users = data?.data || [];

  // Calculate statistics
  const totalUsers = users.length;
  const adminCount = users.filter((user) => user.role === "admin").length;
  const activeUsers = users.filter((user) => user.status === "active").length;

  const handleMakeAdmin = async (user: TUser["data"]) => {
    try {
      await updateUser({
        userId: user._id,
        updateData: {
          role: "admin",
        },
      }).unwrap();
      refetch(); // Refetch the users after updating
      toast.success(`${user.name} is now an admin!`);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(`{error?.data?.message || "Failed to make admin"}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted");
    } catch (err: any) {
      toast.error("Failed to delete user");
      console.log(err);
    }
  };

  const handleStatusChange = async (user: TUser["data"]) => {
    try {
      const newStatus = user.status === "active" ? "inactive" : "active";
      await updateUser({
        userId: user._id,
        updateData: {
          status: newStatus,
        },
      }).unwrap();
      refetch();
      toast.success(`${user.name} is now ${newStatus}!`);
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error(`{error?.data?.message || "Failed to update status"}`);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: any) => (
        <Avatar
          src={record.image || undefined}
          icon={!record.image && <UserOutlined />}
          shape="circle"
          size={40}
          alt={record.name}
          className="border-2 border-purple-200"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag
          color={role === "admin" ? "purple" : "blue"}
          icon={role === "admin" ? <CrownOutlined /> : <UserOutlined />}
          className="px-2 py-1"
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Popconfirm
          title={`${status === "active" ? "Deactivate" : "Activate"} User`}
          description={
            <div className="space-y-2">
              <p>
                Are you sure you want to{" "}
                {status === "active" ? "deactivate" : "activate"} this user?
              </p>
              <p className="font-medium">{record.name}</p>
              <p className="text-gray-500 text-sm">
                {status === "active"
                  ? "Deactivating will prevent the user from accessing the system."
                  : "Activating will restore the user's access to the system."}
              </p>
            </div>
          }
          onConfirm={() => handleStatusChange(record)}
          okText={status === "active" ? "Yes, Deactivate" : "Yes, Activate"}
          cancelText="No, Cancel"
          okButtonProps={{
            className:
              status === "active"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700",
            type: "primary",
          }}
          cancelButtonProps={{
            className: "hover:bg-gray-100",
          }}
        >
          <Button
            type={status === "active" ? "primary" : "default"}
            size="small"
            icon={
              status === "active" ? <CheckCircleOutlined /> : <StopOutlined />
            }
            className={
              status === "active"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-100 hover:bg-red-200"
            }
          >
            {status === "active" ? "Active" : "Inactive"}
          </Button>
        </Popconfirm>
      ),
    },
    // {
    //   title: "Needs Password Change",
    //   dataIndex: "needsPasswordChange",
    //   key: "needsPasswordChange",
    //   render: (needs: boolean) => (needs ? "Yes" : "No"),
    // },
    // {
    //   title: "Password Changed At",
    //   dataIndex: "passwordChangedAt",
    //   key: "passwordChangedAt",
    //   render: (date: string) =>
    //     date ? new Date(date).toLocaleString() : "Never",
    // },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
    // {
    //   title: "Updated At",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    //   render: (date: string) => new Date(date).toLocaleString(),
    // },
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   key: "_id",
    // },
    {
      title: "Make Admin",
      key: "makeAdmin",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Make Admin"
          description={`Are you sure you want to make ${record.name} an admin?`}
          onConfirm={() => handleMakeAdmin(record)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            className: "bg-purple-600 hover:bg-purple-700",
            type: "primary",
          }}
          disabled={record.role === "admin"}
        >
          <Button
            type={record.role === "admin" ? "default" : "primary"}
            size="small"
            disabled={record.role === "admin"}
            icon={record.role === "admin" ? <CrownOutlined /> : null}
            className={record.role === "admin" ? "bg-purple-100" : ""}
          >
            {record.role === "admin" ? "Admin" : "Make Admin"}
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Delete User"
          description={
            <div className="space-y-2">
              <p>Are you sure you want to delete this user?</p>
              <p className="text-red-500 font-medium">{record.name}</p>
              <p className="text-gray-500 text-sm">
                This action cannot be undone.
              </p>
            </div>
          }
          onConfirm={() => handleDeleteUser(record._id)}
          okText="Yes, Delete"
          cancelText="No, Cancel"
          okButtonProps={{
            danger: true,
            className: "bg-red-600 hover:bg-red-700",
          }}
          cancelButtonProps={{
            className: "hover:bg-gray-100",
          }}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            className="hover:bg-red-100"
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6 w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title level={2} className="!mb-1">
            User Management
          </Title>
          <Text type="secondary">Manage and monitor user accounts</Text>
        </div>
        <Space size="large" className="flex-wrap">
          <Statistic
            title={<span className="text-gray-600 text-base">Total Users</span>}
            value={totalUsers}
            prefix={<TeamOutlined />}
            className="bg-gradient-to-br from-purple-50 to-white !p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-purple-100 min-w-[200px]"
            valueStyle={{ color: "#6B46C1", fontWeight: "bold" }}
          />
          <Statistic
            title={<span className="text-gray-600 text-base">Admins</span>}
            value={adminCount}
            prefix={<CrownOutlined />}
            className="bg-gradient-to-br from-amber-50 to-white !p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100 min-w-[200px]"
            valueStyle={{ color: "#B45309", fontWeight: "bold" }}
          />
          <Statistic
            title={
              <span className="text-gray-600 text-base">Active Users</span>
            }
            value={activeUsers}
            prefix={<UserOutlined />}
            className="bg-gradient-to-br from-green-50 to-white !p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 min-w-[200px]"
            valueStyle={{ color: "#059669", fontWeight: "bold" }}
          />
        </Space>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <Card className="shadow-md border-0 min-w-[800px]">
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={users}
            rowKey="_id"
            bordered
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
              className: "px-4",
              responsive: true,
              size: "default",
              showQuickJumper: true,
              position: ["bottomCenter"],
            }}
            className="rounded-lg"
            size="middle"
            tableLayout="auto"
          />
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
