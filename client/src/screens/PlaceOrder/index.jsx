import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CheckoutSteps from "@components/CheckoutSteps";
import Loader from "@components/Loader";
import { clearCartItems } from "@slices/cartSlice";
import { useCreateOrderMutation } from "@slices/orderApiSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress, cart.paymentMethod, navigate]);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlerPlaceOrder = async () => {
    try {
      const response = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());

      navigate(`/order/${response._id}`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-center">
          <CheckoutSteps step1 step2 step3 step4 />
        </div>
        <h1 className="mt-10 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Place Order
        </h1>

        <div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 text-sm text-slate-600">
              <div>
                <dt className="font-medium text-slate-900">Shipping Address</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    <span className="block">
                      {cart.shippingAddress.address}
                    </span>
                    <span className="block">
                      {cart.shippingAddress.city},{" "}
                      {cart.shippingAddress.postalCode}
                    </span>
                    <span className="block">
                      {cart.shippingAddress.country}
                    </span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Payment Method</dt>
                <dd className="mt-2">
                  <span className="capitalize text-slate-900">
                    {cart.paymentMethod}
                  </span>
                </dd>
              </div>
            </dl>

            <div className="mt-14">
              <h2 className="text-lg font-medium text-slate-900">
                Order Items
              </h2>

              <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200 text-sm font-medium text-slate-500">
                {cart?.cartItems?.map((product) => (
                  <li key={product._id} className="flex space-x-6 py-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-24 flex-none rounded-md bg-slate-100 object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-slate-900">
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p>Quantity: {product.qty}</p>
                    </div>
                    <p className="flex-none text-right font-medium text-slate-900">
                      <span className="font-normal text-slate-900">
                        {product.qty} x ₹{product.price}{" "}
                      </span>
                      = ₹{product.price * product.qty}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-lg font-medium text-slate-900">
              Order summary
            </h2>

            <div className="mt-4 rounded-lg border border-slate-200 bg-white shadow-sm">
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Items</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{cart.itemsPrice}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{cart.shippingPrice}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{cart.taxPrice}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm">Total</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{cart.totalPrice}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-slate-200 px-6 py-6 sm:px-6">
                <button
                  onClick={handlerPlaceOrder}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 cursor-pointer focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Place Order
                </button>
              </div>

              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
