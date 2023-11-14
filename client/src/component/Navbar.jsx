import { useEffect, useState } from "react";
import { BACKEND_API } from "../utils/variables";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);

  async function token() {
    try {
      const response = await fetch(`${BACKEND_API}/token`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data.user?.user) {
        setIsLogin(!isLogin);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutHandler(e) {
    try {
      e.preventDefault();

      const sure = confirm("Are you sure?");
      if (!sure) {
        return;
      }

      const response = await fetch(`${BACKEND_API}/logout`, {
        credentials: "include",
      });

      const data = await response.json();

      alert(data.msg);
      document.location = "/";
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    token();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-warning fw-bold" href="/">
            Game Lingo DB
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-light"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              {isLogin ? (
                <li className="nav-item">
                  <a className="nav-link text-light fw-bold" href="/dashboard">
                    Dashboard
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link text-light fw-bold" href="/">
                    Home
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link text-light fw-bold" href="/evertale">
                  Evertale
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light fw-bold" href="/evertale/char">
                  Char DB
                </a>
              </li>
            </ul>
            {isLogin && (
              <>
                <ul className="navbar-nav me-5">
                  <li className="nav-item">
                    <a className="fw-bold btn btn-warning text-light" onClick={(e) => logoutHandler(e)}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
