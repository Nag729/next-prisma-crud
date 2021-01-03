import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const { name, description, price, isRecommend } = req.body;

  // TODO: `name`の重複チェック

  // prisma - CREATE
  const drink = await prisma.drink.create({
    data: { name, description, price, isRecommend },
  });
  res.json(drink);
};
