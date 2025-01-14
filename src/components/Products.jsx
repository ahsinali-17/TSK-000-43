import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart, addItem } from "../redux-toolkit/slices/CartSlice";
import { fetchProducts,incPage, decPage } from "../redux-toolkit/slices/ProductSlice";
import { displayProducts } from "../redux-toolkit/selectors/cartSelectors";
import { setLoad } from "../redux-toolkit/slices/ProductSlice";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const { user, addToCart, emptyCart } = useFirebase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchparams] = useSearchParams();
  const [loading, setLoading] = useState(null);
  const cart = useSelector((state) => state.cart);
  const pageProducts = useSelector(displayProducts);
  const page = useSelector((state) => state.products.page);
  const payLoading = useSelector((state) => state.products.loading);
  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    dispatch(fetchProducts(data));
  };

  useEffect(() => {
    if (pageProducts?.length === 0) fetchData();
    const paySuccess = async () => {
      if (searchParams.get("success")) {
        dispatch(setLoad(true));
        await emptyCart(cart[0].user);
        dispatch(setCart([]));
        dispatch(setLoad(false));
        toast.success("Payment Successful...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSearchparams("");
      }

      if (searchParams.get("cancelled")) {
        toast.success("Payment Failed...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setSearchparams("");
      }
    };
    paySuccess();
  }, []);

  if (payLoading) return <div className="text-lg text-center">Loading...</div>;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="products w-[90vw] m-auto flex flex-wrap gap-6 justify-center mt-3">
        {pageProducts?.length === 0
          ? "loading..."
          : pageProducts?.map((item) => {
              const added = cart?.some((product) => product.id === item.id);
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 items-center w-[45%] lg:w-1/4 min-h-fit border border-black rounded-xl p-6 cursor-pointer shadow-lg hover:shadow-gray-500"
                >
                  <img src={item.image} className="w-24 h-32" alt="product" />
                  <h1 className="text-md font-semibold text-center">
                    {item.title}
                  </h1>
                  <span className="font-semibold text-lg">{item.price} $</span>
                  <button
                    disabled={added}
                    className={`${
                      added ? "bg-green-500" : "bg-black"
                    } text-md text-white p-2 rounded-2xl`}
                    onClick={() =>{
                      setLoading(item.id);
                      user
                        ? addToCart(user.uid, { ...item, quantity: 1 }).then(
                            () =>
                              dispatch(
                                addItem({
                                  ...item,
                                  quantity: 1,
                                  user: user.uid,
                                })
                              )
                          ).finally(() => setLoading(null))
                        : navigate("/login")
                    }}
                  >
                    {loading === item.id?<img src="src/assets/load.svg" alt="adding..."/> :added ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
            <div className="buttons flex justify-around w-full my-3">
              <button
                className="bg-blue-500 text-md text-white p-2 rounded-2xl w-24 disabled:bg-gray-500"
                disabled={page === 0}
                onClick={() => dispatch(decPage())}
              >
                Prev
              </button>
              <button
                className="bg-blue-500 text-md text-white p-2 rounded-2xl w-24 disabled:bg-gray-500"
                onClick={() => dispatch(incPage())}
                disabled={page*6>=pageProducts.length}
              >
                Next
              </button>
            </div>
      </div>
    </>
  );
};

export default Products;
