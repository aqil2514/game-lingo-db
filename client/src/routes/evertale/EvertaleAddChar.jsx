import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "../../component/Navbar";

export default function EvertaleAddChar() {
  const [data, setData] = useState({ rankChar: [], weapon: [], elements: [], leaderSkill: [] });
  const ls = useRef(null);
  const lsEnglish = useRef(null);
  const lsIndo = useRef(null);

  async function api() {
    const response = await fetch("https://game-lingodb.cyclic.app/evertale/chars", {
      credentials: "include",
    });
    const data = await response.json();
    if (!data.token) {
      alert("Anda bukan admin!");
      document.location = "/evertale/char";
      return;
    }

    const weapon = await fetch("https://game-lingodb.cyclic.app/evertale/weapons").then((res) => res.json());
    const leaderSkill = await fetch("https://game-lingodb.cyclic.app/evertale/leaderskills").then((res) => res.json());
    const elements = await fetch("https://game-lingodb.cyclic.app/evertale/generals")
      .then((res) => res.json())
      .then((data) => data[0].elements);
    const rankChar = await fetch("https://game-lingodb.cyclic.app/evertale/generals")
      .then((res) => res.json())
      .then((data) => data[0].rankChar);

    setData({ rankChar, elements, weapon, leaderSkill });
  }

  useEffect(() => {
    api();
  }, []);

  useLayoutEffect(() => {
    document.title = `Game Lingo - Add Character `;
  }, []);

  function lsHandler() {
    const parent = data.leaderSkill.find((dls) => ls.current.value === dls.name);

    lsEnglish.current.value = parent.descEN;
    lsIndo.current.value = parent.descID;
  }

  return (
    <section>
      <Navbar />
      <h1 className="text-center">Add Evertale Char</h1>

      <div className="container">
        <form onSubmit={(event) => submitHandler(event)} method="post" action="https://game-lingodb.cyclic.app/evertale/chars">
          <div className="mb-3">
            <label htmlFor="charName" className="form-label">
              Char Name
            </label>
            <input type="text" className="form-control" id="charName" name="charName" required />
          </div>
          <div className="mb">
            <h2 className="text-center">Status</h2>

            <select className="form-select my-3" name="element">
              <option value={"-"}>Select Element</option>
              {data?.elements.map((e, i) => (
                <option value={e} key={`el-${i++}`} id={`el-${i++}`}>
                  {e}
                </option>
              ))}
            </select>

            <select className="form-select my-3" name="rankChar">
              <option value={"-"}>Select Rank Char</option>
              {data?.rankChar.map((rc, i) => (
                <option value={rc} key={`rc${i++}`} id={`rc${i++}`}>
                  {rc}
                </option>
              ))}
            </select>

            <select className="form-select my-3" name="weapon1">
              <option value={"-"}>Select Weapon</option>
              {data?.weapon.map((weapon) => (
                <option value={weapon.name} key={weapon._id} id={weapon._id}>
                  {weapon.name}
                </option>
              ))}
            </select>

            <select className="form-select my-3" name="weapon2">
              <option value={"-"}>Select Weapon</option>
              {data?.weapon.map((weapon) => (
                <option value={weapon.name} key={weapon._id} id={weapon._id}>
                  {weapon.name}
                </option>
              ))}
            </select>

            <select ref={ls} className="form-select my-3" name="leaderSkillName" onChange={lsHandler}>
              <option value={"-"}>Select Leader Skill</option>
              {data?.leaderSkill.map((ls) => (
                <option value={ls.name} key={ls._id} id={ls._id}>
                  {ls.name}
                </option>
              ))}
            </select>

            <input type="hidden" ref={lsEnglish} name="leaderSkillEN" />
            <input type="hidden" ref={lsIndo} name="leaderSkillID" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
