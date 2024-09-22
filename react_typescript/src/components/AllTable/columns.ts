import { ColumnDef } from "@tanstack/react-table";
import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";

// columnsの設定を関数に変更し、引数でstudentsDataとmentorsDataを受け取る
export const createColumns = (
  studentsData: StudentDataType[],
  mentorsData: MentorDataType[]
): ColumnDef<MentorDataType | StudentDataType>[] => [
  {
    accessorKey: "name",
    header: "名前",
  },
  {
    accessorKey: "role",
    header: "ロール",
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
  },
  {
    accessorKey: "age",
    header: "年齢",
  },
  {
    accessorKey: "postCode",
    header: "郵便番号",
  },
  {
    accessorKey: "phone",
    header: "電話番号",
  },
  {
    accessorKey: "hobbies",
    header: "趣味（リスト）",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "studyMinutes",
    header: "勉強時間",
  },
  {
    accessorKey: "studyLangs",
    header: "勉強中の言語",
  },
  {
    accessorKey: "score",
    header: "ハピネススコア",
  },
  {
    accessorKey: "availableMentors",
    header: "対応可能なメンター",
    cell: ({ row }) => {
      // 行データの取得
      const data = row.original;

      // カスタム関数のロジック
      // if (data.role === "student") {
      //   const availableMentors = mentorsData
      //     .map((mentor) => mentor.name)
      //     .join(", ");
      //   return availableMentors || "なし";
      // } else {
      //   return "-";
      // }
      const mentorsArray: string[] = [];

      if (data.role === "student") {
        mentorsData.forEach((mentorData) => {
          if (
            mentorData.availableStartCode <= data.taskCode &&
            mentorData.availableEndCode >= data.taskCode
          ) {
            mentorsArray.push(mentorData.name);
          }
        });
        // 重複した要素の削除
        const uniqueMentorsArray = mentorsArray.filter((elm, index) => {
          return mentorsArray.indexOf(elm) === index;
        });

        return uniqueMentorsArray.join("/");
      } else {
        return "-";
      }
    },
  },
  {
    accessorKey: "experienceDays",
    header: "実務経験月数",
  },
  {
    accessorKey: "useLangs",
    header: "現場で使っている言語",
  },
  {
    accessorKey: "availableStartCode",
    header: "担当できる課題初め",
  },
  {
    accessorKey: "availableEndCode",
    header: "担当できる課題終わり",
  },
  {
    accessorKey: "availableStudents",
    header: "対応可能生徒",
    cell: ({ row }) => {
      const studentArray: string[] = [];
      const data = row.original;
      // studentsDataを使ったカスタムロジック
      if (data.role === "mentor") {
        studentsData.forEach((studentData) => {
          if (
            studentData.taskCode <= data.availableEndCode &&
            studentData.taskCode >= data.availableStartCode
          ) {
            studentArray.push(studentData.name);
          }
        });

        // 重複した要素の削除
        const uniqueStudentsArray = studentArray.filter((elm, index) => {
          return studentArray.indexOf(elm) === index;
        });
        return uniqueStudentsArray.join("/");
      } else {
        return "-";
      }
    },
  },
];
