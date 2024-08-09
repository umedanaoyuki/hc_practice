/**
 * ローディングの表示
 */
const showLoadingIcon = () => {
  const img = document.createElement("img");
  img.className = "loadingGif";
  img.alt = "ローディングのGif";
  img.src = "./img/loadingImage.gif";
  const loadingIconElement = document.getElementsByClassName("loadingIcon");
  loadingIconElement[0].appendChild(img);

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
  const img = document.getElementsByClassName("loadingGif");
  p[0].remove();
  img[0].remove();
};

/**
 * 鬼滅の刃APIを叩くメソッド
 */
const fetchKimetsuApi = async (jsonType) => {
  try {
    const result = await fetch(
      `https://ihatov08.github.io/kimetsu_api/api/${jsonType}.json`
    );
    const responseArray = await result.json();

    for (let i = 0; i < responseArray.length; i++) {
      const div = document.createElement("div");
      div.className = "animal";
      document.getElementsByClassName("mainDiv")[0].appendChild(div);

      const h2 = document.createElement("h2");
      h2.textContent = responseArray[i].name;
      document.getElementsByClassName("animal")[i].appendChild(h2);

      const p = document.createElement("p");
      p.textContent = responseArray[i].category;
      document.getElementsByClassName("animal")[i].appendChild(p);

      const img = document.createElement("img");
      img.src = `https://ihatov08.github.io${responseArray[i].image}`;
      document.getElementsByClassName("animal")[i].appendChild(img);
    }
    deleteLoadingIcon();
  } catch (error) {
    console.log(`エラー${error}`);
  }
};

/**
 * 画面描画のメソッド
 */
const renderScreen = (jsonType = "all") => {
  showLoadingIcon();
  if (document.readyState === "loading") {
    setTimeout(() => fetchKimetsuApi(`${jsonType}`), 1000);
  } else {
    fetchKimetsuApi("all");
  }
};

window.onload = renderScreen();

document.querySelectorAll("input[type=radio]").forEach((element) => {
  element.addEventListener("change", () => {
    showLoadingIcon();

    // 「animal」名の要素の配列
    const animals = document.getElementsByClassName("animal");

    while (animals.length > 0) {
      animals[0].remove();
    }

    // APIの種類をまとめた配列
    const apiArray = ["all", "kisatsutai", "hashira", "oni"];

    for (let i = 0; i < apiArray.length; i++) {
      const checkboxStatus = document.getElementById(apiArray[i]).checked;
      if (checkboxStatus === true) {
        setTimeout(() => fetchKimetsuApi(`${apiArray[i]}`), 1000);
        break;
      }
    }
  });
});
