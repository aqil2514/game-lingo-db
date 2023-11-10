import Navbar from "../component/Navbar";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    document.title = "Game Lingo - Home";
  }, []);
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
      </div>
    </>
  );
}
