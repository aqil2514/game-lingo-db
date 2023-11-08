import express from "express";
import cors from "cors";
import "./utils/db.js";
import Char from "./models/evertale/char.js";
import Weapons from "./models/evertale/weapons.js";
import LeaderSkills from "./models/evertale/leaderskills.js";
import General from "./models/evertale/general.js";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
  console.log(`Server berjalan pada port 3000`);
});
