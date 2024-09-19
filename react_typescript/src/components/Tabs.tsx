import React, { useState } from "react";

type TabTypes = "all" | "onlyStudents" | "onlyMentors";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<TabTypes>("all");

  console.log(activeTab);

  return (
    <div>
      <button onClick={() => setActiveTab("all")}>全員</button>
      <button onClick={() => setActiveTab("onlyStudents")}>生徒のみ</button>
      <button onClick={() => setActiveTab("onlyMentors")}>メンターのみ</button>
    </div>
  );
};

export default Tabs;
