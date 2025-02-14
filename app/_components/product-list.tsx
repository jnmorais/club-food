import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

interface ProductListProps{
    products: Prisma.ProductGetPayload<{
        include:{
          restaurant: {
            select:{
              name:true
            }
          }
        }
      }>[]
}
 
const ProductList = ({products}: ProductListProps) => {
    return ( 
    <div className= "flex overflow-scroll pt-5 [&::-webkit-scrollbar]:hidden gap-4">
        {products.map((product) =>(
        <ProductItem key={product.id} product={product}/>
))} </div>
   
     );
}
 
export default ProductList;