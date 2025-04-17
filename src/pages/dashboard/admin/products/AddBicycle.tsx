import CustomButton from "@/components/shared/CustomButton";
import { Form, Input, InputNumber, Select, Checkbox } from "antd";
import { TbFidgetSpinner } from "react-icons/tb";

const { TextArea } = Input;

const productTypes = ["Mountain", "Road", "Hybrid", "BMX", "Electric"];

const AddBicycle = ({ isLoading = false }) => {
  const [form] = Form.useForm();

  return (
    <div className="flex justify-center items-center w-full">
      <div className="p-8 border rounded shadow-md border-purple-600 shadow-purple-600 w-full max-w-4xl">
        <Form form={form} layout="vertical" name="createProduct">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div>
              {/* Name */}
              <Form.Item
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter the product name" },
                ]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>

              {/* Image */}
              <Form.Item label="Image URL" name="Img">
                <Input placeholder="Enter image URL (optional)" />
              </Form.Item>

              {/* Brand */}
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true, message: "Please enter the brand" }]}
              >
                <Input placeholder="Enter brand name" />
              </Form.Item>

              {/* Price */}
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
              {/* Type */}
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

              {/* Description */}
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please add a description" },
                ]}
              >
                <TextArea rows={4} placeholder="Enter product description" />
              </Form.Item>

              {/* Quantity */}
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

              {/* In Stock */}
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
                isLoading ? (
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
