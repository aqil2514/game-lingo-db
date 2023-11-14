import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import { BACKEND_API } from "../../utils/variables";

export default function DataUsers() {
  const [users, setUsers] = useState([]);
  const [isGenAdmin, setIsGenAdmin] = useState(true);

  async function validation() {
    try {
      const response = await fetch(`${BACKEND_API}/forbidden-area`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!data.user) {
        alert(data.msg);
        document.location = "/";
        return;
      }

      if (data.user.role !== "General Admin") {
        setIsGenAdmin(false);
        alert(data.msg);
        document.location = "/";
        return;
      }

      setIsGenAdmin(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    try {
      if (isGenAdmin === false) {
        alert("Anda bukan Pemilik Situs!");
        document.href = "/";
        return;
      }

      const response = await fetch(`${BACKEND_API}/users`);

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHandler(e) {
    try {
      e.preventDefault();
      const _id = e.target.getAttribute("datadelete");
      const username = e.target.getAttribute("datausername");

      const allow = confirm(`Yakin ingin menghapus ${username}`);
      if (!allow) {
        alert(`${username} tidak jadi dihapus`);
        return;
      }

      const response = await fetch(`${BACKEND_API}/users`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, username }),
      });

      const data = await response.json();

      alert(data.msg);
      document.location = "/forbidden/data-users";
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    validation();

    if (isGenAdmin === false) {
      alert("Anda bukan pemilik situs");
      document.location = "/";
      return;
    }

    fetchData();
  }, [users]);

  return (
    <>
      <Navbar />
      <div className="Container">
        <h1 className="text-center">Selamat Datang Pemilik Situs!</h1>
        <div className="container mt-5">
          <table className="table table-light">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Username</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr key={i} id={user._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{user?.fullName}</td>
                  <td>{user?.username}</td>
                  <td>
                    <a datadelete={user._id} datausername={user?.username} onClick={(e) => deleteHandler(e)} className="btn btn-danger badge">
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
