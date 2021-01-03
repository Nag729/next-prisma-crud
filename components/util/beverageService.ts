import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// `name` duplicate check
export const isNameDuplicate = async (name) => {
  const count = await prisma.beverage.count({
    where: { name: name },
  });
  return !!count;
};

// for getStaticPaths
export const getAllBeverageIds = async () => {
  const beverages = await prisma.beverage.findMany({
    select: { id: true },
  });

  return beverages.map((beverage) => {
    return {
      params: {
        id: String(beverage.id),
      },
    };
  });
};

// for getStaticProps
export const getBeverageData = async (id) => {
  const beverage = await prisma.beverage.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      isRecommend: true,
    },
  });
  return beverage;
};
