import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import { Table } from "../../common/Table";
import { TableData } from "../../common/TableData";
import { TableHeader } from "../../common/TableHeader";
import { useRecoilValue } from "recoil";
import { userListDataAtom } from "../../Atoms/UserListData";

export const ForAllTable = () => {
  const userListData =
    useRecoilValue<(MentorDataType | StudentDataType)[]>(userListDataAtom);

  const studentsData = userListData.filter((data) => data.role === "student");
  const mentorsData = userListData.filter((data) => data.role === "mentor");

  const columns = createColumns(studentsData, mentorsData);

  const table = useReactTable<MentorDataType | StudentDataType>({
    columns,
    data: userListData,
    initialState: {
      sorting: [{ id: "name", desc: false }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <main>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableData key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableData>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </main>
    </div>
  );
};
