// console.log("jsスタート");

const charactorMap = {
  "all-charactor": "all.json",
};

let user = {
  // ALL API
  "all-character": "all.json",
  // 鬼殺隊API
  "kisatsutai-members": "kisatsutai.json",
  // 柱API
  "hashira-members": "hashira.json",
  // 鬼API
  "oni-members": "oni.json",
};

const fetchKimetsuApi = (jsonType) => {
  // console.log("APIを叩く");

  // all.json
  // /hashira.json
  fetch(`https://ihatov08.github.io/kimetsu_api/api/${jsonType}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      // console.log(res.length);

      for (let i = 0; i < res.length; i++) {
        // console.log(res[i]);

        const div = document.createElement("div");
        div.className = "animal";
        document.getElementsByClassName("mainDiv")[0].appendChild(div);

        const h1 = document.createElement("h1");
        h1.textContent = res[i].name;
        document.getElementsByClassName("animal")[i].appendChild(h1);

        const p = document.createElement("p");
        p.textContent = res[i].category;
        document.getElementsByClassName("animal")[i].appendChild(p);

        const img = document.createElement("img");
        img.src = `https://ihatov08.github.io${res[i].image}`;
        document.getElementsByClassName("animal")[i].appendChild(img);
      }
    });
};

if (document.readyState === "loading") {
  const p = document.createElement("p");
  p.textContent = "ローディング中";

  document.body.appendChild(p);

  // console.log(div.innerText);

  // console.log("ラジオボタン");

  const tempText = document.getElementsByName("radios")[0].innerText;
  // .getElementsByName("selectCharactersButtons")
  // console.log(tempText);

  // 空欄で区切る
  const lines = tempText.split(" ");

  console.log(lines);

  // const temp = document.radios.selectCharactersButtons[0].checked;
  // if (temp) {
  //   console.log("ボタン true");
  // }

  setTimeout(() => fetchKimetsuApi("all.json"), 1000);
} else {
  fetchKimetsuApi("all.json");
}

document.querySelectorAll("input[type=radio]").forEach((element) => {
  //チェックを変更すると発生するイベントを設置
  element.addEventListener("change", () => {
    //ここにイベントの内容を記述
    console.log("chekbox切り替え完了");
  });
});
