console.log("jsスタート");

fetch("https://ihatov08.github.io/kimetsu_api/api/all.json")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
  });
