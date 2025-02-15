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
      <div className="flex overflow-x-auto pt-5 px-5 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
        {products.map((product) =>(
        <ProductItem key={product.id} product={product}/>
))} </div>
   
     );
}
 
export default ProductList;