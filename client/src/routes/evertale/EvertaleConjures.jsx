import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";

export default function Home() {
  const [data, setData] = useState([]);

  async function api() {
    const data = await fetch("http://localhost:3000/evertale/conjures").then((res) => res.json());

    setData(data);
  }

  useLayoutEffect(() => {
    document.title = "Game Lingo - Conjures List";
  }, []);

  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h1 className="text-uppercase mt-3">Evertale Conjures`s Databases</h1>
      </div>
      <div className="container">
        <a href="/evertale/conjures/add" className="btn btn-success mx-1 my-2">
          Add Conjures Data
        </a>
        <a href="/evertale/char" className="btn text-light btn-info mx-1 my-2">
          Characters List
        </a>
        <table className="table table-stripped table-hover table-info">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Page</th>
              <th scope="col" className="text-center" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d._id} id={d._id + i++}>
                <th>{i++}</th>
                <td>{d.name}</td>
                <td>
                  <Link to={d.link} reloadDocument className="badge btn btn-success">
                    Visit Page
                  </Link>
                </td>
                <td>
                  <form action="http://localhost:3000/evertale/conjures?_method=DELETE" method="post" className="d-inline">
                    <input type="hidden" name="name" value={d.name} />
                    <button type="submit" onClick={() => confirm("Are you sure?")} className="btn mx-3 badge btn-danger">
                      Delete
                    </button>
                  </form>
                </td>
                <td>
                  <input type="hidden" name="name" value={d.name} />
                  <a href={"/evertale/conjures/edit/" + d.name} type="submit" className="btn mx-3 badge btn-info">
                    Edit
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
