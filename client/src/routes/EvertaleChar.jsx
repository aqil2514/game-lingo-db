import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

export default function Home() {
  const [data, setData] = useState([]);

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
        <a href="/evertale/char/add" className="btn btn-success my-2">
          Add Characters Data
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
                  <Link to={"/Evertale/Char/Details/" + d.charName} reloadDocument className="badge btn btn-success">
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
