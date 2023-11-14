export default function Status() {
  async function api() {
    const char = await fetch("http://localhost:3000/evertale/char/details/" + charName).then((res) => res.json());

    setDetail(char);
  }
}
