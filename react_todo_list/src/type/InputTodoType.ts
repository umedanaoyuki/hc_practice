import { ChangeEvent } from "react";

export type InputTodoType = {
  todoText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};
