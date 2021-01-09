import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// check `name` duplicate
export const isNameDuplicate = async (name: string, id: number = null) => {
  const createWhere = {
    where: {
      name: name,
    },
  };
  const updateWhere = {
    where: {
      name: name,
      id: {
        not: id,
      },
    },
  };

  const option = id ? updateWhere : createWhere;
  const count = await prisma.beverage.count(option);
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
export const getBeverageData = async (id: string | number) => {
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
