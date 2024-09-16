import { useState } from "react";
import { userListDataType } from "./type/userListDataType";
import { USER_LIST } from "./api/userList";

function App() {
  const [userListData, setUserListData] =
    useState<userListDataType[]>(USER_LIST);

  console.log(userListData);

  const handleDisplayData = userListData.map(
    ({ id, name, role, email, age, postCode, phone, hobbies, url }) => {
      return (
        <div key={id}>
          <p className="">{name}</p>
          <p className="">{role}</p>
          <p className="">{email}</p>
          <p className="">{age}</p>
          <p className="">{postCode}</p>
          <p className="">{phone}</p>
          <p className="">
            {hobbies.map((hobby) => {
              return <p>{hobby}</p>;
            })}
          </p>
          <p>{url}</p>
          <p>--------------------------------</p>
        </div>
      );
    }
  );

  return <>{handleDisplayData}</>;
}

export default App;
