// 配列の3番目（[2]）以降で引数を受け取れ
const inputNumber = process.argv[2];
// console.log(inputNumber);

/**
 * 1-12月の月の数字しか受け付けないため配列を用意して、それ以外の文字や数字がインプットされた場合はエラーで処理を終了する
 */
const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 今年の年の取得
const date = new Date();
const year = date.getFullYear();
// カレンダーの表示する月を決める（引数がない場合、現在の月を表示）
const monthToDisplay = inputNumber
  ? parseInt(inputNumber)
  : parseInt(date.getMonth() + 1);

// console.log(monthToDisplay.toString());
// console.log(monthNumbers.includes(monthToDisplay));

// エラーハンドリング
if (!monthNumbers.includes(monthToDisplay)) {
  console.log("不正な値です。1-12の数字をインプットしてください。");
  process.exit(1);
}

// カレンダーに表示する月の最初の日（月初）を求める
const firstDate = new Date();
firstDate.setFullYear(year, 0);
firstDate.setMonth(monthToDisplay, 0);
firstDate.setDate(1);
// console.log(firstDate);
// console.log("曜日");
// console.log(firstDate.getDay());

// カレンダーに表示する月の最終日を求める
const lastDate = new Date();
lastDate.setFullYear(year, 0);
lastDate.setMonth(monthToDisplay, 0);
// console.log(lastDate);

// カレンダーの上部を表示するメソッド
const showUpperArea = (monthToDisplay, year) => {
  // カレンダー表紙（空欄は後で調整）
  console.log(`      ${monthToDisplay}月 ${year}`);
  console.log("月 火 水 木 金 土 日");
};

// カレンダーの日付箇所の表示メソッド
const showDateArea = (firstDate, lastDate) => {
  // 該当月の初日の曜日を取得
  // 0:日曜日, 1:月曜日, 2:火曜日, 3:水曜日, 4:木曜日, 5:金曜日, 6:土曜日
  const weekDay = parseInt(firstDate.getDay());

  console.log("weekdayは" + weekDay);

  // 該当月の最初の日曜日の日付を求める
  if (weekDay !== 0) {
    // 月の最初の日曜日の日付 = 8 - 該当月の初日の曜日の番号
    // const firstSunday = 8 - weekDay;
    // console.log("firstSunday" + firstSunday);

    if (weekDay !== 1) {
      const separator = " ".toString().padStart(12, " ");
      process.stdout.write(separator);
    }
    // console.log("テスト")
    // 初日の日にちを適切な曜日の下に表示するための空欄を作成

    // const initialEmpty = separator * (7 - firstSunday);
    // process.stdout.write(initialEmpty);
    // console.log(separator);
    // console.log(initialEmpty);
    // console.log("終了");

    // 日曜日になったら改行して日付を表示
    for (let i = 1; i <= lastDate.getDate(); i++) {
      // console.log("曜日です");
      // console.log(firstDate.getDay());

      if (firstDate.getDay() === 0) {
        console.log(i.toString().padStart(2, " "));
      } else {
        process.stdout.write(i.toString().padStart(2, " "));
        // 日付と日付の間の空欄
        process.stdout.write(" ");
      }
      firstDate.setDate(firstDate.getDate() + 1);
    }
  } else {
    const separator = " ".toString().padStart(18, " ");
    process.stdout.write(separator);
    for (let i = 1; i <= lastDate.getDate(); i++) {
      if (firstDate.getDay() === 0) {
        console.log(i.toString().padStart(2, " "));
      } else {
        process.stdout.write(i.toString().padStart(2, " "));
        process.stdout.write(" ");
      }
      firstDate.setDate(firstDate.getDate() + 1);
    }
  }
};

showUpperArea(monthToDisplay, year);
showDateArea(firstDate, lastDate);
