import express from "express";

import cors from "cors";

import router from "./routes/route1.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "You need to specify a path" });
});

app.use("/restaurants", router);

export default app;
