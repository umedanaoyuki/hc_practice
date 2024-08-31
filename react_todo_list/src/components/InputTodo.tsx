import { ChangeEvent } from "react";

type InputTodoProps = {
  todoText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

export const InputTodo = ({ todoText, onChange, onClick }: InputTodoProps) => {
  return (
    <div className="input-area">
      <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
      <button onClick={onClick}>追加</button>
    </div>
  );
};
