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
      if (data.role === "student") {
        const availableMentors = mentorsData
          .map((mentor) => mentor.name)
          .join(", ");
        return availableMentors || "なし";
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
      const data = row.original;
      // studentsDataを使ったカスタムロジック
      if (data.role === "mentor") {
        const availableStudents = studentsData
          .map((student) => student.name)
          .join(", ");
        return availableStudents || "なし";
      } else {
        return "-";
      }
    },
  },
];
