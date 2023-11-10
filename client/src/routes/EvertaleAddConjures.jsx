import { useLayoutEffect } from "react";
import Navbar from "../component/Navbar";

export default function AddConjures() {
  useLayoutEffect(() => {
    document.title = `Game Lingo - Add Conjures `;
  }, []);
  return (
    <section>
      <Navbar />
      <h1 className="text-center">Add Evertale Conjures</h1>

      <div className="container">
        <form method="post" action="http://localhost:3000/evertale/conjures">
          <div className="mb-3">
            <label htmlFor="charName" className="form-label">
              Conjures Name
            </label>
            <input type="text" className="form-control" id="charName" name="name" required />
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
