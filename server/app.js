// MIDDLEWARE
import bodyParser from "body-parser";
import methodOverride from "method-override";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import "./utils/db.js";

// MODELS
import Char from "./models/evertale/char.js";
import Weapons from "./models/evertale/weapons.js";
import LeaderSkills from "./models/evertale/leaderskills.js";
import General from "./models/evertale/general.js";
import { Conjures } from "./models/evertale/conjures.js";
import { Users } from "./models/users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Server Aktif");
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (!user) {
      res.status(404).json({ status: 404, message: "User not found!" });
      return;
    }

    const compared = await bcrypt.compare(password, user.password);

    if (compared) {
      res.status(200).json({ status: 200, message: "Welcome admin!" });
      return;
    } else {
      res.status(400).json({ status: 400, message: "Wrong Password!" });
      return;
    }
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.redirect("http://localhost:5173");
    return;
  }
});

app.post("/users/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (user) {
      return res.status(404).json({ status: 404, message: "User sudah terdaftar!\nGunakan yang lain" });
    }

    const hashed = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });

    await Users.insertMany({ username, password: hashed });

    res.status(200).json({ status: 200, message: "Akun berhasil dibuat! Silahkan login!" });
  } catch (error) {
    console.error(error);
    // Handle error appropriately
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users", async (req, res) => {
  const user = await Users.find();

  res.json(user);
});

// EVERTALE SECTION

app.get("/evertale/chars", async (req, res) => {
  const chars = await Char.find();

  res.json(chars);
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

  res.redirect("http://localhost:5173/Evertale/Char");
});

app.delete("/evertale/chars", (req, res) => {
  Char.deleteOne({ charName: req.body.charName }).then((result) => {
    res.redirect("http://localhost:5173/Evertale/Char");
  });
});

app.get("/evertale/weapons", async (req, res) => {
  const weapons = await Weapons.find();

  res.json(weapons);
});

app.get("/evertale/conjures", async (req, res) => {
  const conjures = await Conjures.find();

  res.json(conjures);
});

app.post("/evertale/conjures", (req, res) => {
  const { name, link } = req.body;

  Conjures.insertMany({
    name,
    link,
  });

  res.redirect("http://localhost:5173/evertale/conjures");
});

app.get("/evertale/conjures/edit/:name", async (req, res) => {
  const conjure = await Conjures.findOne({ name: req.params.name });

  res.json(conjure);
});

app.delete("/evertale/conjures", (req, res) => {
  Conjures.deleteOne({ name: req.body.name }).then((result) => {
    res.redirect("http://localhost:5173/evertale/conjures");
  });
});

app.put("/evertale/conjures", (req, res) => {
  Conjures.updateOne(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        link: req.body.link,
      },
    }
  ).then((result) => {
    res.redirect("http://localhost:5173/evertale/conjures");
  });
});

app.get("/evertale/leaderskills", async (req, res) => {
  const leaderSkills = await LeaderSkills.find();

  res.json(leaderSkills);
});

app.get("/evertale/char/details/:charName", async (req, res) => {
  const chars = await Char.findOne({ charName: req.params.charName });

  res.json(chars);
});

app.get("/evertale/generals", async (req, res) => {
  const general = await General.find();

  res.json(general);
});

app.listen(3000, () => {
  console.log(`Server berjalan pada port http://localhost:3000`);
});
