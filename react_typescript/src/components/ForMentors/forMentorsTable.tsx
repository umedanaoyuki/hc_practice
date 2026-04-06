import { MentorDataType } from "../../type/MentorDataType";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createColumns } from "./columns";
import { StudentDataType } from "../../type/StudentDataType";
import { Table } from "../../common/Table";
import { TableData } from "../../common/TableData";
import { TableHeader } from "../../common/TableHeader";
import styled from "styled-components";
import { Filter } from "../../common/Filter";
import { Thead } from "../../common/Thead";
import { useRecoilValue } from "recoil";
import { userListDataAtom } from "../../Atoms/UserListData";
import { useMemo } from "react";

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

/**
 * メンター情報の表示テーブル
 */
export const ForMentorsTable = () => {
  const userListData =
    useRecoilValue<(MentorDataType | StudentDataType)[]>(userListDataAtom);

  const studentsData = useMemo(
    () => userListData.filter((data) => data.role === "student"),
    [userListData]
  );
  const mentorsData = useMemo(
    () => userListData.filter((data) => data.role === "mentor"),
    [userListData]
  );

  const columns = createColumns(studentsData);

  const table = useReactTable<MentorDataType | StudentDataType>({
    columns,
    data: mentorsData,
    initialState: {
      // idでソート
      sorting: [{ id: "name", desc: false }],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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
              (table.getColumn("useLangs")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("useLangs")?.setFilterValue(e.target.value);
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
