import { useEffect, useState } from "react";
import { MentorDataType } from "../../type/MentorDataType";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { data } from "../../api/data";
import { createColumns } from "./columns";
import { StudentDataType } from "../../type/StudentDataType";

const getData: () => Promise<(MentorDataType | StudentDataType)[]> = async () =>
  data;

export const ForMentorsTable = () => {
  // 全データ
  const [userListData, setUserListData] = useState<
    (MentorDataType | StudentDataType)[]
  >([]);

  const [mentorsData, setMentorsData] = useState<MentorDataType[]>([]);
  const [studentsData, setStudentsData] = useState<StudentDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setUserListData(await getData());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const students: StudentDataType[] = [];
    const mentors: MentorDataType[] = [];

    userListData.forEach((data) => {
      if (data.role === "mentor") {
        mentors.push(data as MentorDataType);
      } else {
        students.push(data as StudentDataType);
      }
      setStudentsData(students);
      setMentorsData(mentors);
    });
  }, [userListData]);

  // console.log(mentorsData);

  // studentsDataとmentorsDataを使ってカラムを生成
  const columns = createColumns(mentorsData, studentsData);

  const table = useReactTable<MentorDataType | StudentDataType>({
    columns,
    data: mentorsData,
    initialState: {
      // メールアドレスでソート
      sorting: [{ id: "id", desc: false }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <main>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              // console.log(row);
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};
