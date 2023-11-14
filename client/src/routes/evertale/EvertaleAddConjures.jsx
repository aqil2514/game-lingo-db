import { useEffect, useLayoutEffect } from "react";
import Navbar from "../../component/Navbar";
import { BACKEND_API } from "../../utils/variables";

export default function AddConjures() {
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
  useEffect(() => {
    validation();
  });

  useLayoutEffect(() => {
    document.title = `Game Lingo - Add Conjures `;
  }, []);

  async function handlerSubmit(e) {
    try {
      e.preventDefault();
      const contentBody = {
        name: document.getElementById("conjuresName").value,
        link: document.getElementById("conjuresLink").value,
      };
      const response = await fetch(`${BACKEND_API}/evertale/conjures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentBody),
      });

      const data = await response.json();

      alert(data.success);
      document.location = "/evertale/conjures";
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
      <Navbar />
      <h1 className="text-center">Add Evertale Conjures</h1>

      <div className="container">
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="charName" className="form-label">
              Conjures Name
            </label>
            <input type="text" className="form-control" id="conjuresName" name="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="conjuresLink" className="form-label">
              Conjures Link
            </label>
            <input type="text" className="form-control" id="conjuresLink" name="link" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
