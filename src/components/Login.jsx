import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";

const Login = () => {

  const {isLoggedIn, signInWithGoogle} = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);


  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        
          <button
            onClick={() => {
              signInWithGoogle()
                .then(() => {
                  navigate("/cart");
                })
                .catch((err) => {
                  alert(err.message);
                });
            }}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue with Google
          </button>
        </div>
    </>
  );
};

export default Login;
