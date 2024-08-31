import { ChangeEvent } from "react";

type InputTodoProps = {
  todoText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  disabled?: boolean;
};

const style = {
  backgroundColor: "#c6e5d9",
  width: "400px",
  height: "30px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px",
};

export const InputTodo = ({
  todoText,
  onChange,
  onClick,
  disabled,
}: InputTodoProps) => {
  console.log("コンポーネントの中");

  return (
    <div style={style}>
      <input
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
        disabled={disabled}
      />
      <button onClick={onClick} disabled={disabled}>
        追加
      </button>
    </div>
  );
};
