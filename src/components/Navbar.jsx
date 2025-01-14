import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFirebase } from "../firebase/Firebase";
import { setCart } from "../redux-toolkit/slices/CartSlice";

export default function Navbar() {
  const { user, logout } = useFirebase();
  const cartCount = useSelector((state) => state.cart.length); 
  const loading = useSelector((state) => state.products.loading);
  const dispatch = useDispatch();
  
  return (
    <div className="flex justify-between px-3 py-2 bg-black">
      <div className="left flex gap-6 items-center">
        <span className="text-white text-xl italic font-bold">StripeWalaStore</span>
        <Link to="/">
          <span className="text-gray-500 hover:text-white font-semibold">
            Products
          </span>
        </Link>
      </div>
      <div className="right">
        {user && user !== undefined ? (
          <div className="flex items-center gap-3">
            <Link to="/cart" className="flex items-center p-2 relative">
              <img src="src/assets/cart.svg" alt="cart" />
              {(cartCount > 0 && !loading) && (
                <span className="text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm absolute -top-2 -right-2">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={()=>{
                dispatch(setCart([]));
                logout();
              }
              }
              className="bg-red-500 flex items-center gap-3 py-1 px-2 rounded-md w-32 h-fit"
            >
              <img
                src={user.photoURL?user.photoURL:"src/assets/user.png"}
                alt="user"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login">
            <span className="text-gray-500 hover:text-white font-semibold">
              Login
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
