import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SignInSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.username,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists with this username",
    });
  }
});
app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error);
    return res.status(400).json({ message: "Incorrect inputs" });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (!user) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const valid = await bcrypt.compare(parsedData.data.password, user.password);
  if (!valid) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }

  // @ts-ignore
  const userId = req.userId;

  await prismaClient.room.create({
    data: {
      slug: parsedData.data.name,
      adminId: userId,
    },
  });
  res.json();
});


app.get("/chats/:roomId",  async (req,res) => {
  const roomId = Number(req.params.roomId)
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: "desc"
    },
    take: 50
  })

  res.json({
    messages
  })
})
app.listen(3001);
