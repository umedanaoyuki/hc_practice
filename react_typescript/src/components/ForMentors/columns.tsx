import {
  TiArrowSortedUp,
  TiArrowSortedDown,
  TiArrowUnsorted,
} from "react-icons/ti";
import { ColumnDef, SortDirection } from "@tanstack/react-table";
import { MentorDataType } from "../../type/MentorDataType";

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
  mentorsData: MentorDataType[]
): ColumnDef<MentorDataType>[] => [
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
  },
];
