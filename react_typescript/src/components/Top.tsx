import { useEffect, useState } from "react";
import {
  NewRegisterButton,
  NewRegisterForm,
} from "./NewRegisterForm/NewRegisterForm";
import { data } from "../api/data";
import { MentorDataType } from "../type/MentorDataType";
import { StudentDataType } from "../type/StudentDataType";
import { ForAllTable } from "./ForAll/forAllTable";
import { ForStudentsTable } from "./ForStudents/forStudentsTable";
import { ForMentorsTable } from "./ForMentors/forMentorsTable";
import { useRecoilState } from "recoil";
import { userListDataSelector } from "../Atoms/UserListData";
import { Button } from "../common/Button";
import styled from "styled-components";

const CustomDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const TableDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const TableButtonDiv = styled.div`
  justify-content: center;
  /* justify-content: center; */
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

  return (
    <>
      <H1>React Typescript課題</H1>
      <CustomDiv>
        <Button onClick={() => setActiveTab("all")}>全員</Button>
        <Button onClick={() => setActiveTab("onlyStudents")}>生徒のみ</Button>
        <Button onClick={() => setActiveTab("onlyMentors")}>
          メンターのみ
        </Button>
        <NewRegisterForm />
      </CustomDiv>
      {activeTab === "all" && (
        <TableDiv>
          <ForAllTable studentsData={studentsData} mentorsData={mentorsData} />
        </TableDiv>
      )}
      {activeTab === "onlyStudents" && (
        <TableDiv>
          <ForStudentsTable
            studentsData={studentsData}
            mentorsData={mentorsData}
          />
        </TableDiv>
      )}
      {activeTab === "onlyMentors" && (
        <TableDiv>
          <ForMentorsTable
            studentsData={studentsData}
            mentorsData={mentorsData}
          />
        </TableDiv>
      )}
    </>
  );
};

export default Top;
