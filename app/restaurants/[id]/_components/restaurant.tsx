"use client";

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "../../_actions/search";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchParams]);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
