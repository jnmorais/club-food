import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: {
    name: string;
    imageUrl: string;
    id: string;
  };
  variant?: "button" | "default";
}

const CategoryItem = ({ category, variant = "default" }: CategoryItemProps) => {
  const baseStyles =
    "flex items-center gap-3 px-4 py-3 shadow-md rounded-lg transition-all";
  const defaultStyles = "bg-white";
  const buttonStyles = "bg-transparent hover:bg-gray-100";

  return (
    <Link
      href={`/categories/${category.id}/products`}
      className={`${baseStyles} ${variant === "button" ? buttonStyles : defaultStyles}`}
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
