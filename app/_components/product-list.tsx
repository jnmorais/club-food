import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
    const products = await db.product.findMany({
        where:{
            discountPercentage:{
                gt:0
            }
        },
        take:10,
        include:{
            restaurant: {
                select:{
                    name:true
                }
            }
        },
    })
    return ( 
    <div className= "flex overflow-scroll pt-5 [&::-webkit-scrollbar]:hidden gap-4">
        {products.map((product) =>(
        <ProductItem key={product.id} product={product}/>
))} </div>
   
     );
}
 
export default ProductList;