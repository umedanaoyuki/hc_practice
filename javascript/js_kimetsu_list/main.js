/**
 * ローディングの表示
 */
const showLoadingIcon = () => {
  const p = document.createElement("p");
  p.className = "loadingText";
  p.textContent = "ローディング中";
  document.body.appendChild(p);
};

/**
 * ローディングの削除
 */
const deleteLoadingIcon = () => {
  const p = document.getElementsByClassName("loadingText");
  p[0].remove();
  // p[0].innerText = "";
};

/**
 * 鬼滅の刃APIを叩くメソッド
 */
const fetchKimetsuApi = (jsonType) => {
  // console.log("fetch関数");
  showLoadingIcon();

  console.log("jsonType");
  console.log(jsonType);

  fetch(`https://ihatov08.github.io/kimetsu_api/api/${jsonType}.json`)
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
      deleteLoadingIcon();
    });
};

/**
 * 画面描画のメソッド
 */
const renderScreen = (jsonType = "all") => {
  // console.log("実行");
  showLoadingIcon();
  if (document.readyState === "loading") {
    // console.log("ローディングアイコン表示");
    // console.log('loading')

    setTimeout(() => fetchKimetsuApi(`${jsonType}`), 1000);
  } else {
    // console.log("else");
    fetchKimetsuApi("all");
  }
};

window.onload = renderScreen();

document.querySelectorAll("input[type=radio]").forEach((element) => {
  //チェックを変更すると発生するイベントを設置
  element.addEventListener("change", () => {
    showLoadingIcon();

    // console.log("checkbox切り替え完了");
    const animals = document.getElementsByClassName("animal");

    // console.log("5つの要素の取得");
    // console.log(animals);

    while (animals.length > 0) {
      animals[0].remove();
    }

    // APIの種類をまとめた配列
    const apiArray = ["all", "kisatsutai", "hashira", "oni"];

    for (let i = 0; i < apiArray.length; i++) {
      const checkboxStatus = document.getElementById(apiArray[i]).checked;
      if (checkboxStatus === true) {
        console.log(apiArray[i]);
        setTimeout(() => fetchKimetsuApi(`${apiArray[i]}`), 1000);
        break;
      }
    }
  });
});
