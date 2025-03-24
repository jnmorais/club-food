"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  CupSodaIcon,
  DrumstickIcon,
  FishIcon,
  HeartIcon,
  HomeIcon,
  IceCreamIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PizzaIcon,
  SandwichIcon,
  ScrollTextIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const getCategoryIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "sobremesas":
      return IceCreamIcon;
    case "sucos":
      return CupSodaIcon;
    case "hamburguers":
      return SandwichIcon;
    case "pizza":
      return PizzaIcon;
    case "japonesa":
      return FishIcon;
    case "brasileira":
      return DrumstickIcon;
    default:
      return ShoppingBagIcon;
  }
};

const handleClickSignOut = () => signOut();
const handleClickSignIn = () => signIn();

interface Category {
  id: string;
  name: string;
}

const Header = () => {
  const { data } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Erro ao buscar categorias");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image src="/logo.png" alt="logo" fill className="object-contain" />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <div className="flex items-center gap-3 pt-6">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image as string | undefined}
                  alt="Avatar"
                />
                <AvatarFallback>
                  {data?.user?.name?.charAt(0)}
                  {data?.user?.name?.charAt(1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{data?.user?.name}</h3>
                <span className="block text-xs text-muted-foreground">
                  {data?.user?.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Olá, Faça seu login</h2>
              <Button size="icon" onClick={handleClickSignIn}>
                <LogInIcon />
              </Button>
            </div>
          )}

          <div className="py-2">
            <Separator />
          </div>

          <div className="space-y-2">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              >
                <HomeIcon size={16} />
                <span>Início</span>
              </Button>
            </Link>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span>Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span>Restaurantes Favoritos</span>
                  </Link>
                </Button>

                <div className="py-2">
                  <Separator />
                </div>

                <nav className="flex flex-col gap-2">
                  {categories.map((category) => {
                    const Icon = getCategoryIcon(category.name);
                    return (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                        asChild
                      >
                        <Link href={`/categories/${category.id}/products`}>
                          <Icon size={24} className="mr-2" />
                          {category.name}
                        </Link>
                      </Button>
                    );
                  })}
                </nav>
              </>
            )}
          </div>

          <div className="py-2">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleClickSignOut}
            >
              <LogOutIcon size={16} />
              <span>Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
