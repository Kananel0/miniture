import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem, updateQuantity } from "../redux/cartSlice";
import PageHeading from "../common/PageHeading";
import { PiMinus, PiPlus } from "react-icons/pi";
import { Link } from "react-router-dom";
import PaypalButton from "./PaypalButton"; 

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector((state) => state.cart);

  const [shippingInfo, setShippingInfo] = useState({
    email: "", phone: "", address: "", city: "", zipCode: "",
  });

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };

  const updateQty = (itemId, newQty) => {
    if (newQty > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQty }));
      dispatch(getCartTotal());
    }
  };

  const shippingCharge = 10;
  const grandTotal = totalAmount + shippingCharge;

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <PageHeading home={"home"} pagename={"Cart"} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {cartProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold uppercase text-gray-400">Your Cart is Empty</h2>
            <Link to="/shop" className="mt-4 inline-block bg-blue-950 text-white px-6 py-2 rounded-lg">Go Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: PRODUCTS (Stack on mobile, Table on Desktop) */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold mb-4 lg:hidden">Your Items</h2>
              
              {/* Desktop Table View (Hidden on Mobile) */}
              <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-blue-950 text-white">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-center">Quantity</th>
                      <th className="p-4 text-right">Subtotal</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4 flex items-center space-x-4">
                          <img src={item.img} alt="" className="w-16 h-16 object-contain" />
                          <span className="font-medium text-sm">{item.title}</span>
                        </td>
                        <td className="p-4 text-gray-600">${item.price}</td>
                        <td className="p-4">
                          <div className="flex justify-center items-center border rounded-lg w-28 mx-auto">
                            <button className="p-2" onClick={() => updateQty(item.id, item.quantity - 1)}><PiMinus /></button>
                            <span className="px-2">{item.quantity}</span>
                            <button className="p-2" onClick={() => updateQty(item.id, item.quantity + 1)}><PiPlus /></button>
                          </div>
                        </td>
                        <td className="p-4 text-right font-bold">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="p-4 text-center">
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500"><FaTimes /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View (Hidden on Desktop) */}
              <div className="md:hidden space-y-4">
                {cartProducts.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-start space-x-4 border border-gray-100">
                    <img src={item.img} alt="" className="w-20 h-20 object-contain bg-gray-50 rounded" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-1"><FaTimes /></button>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">${item.price}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-md">
                          <button className="p-1 px-2 border-r" onClick={() => updateQty(item.id, item.quantity - 1)}><PiMinus size={12}/></button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button className="p-1 px-2 border-l" onClick={() => updateQty(item.id, item.quantity + 1)}><PiPlus size={12}/></button>
                        </div>
                        <span className="font-bold text-blue-950">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: SHIPPING & CHECKOUT */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Checkout Details</h3>
                
                <div className="space-y-3 mb-6">
                  <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-1 focus:ring-blue-900 text-sm"/>
                  <input name="phone" type="text" placeholder="Phone Number" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-1 focus:ring-blue-900 text-sm"/>
                  <input name="address" type="text" placeholder="Full Address" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-1 focus:ring-blue-900 text-sm"/>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span><span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Shipping</span><span>${shippingCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-extrabold text-blue-950 pt-2">
                    <span>Total</span><span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <PaypalButton totalAmount={grandTotal} shippingData={shippingInfo} />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;