import express from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"
import { middleware } from "./middleware";
import { CreateUserSchema } from "@repo/common/types"

const app = express();
const PORT = 3001;

app.post("/signup", (req,res) => {
    const data = CreateUserSchema.safeParse(req.body)

    if(!data.success) {
         res.json({
            message: "Incorrect inputs"
        })
        return
    }
})

app.post("/signin", (req, res) => {
    const userId = 1;

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        token
    })
})


app.post("/room", middleware, (req,res) => {
    res.json({
        roomId: 123 
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})