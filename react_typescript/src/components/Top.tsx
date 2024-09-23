import { useState } from "react";
import { ForAllTable } from "./ForAll/forAllTable";
import { ForMentorsTable } from "./ForMentors/forMentorsTable";
import { ForStudentsTable } from "./ForStudents/forStudentsTable";

type TabTypes = "all" | "onlyStudents" | "onlyMentors";

const Top = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("all");

  console.log(activeTab);

  return (
    <>
      <div>
        <button onClick={() => setActiveTab("all")}>全員</button>
        <button onClick={() => setActiveTab("onlyStudents")}>生徒のみ</button>
        <button onClick={() => setActiveTab("onlyMentors")}>
          メンターのみ
        </button>
      </div>
      {activeTab === "all" && <ForAllTable />}
      {activeTab === "onlyStudents" && <ForStudentsTable />}
      {activeTab === "onlyMentors" && <ForMentorsTable />}
    </>
  );
};

export default Top;
