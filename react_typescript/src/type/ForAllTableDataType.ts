import { MentorDataType } from "./MentorDataType";
import { StudentDataType } from "./StudentDataType";

export type TableDataType = {
  studentsData: StudentDataType[];
  mentorsData: MentorDataType[];
};
