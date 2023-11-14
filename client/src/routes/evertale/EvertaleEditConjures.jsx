import Navbar from "../../component/Navbar";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_API } from "../../utils/variables";

export default function Edit() {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});
  const params = useParams();

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

  async function fetchData() {
    const response = await fetch(`${BACKEND_API}/ ` + params.name, {
      credentials: "include",
    });

    const data = await response.json();

    if (!data.token) {
      alert("Anda bukan admin!");
      document.location = "/evertale/conjures";
    }

    setData(data.conjure);
    setNewData({ name: data.conjure.name, link: data.conjure.link });
  }

  useLayoutEffect(() => {
    document.title = `Game Lingo - ${params.name} `;
  }, []);

  useEffect(() => {
    validation();
    fetchData();
  }, []);

  async function editHandler(e) {
    try {
      e.preventDefault();
      const response = await fetch(`${BACKEND_API}/evertale/conjures`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: document.getElementById("char-id").value,
          name: document.getElementById("name").value,
          link: document.getElementById("link").value,
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
      <div className="container">
        <h1 className="text-center">Edit Conjures</h1>
        <form onSubmit={(e) => editHandler(e)} className="my-5">
          <input type="hidden" className="form-control" value={data._id} id="char-id" name="_id" />
          <input type="text" className="form-control" value={data.name} id="oldNname" name="oldName" disabled />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              New Name
            </label>
            <input type="text" className="form-control" value={newData.name} id="name" name="name" onChange={(e) => setNewData({ ...newData, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="link" className="form-label">
              New link
            </label>
            <input type="text" className="form-control" value={newData.link} id="link" name="link" onChange={(e) => setNewData({ ...newData, link: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
