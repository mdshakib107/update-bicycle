/* eslint-disable @typescript-eslint/no-unused-vars */
// import image

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import CustomButton from "./CustomButton";

export interface ItemData {
  map?(arg0: (d: ItemData) => JSX.Element): import("react").ReactNode;
  name?: string;
  Img?: string;
  brand?: string;
  price?: number;
  type?: string;
  description?: string;
  quantity?: number;
  inStock?: boolean;
  _id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  rating?: number;
  isDeleted?: boolean;
}

export interface ItemsCardProps {
  data: ItemData;
  isPending: boolean;
}

const ItemsCard: React.FC<ItemsCardProps> = ({ data, isPending }) => {
  // loading state
  const [_setLoading] = useState<boolean>(isPending);

  // mavigation
  const navigate = useNavigate();

  // destructure items
  const {
    // brand,
    // description,
    inStock,
    name,
    // quantity,
    Img,
    // type,
    // updatedAt,
    _id,
    price,
    // rating,
    // createdAt,
    // isDeleted,
  } = data;

  //* button for card
  // const actions: React.ReactNode[] = [<></>];

  //* rating
  const randomRating = Math.floor(Math.random() * 5) + 1;

  return (
    <Link to={`/bicycles/${_id}`}>
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden transform hover:scale-[1.03] transition duration-300 ease-in-out hover:shadow-2xl border border-gray-200 relative group">
        <img
          src={Img}
          alt={name}
          className="w-full p-12 h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800 truncate">
            {name}
          </h2>

          <p className="text-sm font-bold text-blue-600">{price} ৳</p>

          {/* ⭐ Star Ratings */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-3 w-3 transition-all duration-200 ${
                  index < randomRating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.444a1 1 0 00-.364 1.118l1.287 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.443a1 1 0 00-1.175 0l-3.36 2.443c-.784.57-1.838-.197-1.539-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.075 9.372c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
            ))}
          </div>

          {/* 🛒 Buy Now Button */}
          <div className="text-left">
            <CustomButton
              handleAnything={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/checkout/${_id}`);
              }}
              textName={
                <div className="flex gap-1 justify-center items-center">
                  <ShoppingCart />
                  <span className="font-medium">Buy Now</span>
                </div>
              }
              className=" text-sm p-1! bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-md hover:from-indigo-600 hover:to-blue-600 transition"
            />
          </div>
        </div>
        {inStock !== undefined && (
          <span
            className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full shadow-md ${
              inStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        )}

        {/* Hover Badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded shadow hidden group-hover:block transition">
          🚲 Bicycle Product
        </div>
      </div>
    </Link>
  );
};

export default ItemsCard;
