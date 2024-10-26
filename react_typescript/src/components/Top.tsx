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
import { Button } from "../common/Button";
import styled from "styled-components";

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
      <FlexDiv>
        <div>
          <Button onClick={() => setActiveTab("all")}>全員</Button>
          <Button onClick={() => setActiveTab("onlyStudents")}>生徒のみ</Button>
          <Button onClick={() => setActiveTab("onlyMentors")}>
            メンターのみ
          </Button>
        </div>
        <div>
          <NewRegisterForm />
        </div>
      </FlexDiv>
      {activeTab === "all" && (
        <ForAllTable studentsData={studentsData} mentorsData={mentorsData} />
      )}
      {activeTab === "onlyStudents" && (
        <ForStudentsTable
          studentsData={studentsData}
          mentorsData={mentorsData}
        />
      )}
      {activeTab === "onlyMentors" && (
        <ForMentorsTable
          studentsData={studentsData}
          mentorsData={mentorsData}
        />
      )}
    </>
  );
};

export default Top;
