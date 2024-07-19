// 配列の3番目（[2]）以降で引数を受け取れ
const inputNumber = process.argv[2];

/**
 * 1-12月の月の数字しか受け付けないため配列を用意して、それ以外の文字や数字がインプットされた場合はエラーで処理を終了する
 */
const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const date = new Date();
// 今年の年の取得
const year = date.getFullYear();
// カレンダーの表示する月を決める（引数がない場合、現在の月を表示）
const monthToDisplay = inputNumber
  ? parseInt(inputNumber)
  : parseInt(date.getMonth() + 1);

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

// カレンダーに表示する月の最終日を求める
const lastDate = new Date();
lastDate.setFullYear(year, 0);
lastDate.setMonth(monthToDisplay, 0);

/**
 * カレンダーの上部（タイトルと曜日）を表示するメソッド
 * @param {カレンダーに表示する月} monthToDisplay
 * @param {今年の西暦} year
 */
const showUpperArea = (monthToDisplay, year) => {
  console.log(`      ${monthToDisplay}月 ${year}`);
  console.log("月 火 水 木 金 土 日");
};

/**
 * カレンダーの日付表示メソッド
 * @param {月初の日付と曜日情報} firstDate
 * @param {最終日の日付と曜日情報} lastDate
 */
const showDateArea = (firstDate, lastDate) => {
  // 該当月の初日の曜日を取得
  // 0:日曜日, 1:月曜日, 2:火曜日, 3:水曜日, 4:木曜日, 5:金曜日, 6:土曜日
  const weekDay = parseInt(firstDate.getDay());

  // 該当月が日曜日以外から始まる場合
  if (weekDay !== 0) {
    // 該当月が月曜日以外から始まる場合
    if (weekDay !== 1) {
      // 月初の日付の前に表示させる「空欄」の算出
      const separator = " ".toString().padStart(3 * (weekDay - 1), " ");
      process.stdout.write(separator);
    }

    for (let i = 1; i <= lastDate.getDate(); i++) {
      // 日曜日になったら改行
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
    // 該当月が日曜日から始まる場合
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
