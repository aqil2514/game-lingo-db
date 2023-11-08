import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";

export default function Home() {
  const [data, setData] = useState([]);

  async function api() {
    const data = await fetch("http://localhost:3000/evertale/chars").then((res) => res.json());

    setData(data);
  }

  useEffect(() => {
    api();
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h1 className="text-uppercase mt-3">Welcome to Game Lingo Database</h1>
        <div className="alert alert-info" role="alert">
          This is part of{" "}
          <a href="http://gamelingo30.blogspot.com/" className="alert-link">
            my blog
          </a>
          . This site is under development.
        </div>
      </div>
      <div className="container">
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
                  <a href={"details/" + d.charName} className="badge btn btn-success">
                    Action
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
