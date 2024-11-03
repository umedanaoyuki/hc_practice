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
import { Table } from "../../common/Table";
import { TableHeader } from "../../common/TableHeader";
import { TableData } from "../../common/TableData";
import styled from "styled-components";
import { Filter } from "../../common/Filter";
import { Thead } from "../../common/Thead";
import { useRecoilState } from "recoil";
import { userListDataAtom } from "../../Atoms/UserListData";
import { useMemo } from "react";

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

/**
 * 生徒情報の表示テーブル
 */
export const ForStudentsTable = () => {
  const [userListData, setUserListData] =
    useRecoilState<(MentorDataType | StudentDataType)[]>(userListDataAtom);

  const studentsData = useMemo(
    () => userListData.filter((data) => data.role === "student"),
    [userListData]
  );
  const mentorsData = useMemo(
    () => userListData.filter((data) => data.role === "mentor"),
    [userListData]
  );

  const columns = createColumns(mentorsData);

  const table = useReactTable<MentorDataType | StudentDataType>({
    columns,
    data: studentsData,
    initialState: {
      sorting: [{ id: "name", desc: false }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  console.log("forStudentsTable");

  return (
    <div>
      <main>
        <FlexDiv>
          <Filter
            placeholder="趣味で検索"
            value={
              (table.getColumn("hobbies")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("hobbies")?.setFilterValue(e.target.value);
            }}
          />
          <Filter
            placeholder="言語で検索"
            value={
              (table.getColumn("studyLangs")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("studyLangs")?.setFilterValue(e.target.value);
            }}
          />
        </FlexDiv>
        <Table>
          <Thead>
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
          </Thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableData key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableData>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </main>
    </div>
  );
};
