import { useContext } from "react";
import { CartContext } from "../_context/cart";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <>
      {products.map((product) => (
        <h1 key={product.id}>{product.name}</h1>
      ))}
    </>
  );
};

export default Cart;
