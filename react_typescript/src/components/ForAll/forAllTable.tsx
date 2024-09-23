import { useEffect, useState } from "react";
import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { data } from "../../api/data";
import { createColumns } from "./columns";

const getData: () => Promise<(MentorDataType | StudentDataType)[]> = async () =>
  data;

export const ForAllTable = () => {
  // 全データ
  const [userListData, setUserListData] = useState<
    (MentorDataType | StudentDataType)[]
  >([]);

  const [studentsData, setStudentsData] = useState<StudentDataType[]>([]);
  const [mentorsData, setMentorsData] = useState<MentorDataType[]>([]);

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
      if (data.role === "student") {
        students.push(data as StudentDataType);
      } else {
        mentors.push(data as MentorDataType);
      }
    });

    setStudentsData(students);
    setMentorsData(mentors);
  }, [userListData]);

  // studentsDataとmentorsDataを使ってカラムを生成
  const columns = createColumns(studentsData, mentorsData);

  const table = useReactTable<MentorDataType | StudentDataType>({
    columns,
    data,
    initialState: {
      // メールアドレスでソート
      sorting: [{ id: "mail", desc: true }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  console.log(studentsData);

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
