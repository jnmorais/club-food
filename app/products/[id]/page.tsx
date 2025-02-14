import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";


interface ProductPageProps {
  params: {
    id: string;
  };
}
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });
  const productsRestaurant = await db.product.findMany({
    where: {
      restaurantId: product?.restaurantId, 
      id: { not: product?.id },
    },
    include: {
      restaurant: { 
        select: {
          id: true,
          name: true,
          imageUrl: true,
          deliveryTimeMinutes: true,
          deliveryFee: true,
        },
      },
    },
  });
  
  if (!product) {
    return notFound();
  }
  return (
    <div>
      {/* IMAGEM */}
      <ProductImage product={product} />
      {/* TITULO E PREÇO */}
      <ProductDetails product={product} complementaryProducts={productsRestaurant} />
    </div>
  );
};
export default ProductPage;