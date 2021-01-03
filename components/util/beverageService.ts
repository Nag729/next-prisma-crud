import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// `name` duplicate check
export const isNameDuplicate = async (name) => {
  const count = await prisma.beverage.count({
    where: { name: name },
  });
  return !!count;
};
