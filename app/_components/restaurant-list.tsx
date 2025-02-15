import { db } from "@/app/_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList  = async () => {
    const restaurants = await db.restaurant.findMany({take:10})
    return ( 
        <div className="flex overflow-x-auto pt-5 px-5 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
        {restaurants.map((restaurant) =>(
        <RestaurantItem key={restaurant.id} restaurant={restaurant}/>
))} </div>
     );
}
 
export default RestaurantList;