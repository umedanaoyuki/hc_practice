import {
  TiArrowSortedUp,
  TiArrowSortedDown,
  TiArrowUnsorted,
} from "react-icons/ti";
import { ColumnDef, Row, SortDirection } from "@tanstack/react-table";
import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";
import { baseColumns } from "../baseColumns";

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

const searchStudyLangs = (
  row: Row<MentorDataType | StudentDataType>,
  columnId: string,
  filterValue: string
) => {
  const studyLangsArray = row.getValue<string[]>(columnId);
  if (Array.isArray(studyLangsArray)) {
    return studyLangsArray.some((lang) =>
      lang.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
  return false;
};

export const createColumns = (
  // studentsData: StudentDataType[],
  mentorsData: MentorDataType[]
): ColumnDef<MentorDataType | StudentDataType>[] => [
  ...baseColumns,
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
