/**
 * ローディングの画面表示
 */
const showLoadingIcon = () => {
  const p = document.createElement("p");
  p.className = "loadingText";
  p.textContent = "ローディング中";
  document.body.appendChild(p);
};

/**
 * ローディングの画面の削除
 */
const deleteLoadingIcon = () => {
  const p = document.getElementsByClassName("loadingText");
  p[0].innerText = "";
};

const fetchKimetsuApi = (jsonType) => {
  // console.log("fetch関数");

  fetch(`https://ihatov08.github.io/kimetsu_api/api/${jsonType}`)
    .then((res) => {
      deleteLoadingIcon();
      return res.json();
    })
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
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
  showLoadingIcon();

  setTimeout(() => fetchKimetsuApi("all.json"), 1000);
} else {
  fetchKimetsuApi("all.json");
}

document.querySelectorAll("input[type=radio]").forEach((element) => {
  //チェックを変更すると発生するイベントを設置
  element.addEventListener("change", () => {
    // console.log("checkbox切り替え完了");
    const animals = document.getElementsByClassName("animal");

    for (let i = 0; i < animals.length; i++) {
      animals[i].remove();
    }

    const apiArray = ["all", "kisatsutai", "hashira", "oni"];

    for (let i = 0; i < apiArray.length; i++) {
      const checkboxStatus = document.getElementById(apiArray[i]).checked;
      if (checkboxStatus === true) {
        console.log(apiArray[i]);
        setTimeout(() => fetchKimetsuApi(`${apiArray[i]}.json`), 1000);
        break;
      }
    }
  });
});
