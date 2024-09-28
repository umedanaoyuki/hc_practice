import { atom } from "recoil";
import { MentorDataType } from "../type/MentorDataType";
import { StudentDataType } from "../type/StudentDataType";

export const userListDataAtom = atom<(MentorDataType | StudentDataType)[]>({
  key: "UserListData",
  default: [],
});

// export const todoListState = atom<(MentorDataType | StudentDataType)[]>({
//   key: "TodoList",
//   default: [],
// });
