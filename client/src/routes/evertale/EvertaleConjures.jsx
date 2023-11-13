import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar";

export default function Home() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(false);

  async function api() {
    const response = await fetch("http://localhost:3000/evertale/conjures", {
      credentials: "include",
    });
    const data = await response.json();

    if (data.token) {
      setToken(!token);
    }

    setData(data.conjures);
  }

  useLayoutEffect(() => {
    document.title = "Game Lingo - Conjures List";
  }, []);

  useEffect(() => {
    api();
  }, []);

  async function deleteHandler(e) {
    try {
      e.preventDefault();

      const allow = confirm(`Yakin ingin menghapus unit conjures ${e.target.firstChild.value}?`);

      if (!allow) {
        alert(`Unit conjure ${e.target.firstChild.value} tidak jadi dihapus.`);
        return;
      }

      const response = await fetch("http://localhost:3000/evertale/conjures", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.firstChild.value,
        }),
      });

      const data = await response.json();

      alert(data.success);
      document.location = "/evertale/conjures";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h1 className="text-uppercase mt-3">Evertale Conjures`s Databases</h1>
      </div>
      <div className="container">
        {token && (
          <a href="/evertale/conjures/add" className="btn btn-success mx-1 my-2">
            Add Conjures Data
          </a>
        )}
        <a href="/evertale/char" className="btn text-light btn-info mx-1 my-2">
          Characters List
        </a>
        <table className="table table-stripped table-hover table-info">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Page</th>
              {token && (
                <th scope="col" className="text-center" colSpan={2}>
                  Action
                </th>
              )}
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
                {token && (
                  <td>
                    <form onSubmit={(e) => deleteHandler(e)} className="d-inline">
                      <input type="hidden" id="deleteChar" name="name" value={d.name} />
                      <button type="submit" className="btn mx-3 badge btn-danger">
                        Delete
                      </button>
                    </form>
                  </td>
                )}
                {token && (
                  <td>
                    <input type="hidden" name="name" value={d.name} />
                    <a href={"/evertale/conjures/edit/" + d.name} type="submit" className="btn mx-3 badge btn-info">
                      Edit
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
