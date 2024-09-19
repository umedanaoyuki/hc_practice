import Tabs from "./components/Tabs";
import { ForAllTable } from "./components/ForAllTable";
import { ForMentorsTable } from "./components/ForMentorsTable";
import { ForStudentsTable } from "./components/ForStudentsTable";

function App() {
  return (
    <>
      <Tabs />
      <ForAllTable />
      <ForMentorsTable />
      <ForStudentsTable />
    </>
  );
}

export default App;
