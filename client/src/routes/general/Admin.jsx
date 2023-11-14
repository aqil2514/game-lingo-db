import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../../component/Navbar";

export default function Admin() {
  const [auth, setAuth] = useState("");
  useLayoutEffect(() => {
    document.title = "Game Lingo - Admin";
  }, []);

  useEffect(() => {
    data();
    console.log(auth);
  }, []);

  async function data() {
    try {
      const response = await fetch("https://game-lingodb.cyclic.app/admin", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.token) {
        alert(data.msg);
        document.location = "/";
        return;
      }
      setAuth(data.user);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <h1 className="text-center">Admin page</h1>
      <h1>Welcome {auth}</h1>
    </>
  );
}
