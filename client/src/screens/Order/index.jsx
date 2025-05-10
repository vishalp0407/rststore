import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "@slices/orderApiSlice";
import { useEffect } from "react";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        }),
          paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPay, errorPayPal, loadingPayPal]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        console.log(details);
        await payOrder({ id: orderId, details });
        refetch();
        toast.success("Order paid successfully");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    });
  };

  const onError = (error) => {
    toast.error(error.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Alert type="error">{error?.data?.message}</Alert>
  ) : (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 pb-24 pt-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Your Order <span className="text-xl font-medium">({orderId})</span>
        </h1>

        <div className="mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 text-sm text-slate-600">
              <div>
                <dt className="font-medium text-slate-900">Shipping</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    <span className="block">
                      {order.shippingAddress.address}
                    </span>
                    <span className="block">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.postalCode}
                    </span>
                    <span className="block">
                      {order.shippingAddress.country}
                    </span>
                  </address>

                  <div className="mt-4">
                    {order?.isDelivered ? (
                      <span className="flex items-center gap-1.5 text-green-600">
                        <CheckBadgeIcon className="h-4 w-4 text-green-500" />
                        <span>Delivered</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-600">
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                        <span>Not Delivered</span>
                      </span>
                    )}
                  </div>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900">Payment</dt>
                <dd className="mt-2">
                  <span className="capitalize text-slate-900">
                    {order.paymentMethod}
                  </span>

                  <div className="mt-4">
                    {order?.isPaid ? (
                      <span className="flex items-center gap-1.5 text-green-600">
                        <CheckBadgeIcon className="h-4 w-4 text-green-500" />
                        <span>Paid</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-600">
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                        <span>Not Paid</span>
                      </span>
                    )}
                  </div>
                </dd>
              </div>
            </dl>

            <div className="mt-14">
              <h2 className="text-lg font-medium text-slate-900">
                Order Items
              </h2>

              <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200 text-sm font-medium text-slate-500">
                {order?.orderItems?.map((product) => (
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
                    ₹{order.itemsPrice}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{order.shippingPrice}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{order.taxPrice}
                  </dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-sm">Total</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ₹{order.totalPrice}
                  </dd>
                </div>
              </dl>

              <div className="space-y-6 border-t border-slate-200 px-4 py-6 sm:px-6">
                {!order.isPaid && (
                  <>
                    {loadingPay && <Loader />}
                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
