import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="w-full h-[136px] relative">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute gap-[2px] top-2 left-2 bg-white flex items-center py-[2px] px-2 rounded-full">
          <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
          <span className="font-semibold text-xs">5,0</span>
        </div>
        <Button className="absolute top-2 right-2 bg-gray-700 rounded-full h-7 w-7"> 
            <HeartIcon size={16} className="fill-white"/>
        </Button>
      </div>
      <div>
        <h3 className="font-semibold text-sm">{restaurant.name}</h3>
        <div className="flex gap-3">
          <div className="flex gap-1">
            <BikeIcon className="text-primary" size={12} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>
          <div className="flex gap-1">
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
