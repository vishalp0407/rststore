import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SelectInput from "@components/FormInput/SelectInput";
import TextInput from "@components/FormInput/TextInput";
import countries from "@data/countries";
import { saveShippingAddress } from "@slices/cartSlice";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="tracking-light mt-10 text-center text-2xl font-bold leading-9 text-slate-900">
            Shipping
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Adress */}
            <TextInput
              id="address"
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* City */}
            <TextInput
              id="city"
              label="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            {/* Postal Code */}
            <TextInput
              id="postal"
              label="Postal"
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
            />
            <SelectInput
              id="country"
              label="Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              options={countries}
            />
            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
