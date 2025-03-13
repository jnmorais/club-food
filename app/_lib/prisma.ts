/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client";

// Definindo um tipo para o cliente Prisma estendido
type ExtendedPrismaClient = ReturnType<typeof prismaClientWithExtensions>;

// Corrija a declaração global
declare global {
  var cachedPrisma: ExtendedPrismaClient | undefined;
}

// Função para criar cliente Prisma com extensões
function prismaClientWithExtensions() {
  return new PrismaClient().$extends({
    result: {
      product: {
        price: {
          needs: { price: true },
          compute(product) {
            return product.price ? product.price.toNumber() : null;
          },
        },
      },
      restaurant: {
        deliveryFee: {
          needs: { deliveryFee: true },
          compute(restaurant) {
            return restaurant.deliveryFee
              ? restaurant.deliveryFee.toNumber()
              : null;
          },
        },
      },
    },
  });
}

// Configuração do cliente Prisma
let prisma: ExtendedPrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = prismaClientWithExtensions();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = prismaClientWithExtensions();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
