import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const funcMap = {
    GET: handleRead,
    POST: handleCreate,
  };
  const func = funcMap[req.method];
  if (!func) res.status(500).json();
  func(req, res);
};

const handleCreate = async (req, res) => {
  const { name, description, price, isRecommend } = req.body;

  // TODO: `name`の重複チェック

  // prisma - CREATE
  const drink = await prisma.drink.create({
    data: { name, description, price, isRecommend },
  });
  res.json(drink);
};

const handleRead = async (req, res) => {
  // prisma - READ
  // 条件は絞らずに全件を取得
  const drink = await prisma.drink.findMany();
  res.json(drink);
};
