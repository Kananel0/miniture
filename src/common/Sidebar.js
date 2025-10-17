import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

  const cartSelector = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartSelector]);

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };
  return (
    <div>
      <div
        style={{
          zIndex: "100",
          transform: `translateX(${isSidebarOpen ? "0%" : "100%"})`,
        }}
        className="fixed top-0 right-0 h-full overflow-y-auto transition-transform duration-300 ease-in-out bg-white shadow-lg"
      >
        <div className="mb-4 border-b">
          <h1 className="p-4 text-3xl">Your Cart</h1>
        </div>

        <div className="p-4">
          <span className="absolute top-0 right-0 p-4" onClick={closeSidebar}>
            <FaTimes />
          </span>

          {cartProducts.length === 0 ? (
            <div className="text-3xl font-bold uppercase">
              Your Cart has No Product
            </div>
          ) : (
            <div>
              {cartProducts.map((item, key) => (
                <div className="flex justify-between mb-4" key={key}>
                  <div className="flex">
                    <div className="relative">
                      <img src={item.img} alt="img" height={84} width={84} />
                      <span
                        className="absolute top-0 -mt-2 -ml-2 text-white bg-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTimes />
                      </span>
                    </div>

                    <div>
                      <p>{item.title}</p>
                    </div>
                  </div>

                  <div>
                    <p>{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-center w-full p-6 font-bold text-white bg-black">
                <h2>
                  Sub Total : <span>${totalAmount}</span>
                </h2>
                <div className="px-6 py-3 ml-4 text-black rounded-sm bg-rose-100">
                  <Link to="/cart">View Cart</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
