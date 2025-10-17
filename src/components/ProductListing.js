import React, { useState } from "react";
import { BiCart } from "react-icons/bi";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Modal from "../common/Modal";

const ProductListing = ({ products, pageName }) => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 1500],
  });

  const handleOpen = (productId) => setIsModalOpen(productId);
  const handleClose = () => setIsModalOpen(null);

  const categoryList = Array.from(new Set(products.map((p) => p.category)));
  const brandList = Array.from(new Set(products.map((p) => p.brand)));

  const filteredProducts = products.filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    )
      return false;
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand))
      return false;

    const price = parseFloat(product.price);
    if (price < filters.priceRange[0] || price > filters.priceRange[1])
      return false;

    return true;
  });

  const handlePriceChange = (value) =>
    setFilters({ ...filters, priceRange: value });

  const handleCheckboxChange = (filterType, value) => {
    const updated = [...filters[filterType]];
    const index = updated.indexOf(value);
    if (index === -1) updated.push(value);
    else updated.splice(index, 1);
    setFilters({ ...filters, [filterType]: updated });
  };

  return (
    <div className="flex items-start w-10/12 gap-3 m-auto mt-8">
      {/* Filters */}
      <div className="w-1/4 p-4 bg-white shadow-lg filterproduct">
        <h1 className="mb-4 text-4xl font-semibold">Filter</h1>

        {/* Price */}
        <div className="my-4">
          <h1 className="mb-3 text-3xl font-semibold">By Price</h1>
          <Slider
            min={0}
            max={1500}
            range
            defaultValue={filters.priceRange}
            onChange={handlePriceChange}
          />
          <div className="flex justify-between">
            <span>Min: ${filters.priceRange[0]}</span>
            <span>Max: ${filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Category */}
        <div className="my-4">
          <h1 className="mb-3 text-3xl font-semibold">By Category</h1>
          {categoryList.map((cat, i) => (
            <div key={i} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => handleCheckboxChange("categories", cat)}
              />
              <div className="ml-2">{cat}</div>
            </div>
          ))}
        </div>

        {/* Brand */}
        <div className="my-4">
          <h1 className="mb-3 text-3xl font-semibold">By Brand</h1>
          {brandList.map((brand, i) => (
            <div key={i} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleCheckboxChange("brands", brand)}
              />
              <div className="ml-2">{brand}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="grid w-8/12 grid-cols-3 gap-3">
        {filteredProducts.map((item) => (
          <div key={item.id} className="relative ml-4 overflow-hidden">
            <div className="relative image-container">
              <img src={item.img} alt={item.title} className="rounded-3xl" />
              <div className="absolute top-0 right-0 m-4 opacity-0">
                <div className="p-4 mb-2 bg-white rounded-full">
                  <IoMdHeartEmpty />
                </div>
                <div className="p-4 bg-white rounded-full">
                  <IoMdSearch />
                </div>
              </div>
              <div className="absolute right-0 p-4 bg-white opacity-0 -bottom-3 rounded-s-2xl">
                <button
                  className="grid w-10 h-10 text-2xl text-white bg-black place-items-center rounded-3xl"
                  onClick={() => handleOpen(item.id)}
                >
                  <BiCart />
                </button>
              </div>
            </div>
            <div className="mt-2 product-details">
              <p className="mb-2">{item.title}</p>
              <p>${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        data={products.find((p) => p.id === isModalOpen)}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ProductListing;
