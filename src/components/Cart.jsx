import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useFirebase } from "../firebase/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getTotalPayment} from "../redux-toolkit/selectors/cartSelectors"
import { setCart, removeItem, incrementQuantity, decrementQuantity } from "../redux-toolkit/slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const reduxCart = useSelector((state) => state.cart);
  const payment = useSelector(getTotalPayment);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [payloading, setPayloading] = useState(false);
  const { user,isLoggedIn,getCart, addQuantity, subQuantity, removeFromCart } = useFirebase();


  const fetchCart = async () => {
      const prods = await getCart(user.uid);
      const final = prods.map((prod) => ({ ...prod, user: user.uid }));
      dispatch(setCart(final));
  };

  useEffect(() => {
    if (user && (reduxCart.length ===0 || reduxCart[0].user !== user.uid || reduxCart.some((prod)=>prod.storeid === undefined))) 
    fetchCart();

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [user,reduxCart]);

  const handleRemove = async (item) => {
    await removeFromCart(user.uid, item);
    dispatch(removeItem(item));
  };

  const handleAddQuantity = async (item) => {
    setLoading(true);
    await addQuantity(user.uid, item);
    dispatch(incrementQuantity(item));
    setLoading(false);
  };

  const handleSubQuantity = async (item) => {
    setLoading(true);
    await subQuantity(user.uid, item);
    dispatch(decrementQuantity(item));
    setLoading(false);
  };

  const makePayment = async () => {
    setPayloading(true)
    const stripe = await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);
    const response = await fetch(`${import.meta.env.VITE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reduxCart),
    });
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (session.error) {
      console.error(result.error.message);
    }
    setPayloading(false);
  };

  if(user && reduxCart.length && reduxCart[0].user !== user?.uid) return <div className="text-center mt-3">Loading...</div>

  return (
    <div className="products w-[90vw] m-auto flex flex-col items-center gap-6 mt-6">
      <h1 className="text-xl text-center font-bold underline">Your Cart</h1>
      <div className="flex justify-around flex-wrap gap-6 w-full">
        {!reduxCart ? 'loading...' : !reduxCart.length>0 ? 'No products found....' : reduxCart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 items-center w-[45%] lg:w-1/4 min-h-fit border border-black rounded-xl p-6 cursor-pointer shadow-lg hover:shadow-gray-500"
          >
            <img src={`${item.image}`} className="w-24 h-32" alt={item.title} />
            <h1 className="text-md font-semibold text-center h-[7vh]">
              {item.title.slice(0, 30)}
            </h1>
            <span className="font-semibold text-lg">{item.price} $</span>
            <div className="buttons flex justify-around w-full">
              <button
                className="bg-red-500 text-md text-white p-2 rounded-2xl"
                onClick={() => handleRemove(item)}
              >
                Remove
              </button>
              <span className="bg-blue-500 flex gap-2 items-center text-md text-white rounded-2xl">
                <button
                  className="hover:text-green-500 font-bold cursor-pointer w-6 h-full rounded-l-2xl"
                  onClick={() => handleAddQuantity(item)}
                >
                  +
                </button>
                {loading?<img src="src/assets/load.svg" alt="..."/>:`Quantity: ${item.quantity || 1}`}
                <button
                  className="hover:text-red-500 font-bold cursor-pointer w-6 h-full rounded-r-2xl disabled:cursor-default disabled:hover:text-white"
                  disabled={item.quantity === 1}
                  onClick={() => handleSubQuantity(item)}
                >
                  -
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-md text-white p-2 rounded-2xl cursor-pointer disabled:bg-gray-500 hover:text-black hover:bg-green-500 w-32 text-center flex justify-center items-center"
        disabled={payment === 0}
        onClick={makePayment}
      >
       {payloading?<img src="src/assets/load.svg" alt="loading"/>:`Pay ${payment}$`} 
      </button>
    </div>
  );
};

export default Cart;
