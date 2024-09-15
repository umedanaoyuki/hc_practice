import { InputTodoType } from "../type/InputTodoType";
import "./InputTodoStyle.css";

export const InputTodo = ({ todoText, onChange, onClick }: InputTodoType) => {
  return (
    <div className="task-input-area">
      <input
        className="input-area"
        placeholder="タスクを追加"
        value={todoText}
        onChange={onChange}
      />
      <button className="add-button" onClick={onClick}>
        追加
      </button>
    </div>
  );
};
