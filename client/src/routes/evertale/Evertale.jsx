import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import API from "../../component/API";
import "../../css/Evertale.css";

export default function Evertale() {
  useLayoutEffect(() => {
    document.title = "Game Lingo - Evertale";
  }, []);

  const [lang, setLang] = useState("null");
  const [srcChar, setSrcChar] = useState();
  const [srcStory, setStory] = useState();
  const data = {
    titleId: "Apa itu Evertale",
    titleEn: "What is Evertale?",
    descId:
      "Evertale adalah sebuah permainan peran bermain (RPG) yang dikembangkan oleh ZigZaGame Inc. dan dirilis pada berbagai platform, termasuk perangkat seluler. Game ini menampilkan pertarungan monster, petualangan, dan koleksi karakter yang dapat dimainkan. Pemain dapat menangkap dan melatih monster, serta memimpin tim karakter dalam berbagai misi dan pertempuran. Evertale juga memiliki elemen permainan gacha di mana pemain dapat mencoba mendapatkan karakter dan monster yang lebih kuat melalui pembelian item dalam game.",
    descEn:
      "Evertale is a role-playing game (RPG) developed by ZigZaGame Inc. and released on various platforms, including mobile devices. The game features monster battles, adventures, and playable character collection. Players can capture and train monsters, leading character teams in various missions and battles. Evertale also includes a gacha gaming element, allowing players to try and obtain stronger characters and monsters through in-game item purchases.",
    sub1Id: "Menangkap Monster dan Melatihnya",
    sub1En: "Monster Capture and Training",
    sub1descId:
      "Salah satu fitur utama dalam Evertale adalah kemampuan pemain untuk menangkap dan melatih berbagai monster. Pemain dapat menjelajahi dunia game untuk menemukan monster, menangkapnya, dan kemudian melatih mereka untuk menjadi lebih kuat. Setiap monster memiliki statistik dan kemampuan yang berbeda, sehingga pemain dapat membangun tim monster yang beragam untuk menghadapi tantangan.",
    sub1descEn:
      "One of the main features in Evertale is the ability for players to capture and train various monsters. Players can explore the game world to find monsters, capture them, and then train them to become stronger. Each monster has different statistics and abilities, allowing players to build a diverse team of monsters to face challenges.",
    sub2Id: "Pertempuran Taktis",
    sub2En: "Tactical Battles",
    sub2descId:
      "Game ini menawarkan pertempuran taktis berbasis giliran di mana pemain harus memilih tindakan yang tepat untuk karakter dan monster mereka. Setiap karakter dan monster memiliki keterampilan khusus yang dapat digunakan selama pertempuran. Pemilihan taktis kapan dan bagaimana menggunakan keterampilan ini adalah kunci untuk memenangkan pertempuran.",
    sub2descEn:
      "The game offers tactical turn-based battles where players must choose the right actions for their characters and monsters. Each character and monster has special skills that can be used during battles. Tactical decision-making on when and how to use these skills is key to winning battles.",
    sub3Id: "Misi dan Cerita",
    sub3En: "Missions and Story",
    sub3descId:
      "Evertale memiliki cerita utama yang mengikuti petualangan pemain dalam mencari kebenaran di dunia game. Selain itu, terdapat berbagai misi sampingan yang pemain bisa selesaikan untuk mendapatkan hadiah dan pengalaman tambahan.",
    sub3descEn:
      "Evertale has a main storyline that follows the player's adventure in search of the truth in the game world. Additionally, there are various side missions that players can complete to earn rewards and additional experiences.",
    sub4Id: "Elemen Gacha",
    sub4En: "Gacha Element",
    sub4descId:
      "Seperti banyak game RPG permainan seluler lainnya, Evertale memiliki elemen gacha di mana pemain dapat menggunakan mata uang dalam game untuk mencoba mendapatkan karakter atau monster yang lebih langka dan kuat. Ini dapat menambah aspek koleksi dalam permainan.",
    sub4descEn: "Like many other mobile RPG games, Evertale features a gacha element where players can use in-game currency to try to obtain rarer and more powerful characters or monsters. This adds a collectible aspect to the game.",
    sub5Id: "Grafik yang Menarik",
    sub5En: "Stunning Graphics",
    sub5descId: "Evertale dikenal karena grafiknya yang indah dan gaya seni yang menarik. Dunia dalam game dirancang dengan detail, dan karakter serta monster memiliki desain yang unik.",
    sub5descEn: "Evertale is known for its beautiful graphics and captivating art style. The in-game world is designed with detail, and characters and monsters have unique designs.",
    sub6Id: "Pengembangan Tim",
    sub6En: "Team Building",
    sub6descId: "Pemain dapat menggabungkan karakter dan monster dalam tim mereka untuk menciptakan strategi yang kuat. Ini termasuk menggabungkan tipe elemen yang berbeda untuk memanfaatkan kelemahan lawan dalam pertempuran.",
    sub6descEn: "Players can combine characters and monsters in their team to create strong strategies, including combining different elemental types to exploit the weaknesses of their opponents in battles.",
  };

  useEffect(() => {
    API("Evertale Char").then((res) => setSrcChar(res[0].images[0].url));
    API("Evertale Story Info").then((res) => setStory(res[0].images[0].url));
  }, []);

  return (
    <>
      <Navbar />;
      <div className="container mt-2 text-center">
        <div className="form-floating">
          <select className="form-select" id="floatingSelect" value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Floating label select example">
            <option value="null" selected>
              Select Language
            </option>
            <option value="id-ID">Bahasa Indonesia</option>
            <option value="en-EN">English Language</option>
          </select>
          <label htmlFor="floatingSelect">{lang === "id-ID" ? "Lihat halaman ini dalam" : "See this page with"}</label>
        </div>

        <div className="list-group my-3 text-start d-flex justify-content-center align-content-center flex-row">
          <div className="card w-20 mx-3 p-1">
            <a href="/evertale/charlist">
              <img src={srcChar} className="card-img-top" alt="Char List" />
              <div className="card-body">
                <p className="card-text text-primary text-center fw-bolder">Char List</p>
              </div>
            </a>
          </div>
          <div className="card w-20 mx-3 p-1">
            <a href="/evertale/storylist">
              <img src={srcStory} className="card-img-top h-100 w-100 object-fit-cover" alt="Char List" />
              <div className="card-body">
                <p className="card-text text-primary text-center fw-bolder">Story List</p>
              </div>
            </a>
          </div>
        </div>

        {lang == "null" ? (
          <h1>Select Language First</h1>
        ) : (
          <>
            <h1 className="fst-italic">Evertale</h1>
            <h2 className="text-start">{lang === "id-ID" ? data.titleId : data.titleEn}</h2>
            <article className="text-start">{lang === "id-ID" ? data.descId : data.descEn}</article>
            <h2 className="text-start">{lang === "id-ID" ? data.sub1Id : data.sub1En}</h2>
            <article className="text-start">{lang === "id-ID" ? data.sub1descId : data.sub1descEn}</article>
            <h2 className="text-start">{lang === "id-ID" ? data.sub2Id : data.sub2En}</h2>
            <article className="text-start">{lang === "id-ID" ? data.sub2descId : data.sub2descEn}</article>
            <h2 className="text-start">{lang === "id-ID" ? data.sub3Id : data.sub3En}</h2>
            <article className="text-start">{lang === "id-ID" ? data.sub3descId : data.sub3descEn}</article>
            <h2 className="text-start">{lang === "id-ID" ? data.sub4Id : data.sub4En}</h2>
            <article className="text-start">{lang === "id-ID" ? data.sub4descId : data.sub4descEn}</article>
            <h2 className="text-start">{lang === "id-ID" ? data.sub5Id : data.sub5En}</h2>
            <article className="text-start">{lang === "id-ID" ? data.sub5descId : data.sub5descEn}</article>
            <h2 className="text-start">{lang === "id-ID" ? data.sub6Id : data.sub6En}</h2>
            <article className="text-start">{lang === "id-ID" ? data.sub6descId : data.sub6descEn}</article>
          </>
        )}
      </div>
    </>
  );
}
