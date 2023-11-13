import bodyParser from "body-parser";
import methodOverride from "method-override";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "./utils/db.js";
import jwt from "jsonwebtoken";

import Char from "./models/evertale/char.js";
import Weapons from "./models/evertale/weapons.js";
import LeaderSkills from "./models/evertale/leaderskills.js";
import General from "./models/evertale/general.js";
import { Conjures } from "./models/evertale/conjures.js";
import { Users } from "./models/users.js";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.ORIGIN_1],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server Aktif");
});

app.get("/admin", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.json({ msg: "Anda belum login" });
    return;
  }

  const secretKey = process.env.SECRET_KEY;
  const compared = await jwt.verify(token, secretKey);

  res.json({ user: compared.user, token });
});

app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
      res.status(404).json({ status: 404, message: "User not found!" });
      return;
    }

    const compared = await bcrypt.compare(password, user.password);

    if (!compared) {
      res.status(400).json({ status: 400, message: "Wrong Password!" });
      return;
    }

    const payload = {
      user: user.username,
      password: user.password,
    };

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.cookie("token", token, { maxAge: 60 * 60 * 1000, path: "/", domain: "localhost", secure: true, httpOnly: true });
    return res.json({ token: req.cookies.token, status: 200, message: `Success Login!` });
  } catch (error) {
    console.error(error);
    return;
  }
});

app.get("/users", async (req, res) => {
  const user = await Users.find();

  res.json(user);
});

app.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  const users = await Users.findOne({ username });

  if (users) {
    res.json({ msg: "Username telah tersedia, silahkan gunakan yang lain" });
    return;
  }

  if (username.length <= 6) {
    res.json({ msg: "Username minimal 6 karakter" });
    return;
  }

  if (password !== confirmPassword) {
    res.json({ msg: "Password tidak sama" });
    return;
  }

  if (password == username) {
    res.json({ msg: "Password dan Username tidak boleh sama" });
    return;
  }

  if (password.length <= 8) {
    res.json({ msg: "Password anda kurang dari 8 karakter" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.insertMany({ username, password: hashedPassword });
  res.json({ success: true, msg: "Berhasil dibuat. Silahkan login!" });
  return;
});

// EVERTALE SECTION

app.get("/evertale/chars", async (req, res) => {
  const chars = await Char.find();
  const token = req.cookies.token;

  res.json({ chars, token });
});

app.post("/evertale/chars", (req, res) => {
  const { charName, element, rankChar, weapon1, weapon2, leaderSkillName, leaderSkillEN, leaderSkillID } = req.body;

  Char.insertMany({
    charName,
    status: {
      element,
      rankChar,
      weapon1,
      weapon2,
      leaderSkillName,
      leaderSkillEN,
      leaderSkillID,
    },
  });

  res.json({ token });
});

app.delete("/evertale/chars", async (req, res) => {
  await Char.deleteOne({ charName: req.body.charName });

  res.json({ success: `Character ${req.body.charName} berhasil dihapus` });
});

app.get("/evertale/weapons", async (req, res) => {
  const weapons = await Weapons.find();

  res.json(weapons);
});

app.get("/evertale/conjures", async (req, res) => {
  const conjures = await Conjures.find();
  const token = req.cookies.token;

  res.json({ conjures, token });
});

app.post("/evertale/conjures", (req, res) => {
  const { name, link } = req.body;

  Conjures.insertMany({
    name,
    link,
  });

  res.json({ success: "Unit Conjures berhasil ditambah" });
});

app.get("/evertale/conjures/edit/:name", async (req, res) => {
  const conjure = await Conjures.findOne({ name: req.params.name });
  const token = req.cookies.token;

  res.json({ conjure, token });
});

app.delete("/evertale/conjures", async (req, res) => {
  await Conjures.deleteOne({ name: req.body.name });

  res.json({ success: `Unit conjures ${req.body.name} berhasil dihapus` });
});

app.put("/evertale/conjures", async (req, res) => {
  await Conjures.updateOne(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        link: req.body.link,
      },
    }
  );

  res.json({ success: "Unit Conjures berhasil diubah" });
});

app.get("/evertale/leaderskills", async (req, res) => {
  const leaderSkills = await LeaderSkills.find();

  res.json(leaderSkills);
});

app.get("/evertale/char/details/:charName", async (req, res) => {
  const chars = await Char.findOne({ charName: req.params.charName });
  const token = req.cookies.token;

  res.json({ chars, token });
});

app.get("/evertale/generals", async (req, res) => {
  const general = await General.find();

  res.json(general);
});

app.listen(3000, () => {
  console.log(`Server berjalan pada port http://localhost:3000`);
});
