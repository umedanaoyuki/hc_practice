import { useEffect, useState } from "react";
import { NewRegisterForm } from "./NewRegisterForm/NewRegisterForm";
import { data } from "../api/data";
import { MentorDataType } from "../type/MentorDataType";
import { StudentDataType } from "../type/StudentDataType";
import { ForAllTable } from "./ForAll/forAllTable";
import { ForStudentsTable } from "./ForStudents/forStudentsTable";
import { ForMentorsTable } from "./ForMentors/forMentorsTable";
import { useRecoilState } from "recoil";
import { userListDataSelector } from "../Atoms/UserListData";
import styled from "styled-components";
import { TabButton } from "../common/TabButton";

const CustomDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const TableDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const H1 = styled.h1`
  text-align: center;
`;

type TabTypes = "all" | "onlyStudents" | "onlyMentors";

const getData: () => Promise<(MentorDataType | StudentDataType)[]> = async () =>
  data;

const Top = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("all");

  // 全データ
  const [userListData, setUserListData] =
    useRecoilState<(MentorDataType | StudentDataType)[]>(userListDataSelector);

  const [studentsData, setStudentsData] = useState<StudentDataType[]>([]);
  const [mentorsData, setMentorsData] = useState<MentorDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setUserListData(await getData());
    };
    fetchData();
  }, []);

  useEffect(() => {
    setStudentsData(userListData.filter((data) => data.role === "student"));
    setMentorsData(userListData.filter((data) => data.role === "mentor"));
  }, [userListData]);

  return (
    <>
      <H1>React Typescript課題</H1>
      <CustomDiv>
        <TabButton
          $active={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        >
          全員
        </TabButton>
        <TabButton
          $active={activeTab === "onlyStudents"}
          onClick={() => setActiveTab("onlyStudents")}
        >
          生徒のみ
        </TabButton>
        <TabButton
          $active={activeTab === "onlyMentors"}
          onClick={() => setActiveTab("onlyMentors")}
        >
          メンターのみ
        </TabButton>
        <NewRegisterForm />
      </CustomDiv>
      {activeTab === "all" && (
        <TableDiv>
          <ForAllTable />
        </TableDiv>
      )}
      {activeTab === "onlyStudents" && (
        <TableDiv>
          <ForStudentsTable />
        </TableDiv>
      )}
      {activeTab === "onlyMentors" && (
        <TableDiv>
          <ForMentorsTable />
        </TableDiv>
      )}
    </>
  );
};

export default Top;
