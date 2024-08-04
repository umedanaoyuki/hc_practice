console.log("jsスタート");

const fetchKimetsuApi = () => {
  console.log("APIを叩く");

  fetch("https://ihatov08.github.io/kimetsu_api/api/all.json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res.length);

      for (let i = 0; i < res.length; i++) {
        console.log(res[i]);

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
  console.log("ローディング中");
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", fetchKimetsuApi);
} else {
  // `DOMContentLoaded` has already fired
  fetchKimetsuApi();
}
