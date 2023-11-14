import Navbar from "../../component/Navbar";
import { useLayoutEffect } from "react";
import { BACKEND_API } from "../../utils/variables";

export default function Home() {
  useLayoutEffect(() => {
    document.title = "Game Lingo - Register";
  }, []);

  async function submitHandler(event) {
    try {
      event.preventDefault();
      const formData = {
        fullName: document.getElementById("full-name").value,
        nickName: document.getElementById("nick-name").value,
        username: document.getElementById("user-name").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value,
        role: document.getElementById("role").value,
      };

      const response = await fetch(`${BACKEND_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), //
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.msg);
        return;
      }

      alert(data.msg);
      document.location = "/";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Register Form</h1>
        <form onSubmit={(event) => submitHandler(event)}>
          <div className="mb-3">
            <label htmlFor="full-name" className="form-label">
              Full Name{" "}
            </label>
            <input type="text" className="form-control" id="full-name" name="fullName" required />
          </div>
          <div className="mb-3">
            <label htmlFor="nick-name" className="form-label">
              Nick Name{" "}
            </label>
            <input type="text" className="form-control" id="nick-name" name="nickName" required />
          </div>
          <div className="mb-3">
            <label htmlFor="user-name" className="form-label">
              Username{" "}
            </label>
            <input type="text" className="form-control" id="user-name" name="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input type="password" className="form-control" id="confirm-password" name="password" />
          </div>
          <select className="form-select" id="role">
            <option defaultValue="null">Pilih Role</option>
            <option value="User">User</option>
            <option value="Moderator" disabled>
              Moderator (Tahap pengembangan)
            </option>
            <option value="Admin" disabled>
              Admin (Tahap pengembangan)
            </option>
          </select>
          <button type="submit" className="btn my-1 btn-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
