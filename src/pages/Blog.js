import React from "react";
import PageHeading from "../common/PageHeading";
import { products } from "../data/Data";
import ProductListing from "../components/ProductListing";

const Blog = () => {
  // Filter only kitchen products
  const kitchenProducts = products.filter(
    (product) => product.category === "Kitchen"
  );

  return (
    <div>
      <PageHeading home={"home"} pagename={"Kitchen"} />
      <ProductListing products={kitchenProducts} pageName="Kitchen" />
    </div>
  );
};

export default Blog;
