import {
  TiArrowSortedUp,
  TiArrowSortedDown,
  TiArrowUnsorted,
} from "react-icons/ti";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";

const getSortIcon = (sortDirection: false | SortDirection) => {
  switch (sortDirection) {
    case "asc":
      return <TiArrowSortedUp />;
    case "desc":
      return <TiArrowSortedDown />;
    default:
      return <TiArrowUnsorted />;
  }
};

// columnsの設定を関数に変更し、引数でstudentsDataとmentorsDataを受け取る
export const createColumns = (
  studentsData: StudentDataType[],
  mentorsData: MentorDataType[]
): ColumnDef<MentorDataType | StudentDataType>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          style={{ flex: "auto", alignItems: "center", cursor: "pointer" }}
          onClick={column.getToggleSortingHandler()}
        >
          ID{getSortIcon(column.getIsSorted())}
        </div>
      );
    },
  },
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
    cell: ({ row }) => {
      const data = row.original;

      if (data.role === "mentor") {
        return "-";
      } else {
        return data.studyMinutes;
      }
    },
  },
  {
    accessorKey: "studyLangs",
    header: "勉強中の言語",
    cell: ({ row }) => {
      const data = row.original;

      if (data.role === "mentor") {
        return "-";
      } else {
        return data.studyLangs.join(",");
      }
    },
  },
  {
    accessorKey: "score",
    header: "ハピネススコア",
    cell: ({ row }) => {
      const data = row.original;

      if (data.role === "mentor") {
        return "-";
      } else {
        return data.score;
      }
    },
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
    cell: ({ row }) => {
      const data = row.original;

      if (data.role === "student") {
        return "-";
      } else {
        return data.experienceDays;
      }
    },
  },
  {
    accessorKey: "useLangs",
    header: "現場で使っている言語",
    cell: ({ row }) => {
      const data = row.original;

      if (data.role === "student") {
        return "-";
      } else {
        return data.useLangs.join(",");
      }
    },
  },
  {
    accessorKey: "availableStartCode",
    header: "担当できる課題初め",
    cell: ({ row }) => {
      const data = row.original;

      if (data.role === "student") {
        return "-";
      } else {
        return data.availableStartCode;
      }
    },
  },
  {
    accessorKey: "availableEndCode",
    header: "担当できる課題終わり",
    cell: ({ row }) => {
      const data = row.original;

      if (data.role === "student") {
        return "-";
      } else {
        return data.availableEndCode;
      }
    },
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
