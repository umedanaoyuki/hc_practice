import { useEffect, useState } from "react";
import { StudentDataType } from "./type/StudentDataType";
import { USER_LIST } from "./api/userList";
import { MentorDataType } from "./type/MentorDataType";

function App() {
  const [userListData, setUserListData] =
    useState<(MentorDataType | StudentDataType)[]>(USER_LIST);

  // 生徒の情報
  const [studentsData, setStudentsData] = useState<StudentDataType[]>([]);
  // メンター情報
  const [mentorsData, setMentorsData] = useState<MentorDataType[]>([]);

  useEffect(() => {
    userListData.forEach((data) => {
      if (data.role === "student") {
        setStudentsData((prevStudent) => [
          ...prevStudent,
          data as StudentDataType,
        ]);
      } else {
        setMentorsData((prevMentor) => [...prevMentor, data as MentorDataType]);
      }
    });
  }, [userListData]);

  /**
   * 対応可能なメンター
   */
  const handleAvailableMentor = (data: StudentDataType) => {
    const mentorsArray: string[] = [];

    mentorsData.forEach((mentorData) => {
      if (
        mentorData.availableStartCode <= data.taskCode &&
        mentorData.availableEndCode >= data.taskCode
      ) {
        mentorsArray.push(mentorData.name);
      }
    });

    // 重複した要素の削除
    const uniqueMentorsArray = mentorsArray.filter((elm, index) => {
      return mentorsArray.indexOf(elm) === index;
    });

    return uniqueMentorsArray.join("/");
  };

  /**
   * 対応可能な生徒
   */
  const hanleAvailableStudent = (data: MentorDataType) => {};

  // console.log(studentsData);

  // console.log(mentorsData);

  /**
   * APIレスポンスの表示
   */
  const handleDisplayData = userListData.map((data) => {
    if (data.role === "student") {
      handleAvailableMentor(data);
    }

    return (
      <tr key={data.id}>
        <th scope="row">{data.name}</th>
        <td>{data.role}</td>
        <td>{data.email}</td>
        <td>{data.age}</td>
        <td>{data.postCode}</td>
        <td>{data.phone}</td>
        <td>{data.hobbies.join("/")}</td>
        <td>{data.url}</td>
        {/* studyMinutes と taskCode が存在する場合のみ表示 */}
        {data.role === "student" ? (
          <>
            <td>{data.studyMinutes}</td>
            <td>{data.taskCode}</td>
            <td>{data.studyLangs.join("/")}</td>
            <td>{data.score}</td>
            {/* 対応可能なメンター */}
            <td>{handleAvailableMentor(data)}</td>
          </>
        ) : (
          <>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            {/* 対応可能なメンター */}
            <td>{}</td>
          </>
        )}
        {data.role === "mentor" && (
          <>
            <td>{data.experienceDays}</td>
            <td>{data.useLangs.join("/")}</td>
            <td>{data.availableStartCode}</td>
            <td>{data.availableEndCode}</td>
            {/* 対応可能な生徒 */}
            {/* <td>{data.score}</td> */}
          </>
        )}
      </tr>
    );
  });

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">名前</th>
            <th scope="col">ロール</th>
            <th scope="col">メールアドレス</th>
            <th scope="col">年齢</th>
            <th scope="col">郵便番号</th>
            <th scope="col">電話番号</th>
            <th scope="col">趣味（リスト）</th>
            <th scope="col">URL</th>
            {/* 生徒のみ */}
            <th scope="col">勉強時間</th>
            <th scope="col">課題番号</th>
            <th scope="col">勉強中の言語</th>
            <th scope="col">ハピネススコア</th>
            <th scope="col">対応可能なメンター</th>
            {/* メンターのみ */}
            <th scope="col">実務経験月数</th>
            <th scope="col">現場で使っている言語</th>
            <th scope="col">担当できる課題番号初め</th>
            <th scope="col">担当できる課題番号終わり</th>
            <th scope="col">対応可能生徒</th>
          </tr>
        </thead>
        <tbody>{handleDisplayData}</tbody>
      </table>
    </>
  );
}

export default App;
