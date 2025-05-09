/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import { useCreateProductMutation } from "@/redux/api/productApi";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Typography,
  Card,
} from "antd";
import { useEffect } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const { TextArea } = Input;
const { Title, Text } = Typography;

const productTypes = [
  "Mountain",
  "Road",
  "Hybrid",
  "BMX",
  "Electric",
  "Fat Bikes",
];

const ratings = [1, 2, 3, 4, 5];

const AddBicycle = () => {
  const [form] = Form.useForm();
  const [createProduct, { isLoading: isSubmitting }] =
    useCreateProductMutation();
  const inStock = Form.useWatch("inStock", form);

  useEffect(() => {
    if (!inStock) {
      form.setFieldsValue({ quantity: 0 });
    }
  }, [inStock, form]);

  const handleSubmit = async (values: any) => {
    try {
      const productData = {
        name: values.name,
        Img: values.Img,
        brand: values.brand,
        price: values.price,
        type: values.type,
        description: values.description,
        quantity: values.quantity,
        inStock: values.inStock,
      };

      await createProduct(productData).unwrap();
      toast.success("Product created successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="flex justify-center items-start w-full px-4 py-10">
      <Card className="w-full max-w-4xl shadow-lg border border-gray-200 rounded-lg">
        <div className="mb-8 text-center">
          <Title level={2}>Add a Bicycle</Title>
          <Text type="secondary">Fill in the details to add a new bicycle</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          name="createProduct"
          onFinish={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the product name" },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              label="Image URL"
              name="Img"
              rules={[{ required: true, message: "Please enter an image URL" }]}
            >
              <Input placeholder="https://example.com/bike.jpg" />
            </Form.Item>

            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please enter the brand" }]}
            >
              <Input placeholder="Enter brand name" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter the price" }]}
            >
              <InputNumber
                className="w-full!"
                min={0}
                prefix="$"
                placeholder="Enter price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: false, message: "Please enter a rating" }]}
            >
              <Select placeholder="Select rating">
                {ratings.map((rating) => (
                  <Select.Option key={rating} value={rating}>
                    {rating}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select a type" }]}
            >
              <Select placeholder="Select bike type">
                {productTypes.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <TextArea rows={5} placeholder="Describe the bicycle..." />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please enter the quantity" }]}
            >
              <InputNumber
                className="w-full!"
                min={0}
                placeholder="Enter quantity"
                disabled={!inStock}
              />
            </Form.Item>

            <Form.Item
              name="inStock"
              valuePropName="checked"
              initialValue={true}
            >
              <Checkbox>In Stock</Checkbox>
            </Form.Item>
          </div>

          {/* Submit Button — spans full width below both columns */}
          <div className="md:col-span-2 mt-4">
            <Form.Item>
              <CustomButton
                type="submit"
                className="w-full !py-2"
                textName={
                  isSubmitting ? (
                    <TbFidgetSpinner className="animate-spin" />
                  ) : (
                    "Create Product"
                  )
                }
              />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddBicycle;
