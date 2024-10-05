import {
  TiArrowSortedUp,
  TiArrowSortedDown,
  TiArrowUnsorted,
} from "react-icons/ti";
import { ColumnDef, Row, SortDirection } from "@tanstack/react-table";
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

// カスタムフィルター関数
const searchHobby = (
  row: Row<MentorDataType | StudentDataType>,
  columnId: string,
  filterValue: string
) => {
  // console.log("カスタムフィルター作動");
  const hobbiesArray = row.getValue<string[]>(columnId);
  if (Array.isArray(hobbiesArray)) {
    // hobbies 配列内にフィルター値が含まれるかを確認
    return hobbiesArray.some((hobby) =>
      hobby.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  return false;
};

const searchStudyLangs = (
  row: Row<MentorDataType | StudentDataType>,
  columnId: string,
  filterValue: string
) => {
  // console.log("カスタムフィルター作動");
  const studyLangsArray = row.getValue<string[]>(columnId);
  if (Array.isArray(studyLangsArray)) {
    // hobbies 配列内にフィルター値が含まれるかを確認
    return studyLangsArray.some((lang) =>
      lang.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  return false;
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
    filterFn: searchHobby,
    cell: ({ getValue }) => getValue<string[]>().join(","),
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "studyMinutes",
    header: ({ column }) => {
      return (
        <div
          style={{ flex: "auto", alignItems: "center", cursor: "pointer" }}
          onClick={column.getToggleSortingHandler()}
        >
          勉強時間{getSortIcon(column.getIsSorted())}
        </div>
      );
    },
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
    filterFn: searchStudyLangs,
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
    header: ({ column }) => {
      return (
        <div
          style={{ flex: "auto", alignItems: "center", cursor: "pointer" }}
          onClick={column.getToggleSortingHandler()}
        >
          ハピネススコア{getSortIcon(column.getIsSorted())}
        </div>
      );
    },
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
];
