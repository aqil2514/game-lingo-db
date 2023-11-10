import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";

export default function Home() {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    document.title = `Game Lingo - Characters List `;
  }, []);

  async function api() {
    const data = await fetch("http://localhost:3000/evertale/chars").then((res) => res.json());

    setData(data);
  }

  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h1 className="text-uppercase mt-3">Evertale Character`s Databases</h1>
      </div>
      <div className="container">
        <a href="/evertale/char/add" className="btn btn-success mx-1 my-2">
          Add Characters Data
        </a>
        <a href="/evertale/conjures" className="btn text-light btn-info mx-1 my-2">
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
                  <Link to={"/evertale/char/details/" + d.charName} reloadDocument className="badge btn btn-success">
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
