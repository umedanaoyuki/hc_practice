const fetchKimetsuApi = (jsonType) => {
  console.log("fetch");

  fetch(`https://ihatov08.github.io/kimetsu_api/api/${jsonType}`)
    .then((res) => {
      const p = document.getElementsByTagName("p");
      p.innerHTML = "";
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
  const p = document.createElement("p");
  p.className = "test-tag";
  p.textContent = "ローディング中";
  document.body.appendChild(p);
  p.innerHTML = "";

  setTimeout(() => fetchKimetsuApi("all.json"), 1000);
} else {
  fetchKimetsuApi("all.json");
}

document.querySelectorAll("input[type=radio]").forEach((element) => {
  //チェックを変更すると発生するイベントを設置
  element.addEventListener("change", () => {
    // const p = document.getElementsByTagName("p");
    // p.innerHTML = "";

    //ここにイベントの内容を記述
    console.log("checkbox切り替え完了");

    // const p = document.createElement("p");
    // p.textContent = "ローディング中";
    // document.body.appendChild(p);

    const temp = document.getElementById("mainDiv");
    // temp.removeChild();
    console.log(temp);

    // 叩くAPIの種類の配列
    // all.json
    // kisatsutai.json
    // hashira.json
    // oni.json
    const apiArray = [
      "all-character",
      "kisatsutai-members",
      "hashira-members",
      "oni-members",
    ];

    for (let i = 0; i < apiArray.length; i++) {
      const checkboxStatus = document.getElementById(apiArray[i]).checked;
      // console.log(checkboxStatus);
      if (checkboxStatus === true) {
        console.log("入室");
        // document.readyState = "loading";
        setTimeout(() => fetchKimetsuApi("hashira.json"), 1000);
        // fetchKimetsuApi("all.json");
        console.log("break");
        break;
      }
    }
  });
});
