import { useState } from "react";
import { userListDataType } from "./type/userListDataType";
import { USER_LIST } from "./api/userList";

function App() {
  const [userListData, setUserListData] =
    useState<userListDataType[]>(USER_LIST);

  const handleDisplayData = userListData.map(
    ({ id, name, role, email, age, postCode, phone, hobbies, url }) => {
      return (
        <tr key={id}>
          <th scope="row">{name}</th>
          <td>{role}</td>
          <td>{email}</td>
          <td>{age}</td>
          <td>{postCode}</td>
          <td>{phone}</td>
          <td>{hobbies}</td>
          <td>{url}</td>
        </tr>
      );
    }
  );

  return (
    <>
      {" "}
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
          </tr>
        </thead>
        <tbody>{handleDisplayData}</tbody>
      </table>
    </>
  );
}

export default App;
