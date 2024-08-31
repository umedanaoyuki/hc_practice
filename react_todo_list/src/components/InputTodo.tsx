import { ChangeEvent } from "react";

type InputTodoProps = {
  todoText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

// const style = {
//   backgroundColor: "#c6e5d9",
//   width: "400px",
//   height: "30px",
//   padding: "8px",
//   margin: "8px",
//   borderRadius: "8px",
// };

export const InputTodo = ({ todoText, onChange, onClick }: InputTodoProps) => {
  return (
    // <div style={style}>
    <div>
      <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
      <button onClick={onClick}>追加</button>
    </div>
  );
};
