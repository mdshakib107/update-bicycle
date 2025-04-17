/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomButton from "@/components/shared/CustomButton";
import { useCreateProductMutation } from "@/redux/api/productApi";
import { Form, Input, InputNumber, Select, Checkbox } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";

const { TextArea } = Input;

const productTypes = ["Mountain", "Road", "Hybrid", "BMX", "Electric", "Fat Bikes"];

const AddBicycle = () => {
  const [form] = Form.useForm();
  const [createProduct, { isLoading: isSubmitting }] =
    useCreateProductMutation();

  const handleSubmit = async (values: any) => {
    try {
      // Prepare the form data to match the API structure
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

      console.log(productData)

      // Create the product using the mutation
      await createProduct(productData).unwrap();

      // Reset the form fields after success
      form.resetFields();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="p-8 border rounded shadow-md border-purple-600 shadow-purple-600 w-full max-w-4xl">
        <Form
          form={form}
          layout="vertical"
          name="createProduct"
          onFinish={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div>
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
                rules={[{ required: true, message: "Please enter a image url" }]}
              >
                <Input placeholder="Enter image URL" />
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
            </div>

            {/* RIGHT COLUMN */}
            <div>
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
                  { required: true, message: "Please add a description" },
                ]}
              >
                <TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
              >
                <InputNumber
                  min={0}
                  className="w-full!"
                  placeholder="Enter quantity"
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
          </div>

          {/* Submit Button */}
          <Form.Item>
            <CustomButton
              type="submit"
              className="w-full !py-1.5"
              textName={
                isSubmitting ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Create Product"
                )
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddBicycle;
