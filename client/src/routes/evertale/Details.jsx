import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar";

export default function Details() {
  const { charName } = useParams();
  const [detail, setDetail] = useState();

  useLayoutEffect(() => {
    document.title = `Game Lingo - ${charName} `;
  }, []);

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
                  {detail?.status.rankChar != "-" && (
                    <li className="list-group-item">
                      <strong>Rank : </strong>
                      {detail?.status.rankChar}
                    </li>
                  )}
                  {detail?.status.element != "-" && (
                    <li className="list-group-item">
                      <strong>Element : </strong>
                      {detail?.status.element}
                    </li>
                  )}
                  {detail?.status.leaderSkillName != "-" && (
                    <li className="list-group-item">
                      <strong>Leader Skill : </strong>
                      {detail?.status.leaderSkillName} =&gt; {detail?.status.leaderSkillEN} ({detail?.status.leaderSkillID})
                    </li>
                  )}
                  {detail?.status.weapon1 != "-" && (
                    <li className="list-group-item">
                      <strong>Basic Weapon : </strong>
                      {detail?.status.weapon1}
                    </li>
                  )}
                  {detail?.status.weapon2 != "-" && (
                    <li className="list-group-item">
                      <strong>FA Weapon : </strong>
                      {detail?.status.weapon2}
                    </li>
                  )}
                </ul>
                <a href="/evertale/char" className="btn mx-3 badge btn-primary">
                  Back
                </a>
                <form action="http://localhost:3000/evertale/chars?_method=DELETE" method="post" className="d-inline">
                  <input type="hidden" name="charName" value={detail?.charName} />
                  <button type="submit" onClick={() => confirm("Are you sure?")} className="btn mx-3 badge btn-danger">
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
