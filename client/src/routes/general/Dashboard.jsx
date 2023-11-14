import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import { BACKEND_API } from "../../utils/variables";

export default function Dashboard() {
  const [data, setData] = useState({});

  function ClientLayout() {
    try {
      const role = data.user?.role;

      if (!role) {
        return;
      }

      return (
        <>
          {role == "User" && (
            <>
              <h1 className="text-center">Dashboard</h1>
              <h2>Halo! Selamat datang {data.user?.nickName}!</h2>

              <div className="container">
                <div className="row mt-5">
                  <div className="col">
                    <p>
                      <a href="/evertale/char" className="btn btn-secondary">
                        Evertale
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          {role == "General Admin" && (
            <div className="container">
              <h1 className="text-center">Dashboard</h1>
              <div className="row mt-5">
                <div className="col">
                  <h2>Halo! Selamat datang {data.user?.nickName} si pemilik situs!</h2>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col">
                  <p>
                    <a href="/forbidden/data-users" className="btn btn-secondary">
                      Data Users
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      );
    } catch (error) {
      console.log(error);
    }
  }
  useLayoutEffect(() => {
    document.title = "Game Lingo - " + data?.user?.fullName;
  }, [data]);

  async function fetchData() {
    try {
      const response = await fetch(`${BACKEND_API}/token`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!data.user) {
        alert(data.msg);
        document.location = "/";
        return;
      }

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <ClientLayout />
    </>
  );
}
