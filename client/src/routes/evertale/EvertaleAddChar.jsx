import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BACKEND_API } from "../../utils/variables";
import Navbar from "../../component/Navbar";

export default function EvertaleAddChar() {
  const [data, setData] = useState({ rankChar: [], weapon: [], elements: [], leaderSkill: [] });

  const ls = useRef(null);
  const lsEnglish = useRef(null);
  const lsIndo = useRef(null);

  async function validation() {
    try {
      const response = await fetch(`${BACKEND_API}/validation`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!data.user) {
        alert("Anda belum login!");
        document.location = "/";
        return;
      }

      if (data.user.role !== "General Admin" && data.user.role !== "Admin") {
        alert("Anda tidak berhak manipulasi data.");
        document.location = "/";
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function api() {
    const weapon = await fetch(`${BACKEND_API}/evertale/weapons`).then((res) => res.json());
    const leaderSkill = await fetch(`${BACKEND_API}/evertale/leaderskills`).then((res) => res.json());
    const elements = await fetch(`${BACKEND_API}/evertale/generals`)
      .then((res) => res.json())
      .then((data) => data[0].elements);
    const rankChar = await fetch(`${BACKEND_API}/evertale/generals`)
      .then((res) => res.json())
      .then((data) => data[0].rankChar);

    setData({ rankChar, elements, weapon, leaderSkill });
  }

  useEffect(() => {
    validation();
    api();
  }, []);

  useLayoutEffect(() => {
    document.title = `Game Lingo - Add Character `;
  }, []);

  function lsHandler() {
    const parent = data.leaderSkill.find((dls) => ls.current.value === dls.name);

    const result = {
      descEN: parent.descEN,
      descID: parent.descID,
    };

    return result;
  }

  async function submitHandler(event) {
    try {
      event.preventDefault();

      const contentBody = {
        charName: document.getElementById("charName").value,
        element: document.getElementById("element").value,
        weapon1: document.getElementById("weapon1").value,
        weapon2: document.getElementById("weapon2").value,
        leaderSkillName: document.getElementById("leaderSkillName").value,
        leaderSkillEN: lsHandler().descEN,
        leaderSkillID: lsHandler().descID,
      };

      const response = await fetch(`${BACKEND_API}/evertale/chars`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentBody),
      });

      const data = await response.json();

      alert(data.msg);
      document.location = "/evertale/char";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section>
      <Navbar />
      <h1 className="text-center">Add Evertale Char</h1>

      <div className="container">
        <form onSubmit={(event) => submitHandler(event)}>
          <div className="mb-3">
            <label htmlFor="charName" className="form-label">
              Char Name
            </label>
            <input type="text" className="form-control" id="charName" name="charName" required />
          </div>
          <div className="mb">
            <h2 className="text-center">Status</h2>

            <select className="form-select my-3" id="element" name="element">
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

            <select className="form-select my-3" id="weapon1" name="weapon1">
              <option value={"-"}>Select Weapon</option>
              {data?.weapon.map((weapon) => (
                <option value={weapon.name} key={weapon._id} id={weapon._id}>
                  {weapon.name}
                </option>
              ))}
            </select>

            <select className="form-select my-3" id="weapon2" name="weapon2">
              <option value={"-"}>Select Weapon</option>
              {data?.weapon.map((weapon) => (
                <option value={weapon.name} key={weapon._id} id={weapon._id}>
                  {weapon.name}
                </option>
              ))}
            </select>

            <select ref={ls} className="form-select my-3" name="leaderSkillName" id="leaderSkillName" onChange={lsHandler}>
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
