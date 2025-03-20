"use client";

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRight } from "lucide-react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      products: true;
      restaurant: true;
    };
  }>;
}

const getOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "CONFIRMED":
      return "Confirmado";
    case "PREPARING":
      return "Em preparação";
    case "DELIVERING":
      return "Em transporte";
    case "COMPLETED":
      return "Entregue";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground">
          <span className="block text-xs font-semibold">
            {getOrderStatus(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-5 w-5">
            <ChevronRight />
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
