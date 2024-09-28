import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";

type Data = {
  studentsData: StudentDataType[];
  mentorsData: MentorDataType[];
};

export const ForStudentsTable = ({ studentsData, mentorsData }: Data) => {
  const columns = createColumns(studentsData, mentorsData);

  const table = useReactTable<MentorDataType | StudentDataType>({
    columns,
    data: studentsData,
    initialState: {
      sorting: [{ id: "id", desc: false }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <main>
        <div>
          <input
            placeholder="趣味でフィルター"
            value={
              (table.getColumn("hobbies")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("hobbies")?.setFilterValue(e.target.value);
              // console.log(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <input
            placeholder="言語でフィルター"
            value={
              (table.getColumn("studyLangs")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("studyLangs")?.setFilterValue(e.target.value);
              // console.log(e.target.value);
            }}
          ></input>
        </div>
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
