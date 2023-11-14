import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";
import { BACKEND_API } from "../../utils/variables";

export default function Home() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  useLayoutEffect(() => {
    document.title = `Game Lingo - Characters List `;
  }, []);

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

  async function fetchData() {
    const response = await fetch(`${BACKEND_API}/evertale/chars`, {
      credentials: "include",
    });

    const data = await response.json();

    console.log(data);

    setData(data.chars);
  }

  function ctaHandler(e) {
    if (!role) {
      e.preventDefault();
      alert("Silahkan login atau gunakan atau demo untuk melanjutkan\nAkun demo ada di halaman Home.");
      return;
    }
  }

  useEffect(() => {
    validation();

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h1 className="text-uppercase mt-3">Evertale Character`s Databases</h1>
      </div>
      <div className="container">
        {role !== "General Admin" ||
          (role !== "Moderator" && (
            <a href="/evertale/char/add" className="btn btn-success mx-1 my-2">
              Add Characters Data
            </a>
          ))}
        <a href="/evertale/conjures" onClick={(e) => ctaHandler(e)} className="btn text-light btn-info mx-1 my-2">
          Conjures List
        </a>
        <table className="table table-stripped table-hover table-info">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d._id} id={d._id + i++}>
                <th>{i++}</th>
                <td>{d.charName}</td>
                <td>
                  <Link onClick={(e) => ctaHandler(e)} to={"/evertale/char/details/" + d.charName} reloadDocument className="badge btn btn-success">
                    Action
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
