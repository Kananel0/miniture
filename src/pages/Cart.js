import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem, updateQuantity } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

  // const cartSelector = useSelector((state) => state.cart);
  // useEffect(() => {
  //   dispatch(getCartTotal());
  // }, [cartSelector]);

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };

  const increaseQuantity = (itemId, currentQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: currentQuantity + 1 }));
    dispatch(getCartTotal());
  };
  const decreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: currentQuantity - 1 }));
      dispatch(getCartTotal());
    }
  };

  return (
    <div>
      <div>
        <PageHeading home={"home"} pagename={"Cart"} />
      </div>
      <div className="w-10/12 m-auto">
        <div className="mt-8">
          {cartProducts.length === 0 ? (
            <div className="text-3xl font-bold uppercase">
              Your Cart has No Product
            </div>
          ) : (
            <div>
              <div>
                <table className="w-full shadow-2xl rounded-2xl">
                  <thead className="font-semibold text-white bg-blue-950">
                    <tr>
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">Product</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((item, key) => (
                      <tr key={key}>
                        <td className="px-4 py-2 text-center">
                          <span
                            className="text-red-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <FaTimes />
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center">
                            <img
                              src={item.img}
                              alt="img"
                              className="object-contain w-40 h-40 mr-2"
                            />
                            <p className="font-semibold">{item.title}</p>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">${item.price}</td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex mr-3">
                            <button
                              className="px-6 py-3 mt-4 border"
                              onClick={() =>
                                decreaseQuantity(item.id, item.quantity)
                              }
                            >
                              <PiMinus />
                            </button>
                            <span className="px-6 py-3 mt-4 border count">
                              {item.quantity || 1}
                            </span>
                            <button
                              className="px-6 py-3 mt-4 border"
                              onClick={() =>
                                increaseQuantity(item.id, item.quantity)
                              }
                            >
                              <PiPlus />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-center">
                          ${item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="w-2/5 p-6 mt-4 font-bold bg-white shadow-2xl rounded-2xl">
                <h1 className="mb-4 text-3xl text-center">Cart Total</h1>
                <h2 className="flex justify-between mt-3">
                  Sub Total : <span>${totalAmount}</span>
                </h2>

                <div className="flex justify-between mt-3">
                  Shipping Charge : <span>${10}</span>
                </div>

                <div className="flex justify-between mt-3">
                  Grand Total : <span>$ {totalAmount + 10}</span>
                </div>

                <div className="flex items-center justify-between mt-4 whitespace-nowrap">
                  <div className="px-4 py-2 text-white rounded-lg common-hover">
                    <Link to={"/login"}>Proceed To Checkout</Link>
                  </div>

                  <div className="px-4 py-2 text-white rounded-lg bg-rose-800">
                    <Link to={"/shop"}>Continue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
