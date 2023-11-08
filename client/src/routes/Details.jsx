import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";

export default function Details() {
  const { charName } = useParams();
  const [detail, setDetail] = useState();

  async function api() {
    const char = await fetch("http://localhost:3000/evertale/char/details/" + charName).then((res) => res.json());

    setDetail(char);
  }

  useEffect(() => {
    api();
  }, [detail]);
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-8">
            <h2>Detail Contact</h2>
            <div className="card" style={{ width: "50%" }}>
              <img src="https:placeholder.com/200x200" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{detail?.charName}</h5>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Rank : </strong>
                    {detail?.status.rankChar}
                  </li>
                  <li className="list-group-item">
                    <strong>Element : </strong>
                    {detail?.status.element}
                  </li>
                  <li className="list-group-item">
                    <strong>Leader Skill : </strong>
                    {detail?.status.leaderSkillName} =&gt; {detail?.status.leaderSkillEN} ({detail?.status.leaderSkillID})
                  </li>
                  <li className="list-group-item">
                    <strong>Basic Weapon : </strong>
                    {detail?.status.weapon1}
                  </li>
                  <li className="list-group-item">
                    <strong>FA Weapon : </strong>
                    {detail?.status.weapon2}
                  </li>
                </ul>
                <a href="/Evertale/Char" className="btn mx-3 badge btn-primary">
                  Back
                </a>
                <form action="http://localhost:3000/evertale/chars?_method=DELETE" method="post" className="d-inline">
                  <input type="hidden" name="charName" value={detail?.charName} />
                  <button type="submit" className="btn mx-3 badge btn-danger">
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
