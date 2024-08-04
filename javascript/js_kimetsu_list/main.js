console.log("jsスタート");

fetch("https://ihatov08.github.io/kimetsu_api/api/all.json")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res.length);

    for (let i = 0; i < res.length; i++) {
      console.log(res[i]);

      const h1 = document.createElement("h1");
      h1.textContent = res[i].name;
      document.getElementsByClassName("animal")[0].appendChild(h1);

      const p = document.createElement("p");
      p.textContent = res[i].category;
      document.getElementsByClassName("animal")[0].appendChild(p);

      const img = document.createElement("img");
      img.src = `https://ihatov08.github.io${res[i].image}`;
      document.getElementsByClassName("animal")[0].appendChild(img);
    }
  });
