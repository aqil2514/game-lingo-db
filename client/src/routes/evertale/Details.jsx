import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { BACKEND_API } from "../../utils/variables";

export default function Details() {
  const { charName } = useParams();
  const [detail, setDetail] = useState();
  const [role, setRole] = useState("");

  async function validation() {
    try {
      const response = await fetch(`${BACKEND_API}/validation`, {
        credentials: "include",
      });

      const data = await response.json();

      setRole(data.user.role);
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    document.title = `Game Lingo - ${charName} `;
  }, []);

  async function api() {
    const response = await fetch(`${BACKEND_API}/evertale/char/details/${charName}`, {
      credentials: "include",
    });

    const data = await response.json();

    setDetail(data.chars);
  }

  async function deleteHandler(e) {
    try {
      e.preventDefault();

      const charName = detail.charName;
      const allow = confirm(`Yakin ingin hapus karakter ${charName}?`);

      if (!allow) {
        alert(`Karakter ${charName} tidak jadi dihapus.`);
        return;
      }

      const response = await fetch(`${BACKEND_API}/evertale/chars`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ charName }),
      });

      const data = await response.json();

      alert(data.success);
      document.location = "/evertale/char";
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    validation();
    api();
  }, []);
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
                <form onSubmit={(e) => deleteHandler(e)} className="d-inline">
                  <input id="charDelete" type="hidden" name="charName" value={detail?.charName} />
                  {role !== "General Admin" ||
                    (role !== "Admin" && (
                      <button type="submit" className="btn mx-3 badge btn-danger">
                        Hapus
                      </button>
                    ))}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// action="https://game-lingodb.cyclic.app/evertale/chars?_method=DELETE" method="post"
