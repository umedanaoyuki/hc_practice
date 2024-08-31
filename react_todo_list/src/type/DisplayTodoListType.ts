import { ChangeEvent } from "react";
import { TodoType } from "./TodoType";

export type DisplayTodoListType = {
  onClickDelete: (index: number) => void;
  onClickEdit: (index: number) => void;
  onClickSave: (index: number) => void;
  handleCompleted: (index: number) => void;
  onChangeText: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  todos: TodoType[];
};
