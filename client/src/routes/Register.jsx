import Navbar from "../component/Navbar";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    document.title = "Game Lingo - Register";
  }, []);

  function submitHandler(event) {
    event.preventDefault();
    const formData = {
      username: document.getElementById("user-name").value,
      password: document.getElementById("password").value,
    };

    fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Mengubah data formulir menjadi JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          alert(data.message);
          document.location = "/register";
        } else if (data.status === 200) {
          alert(data.message);
          document.location = "/";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.location = "/register";
      });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Register Form</h1>
        <form onSubmit={(event) => submitHandler(event)}>
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
          <button type="submit" className="btn my-1 btn-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
