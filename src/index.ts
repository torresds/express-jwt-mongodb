import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import { UserRouter } from "./routes/router";

const client = new MongoClient(process.env.MONGO_URL!);
const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Alive at ${process.env.PORT}`);
    try {
        await client.connect();
        app.use("/users", UserRouter(client));
        console.log(`Connected to database`);
    } catch (error) {
        console.log(error)
    }
});