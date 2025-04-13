import { RootState } from "@/redux/store";
import { Checkbox, Input, Select, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/features/filterSlice/filterSlice";

const { Option } = Select;

const AllBicycleFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Search</label>
        <Input
          placeholder="Search by name, model, or brand"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Price Range</label>
        <Slider
          range
          min={0}
          max={100000}
          step={100}
          value={filters.priceRange}
          onChange={(value) => handleChange("priceRange", value)}
        />
        <div className="text-sm text-gray-500">
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </div>
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Type</label>
        <Select
          placeholder="Select Type"
          className="w-full"
          value={filters.type}
          onChange={(value) => handleChange("type", value)}
          allowClear
        >
          <Option value="">All</Option>
          <Option value="road">Road</Option>
          <Option value="mountain">Mountain</Option>
          <Option value="hybrid">Hybrid</Option>
        </Select>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Brand</label>
        <Select
          placeholder="Select Brand"
          className="w-full"
          value={filters.brand}
          onChange={(value) => handleChange("brand", value)}
          allowClear
        >
          <Option value="">All</Option>
          <Option value="valoc">Valoc</Option>
          <Option value="duronto">Duronto</Option>
          <Option value="speedX">SpeedX</Option>
          <Option value="BMW">BMW</Option>
        </Select>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <Checkbox
          checked={filters.availability}
          onChange={(e) => handleChange("availability", e.target.checked)}
        >
          Only Available Products
        </Checkbox>
      </div>
    </div>
  );
};

export default AllBicycleFilter;
