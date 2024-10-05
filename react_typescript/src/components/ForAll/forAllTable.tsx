import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import { useMemo } from "react";

type Data = {
  studentsData: StudentDataType[];
  mentorsData: MentorDataType[];
};

export const ForAllTable = ({ studentsData, mentorsData }: Data) => {
  // studentsDataとmentorsDataを使ってカラムを生成

  console.log({ studentsData });
  console.log({ mentorsData });

  const newData = useMemo(() => {
    return [...studentsData, ...mentorsData];
  }, [studentsData, mentorsData]);
  const columns = createColumns(studentsData, mentorsData);

  const table = useReactTable<MentorDataType | StudentDataType>({
    columns,
    data: newData,
    initialState: {
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
