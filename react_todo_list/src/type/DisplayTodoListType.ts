import { ChangeEvent } from "react";
import { TodoType } from "./TodoType";

export type DisplayTodoListType = {
  onClickDelete: (id: number) => void;
  onClickEdit: (id: string, index: number) => void;
  onClickSave: (id: string) => void;
  handleCompleted: (id: string) => void;
  onChangeText: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
  todos: TodoType[];
};
