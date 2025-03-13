import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <>
      <div>
        <div className="space-y-2">
          {products.map((product) => (
            <CartItem cartProduct={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
