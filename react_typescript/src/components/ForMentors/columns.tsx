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
  const hobbiesArray = row.getValue<string[]>(columnId);
  if (Array.isArray(hobbiesArray)) {
    return hobbiesArray.some((hobby) =>
      hobby.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  return false;
};

const searchUseLangs = (
  row: Row<MentorDataType | StudentDataType>,
  columnId: string,
  filterValue: string
) => {
  const langsArray = row.getValue<string[]>(columnId);
  if (Array.isArray(langsArray)) {
    return langsArray.some((lang) =>
      lang.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  return false;
};

export const createColumns = (
  mentorsData: MentorDataType[],
  studentsData: StudentDataType[]
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
    // cellの表示方法（配列を文字列として表示）
    cell: ({ getValue }) => getValue<string[]>().join(","),
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "experienceDays",
    header: ({ column }) => {
      return (
        <div
          style={{ flex: "auto", alignItems: "center", cursor: "pointer" }}
          onClick={column.getToggleSortingHandler()}
        >
          実務経験月数{getSortIcon(column.getIsSorted())}
        </div>
      );
    },
  },
  {
    accessorKey: "useLangs",
    filterFn: searchUseLangs,
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
      }

      return studentArray.join(",");
    },
  },
];
