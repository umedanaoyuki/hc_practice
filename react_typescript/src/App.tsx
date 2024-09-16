import { useEffect, useState } from "react";
import { userListDataType } from "./type/userListDataType";
import { USER_LIST } from "./api/userList";

function App() {
  const [userListData, setUserListData] = useState<userListDataType[] | null>();

  useEffect(() => {
    setUserListData(USER_LIST);
  }, [userListData]);

  return (
    <>
      <p>テスト</p>
    </>
  );
}

export default App;
