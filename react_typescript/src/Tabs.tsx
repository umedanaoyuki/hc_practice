import { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  width: 100%;
`;

const TabButtons = styled.div`
  display: flex;
  cursor: pointer;
  border-bottom: 2px solid #ccc;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#007BFF" : "#f1f1f1")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  border-bottom: ${({ active }) => (active ? "2px solid #007BFF" : "none")};
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const TabContent = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Tab 1", content: "This is the content of Tab 1" },
    { title: "Tab 2", content: "This is the content of Tab 2" },
    { title: "Tab 3", content: "This is the content of Tab 3" },
  ];

  return (
    <TabsContainer>
      <TabButtons>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabButtons>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </TabsContainer>
  );
};

export default Tabs;
