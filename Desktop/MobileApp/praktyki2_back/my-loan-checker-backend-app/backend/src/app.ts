import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db";
import usersRouter from "./routes/users"; 
import loansRouter from "./routes/loans"; 
import friendsRouter from "./routes/friends"; 
import authRouter from "./routes/auth"; 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Serwer Express działa i jest połączony z MySQL!");
// });

app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Błąd zapytania:", err);
      return res.status(500).json({ error: "Błąd bazy danych" });
    }
    res.json(results);
  });
});

app.use("/users", usersRouter);

app.use("/loans", loansRouter);

app.use("/friends", friendsRouter);

app.use("/auth", authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));