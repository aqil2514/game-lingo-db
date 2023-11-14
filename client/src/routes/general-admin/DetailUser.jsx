import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar";

export default function () {
  const [isGenAdmin, setIsGenAdmin] = useState(true);
  const [detail, setDetail] = useState({});
  const { id } = useParams();

  async function validation() {
    try {
      const response = await fetch("https://game-lingodb.cyclic.app/forbidden-area", {
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
    const response = await fetch("https://game-lingodb.cyclic.app/forbidden-area/" + id, {
      credentials: "include",
    });

    const data = await response.json();

    setDetail(data);

    console.log(data);
  }

  useEffect(() => {
    validation();

    if (isGenAdmin === false) {
      alert("Anda bukan pemilik situs");
      document.location = "/";
      return;
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container"></div>
    </>
  );
}
