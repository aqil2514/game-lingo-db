import Navbar from "../component/Navbar";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    document.title = "Game Lingo - Home";
  }, []);

  function submitHandler(event) {
    event.preventDefault();

    const bodyData = {
      username: document.getElementById("user-name").value,
      password: document.getElementById("password").value,
    };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          alert(data.message);
          document.location = "/admin"; //Nanti tambahin halaman Admin
        } else {
          alert(data.message);
          document.location = "/";
        }
      });
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="alert alert-info text-center mt-3" role="alert">
          Welcome to Game Lingo Database! This is part of{" "}
          <a href="http://gamelingo30.blogspot.com/" className="alert-link">
            My site
          </a>{" "}
          and this is under development.
        </div>

        <h1 className="text-center">wanna contribute?</h1>

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
        <button
          type="submit"
          onClick={(e) => {
            document.location = "/register";
          }}
          className="btn d-inline my-1 btn-primary"
        >
          Register
        </button>
      </div>
    </>
  );
}
