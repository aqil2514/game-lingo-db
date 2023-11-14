import Navbar from "../../component/Navbar";
import { useEffect, useLayoutEffect } from "react";
import { BACKEND_API } from "../../utils/variables";

export default function Home() {
  useLayoutEffect(() => {
    document.title = "Game Lingo - Home";
  }, []);

  async function token() {
    try {
      const response = await fetch(`${BACKEND_API}/token`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data.user?.user) {
        document.location = "/dashboard";
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    token();
  }, []);

  async function submitHandler(event) {
    event.preventDefault();
    const bodyData = {
      username: document.getElementById("user-name").value.toLowerCase(),
      password: document.getElementById("password").value,
    };

    try {
      const response = await fetch(`${BACKEND_API}/users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (data.status === 200) {
        alert(data.message);
        document.location = "/dashboard";
      } else if (data.status === 404) {
        alert(data.message);
        document.location = "/";
      } else if (data.status === 400) {
        alert(data.message);
        document.location = "/";
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

        <h1 className="text-center">Wanna contribute?</h1>

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
          onClick={() => {
            document.location = "/register";
          }}
          className="btn d-inline my-1 btn-primary"
        >
          Register
        </button>
        <h1 className="mt-5 ">Akun Demo</h1>
        <p>
          <strong>Username : </strong>demoaccount
        </p>
        <p>
          <strong>password : </strong>123456789
        </p>
      </div>
    </>
  );
}
