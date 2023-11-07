import Navbar from "../component/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h1 className="text-uppercase mt-3">Welcome to Game Lingo Database</h1>
        <div className="alert alert-info" role="alert">
          This is part of{" "}
          <a href="http://gamelingo30.blogspot.com/" class="alert-link">
            my blog
          </a>
          . This site is under development.
        </div>
      </div>
    </>
  );
}
