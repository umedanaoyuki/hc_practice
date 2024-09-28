import { atom, selector } from "recoil";
import { MentorDataType } from "../type/MentorDataType";
import { StudentDataType } from "../type/StudentDataType";

export const userListDataAtom = atom<(MentorDataType | StudentDataType)[]>({
  key: "UserListData",
  default: [],
});

export const userListDataSelector = selector({
  key: "UserListDataSelector",
  get: ({ get }) => get(userListDataAtom),
  set: ({ set }, newValue) => set(userListDataAtom, newValue),
});
