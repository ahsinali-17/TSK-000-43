import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../redux-toolkit/slices/CartSlice";
import { getProducts } from "../redux-toolkit/slices/ProductSlice";
const Products = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.data);
  
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-3">Product Dashboard</h1>
      <div className="products w-[90vw] m-auto flex flex-wrap gap-6 justify-center mt-3">
        { products.length === 0 ? 'loading...' : products.map((item) => {
          const added = cart.filter((product) => product.id === item.id);
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 items-center w-[45%] lg:w-1/4 h-[45vh] lg:h-[53vh] border border-black rounded-xl p-6 cursor-pointer shadow-lg hover:shadow-gray-500"
            >
              <img src={`${item.image}`} className="w-24 h-32"></img>
              <h1 className="text-md font-semibold text-center">
                {item.title.slice(0, 30)}
              </h1>
              <span className="font-semibold text-lg">{item.price} $</span>
              <button disabled={added.length !== 0?true:false}
                className={`${added.length !== 0
                  ? "bg-green-500"
                  : "bg-black"} text-md text-white p-2 rounded-2xl cursor-pointer hover:text-gray-500`} 
                onClick={() => {
                  dispatch(add(item));
                }}
              >
                {added.length !== 0
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
