import Navbar from "../component/Navbar";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

export default function Edit() {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});
  const params = useParams();

  async function fetchData() {
    const data = await fetch("http://localhost:3000/evertale/conjures/edit/" + params.name).then((res) => res.json());

    setData(data);
    setNewData({ name: data.name, link: data.link });
  }

  useLayoutEffect(() => {
    document.title = `Game Lingo - ${params.name} `;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center">Edit Conjures</h1>
        <form action="http://localhost:3000/evertale/conjures?_method=PUT" method="POST" className="my-5">
          <input type="hidden" className="form-control" value={data._id} id="name" name="_id" />
          <input type="text" className="form-control" value={data.name} id="name" name="oldName" disabled />
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
