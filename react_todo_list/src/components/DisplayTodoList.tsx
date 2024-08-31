import { useRef } from "react";
import { DisplayTodoListType } from "../type/DisplayTodoListType";
import "./DisplayTodoListStyle.css";

/**
 * TODOの一覧を表示させるコンポーネント
 */
export const DisplayTodoList = ({
  onClickDelete,
  onClickEdit,
  onClickSave,
  handleCompleted,
  onChangeText,
  todos,
}: DisplayTodoListType) => {
  const inputRefObject = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={todo.id}>
              <div className="list-row">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onClick={() => handleCompleted(todo.id)}
                  onChange={() => {}}
                />
                <input
                  ref={(el) => (inputRefObject.current[index] = el)}
                  disabled={todo.active}
                  type="text"
                  className={`todo-item ${todo.completed ? "completed" : ""}`}
                  value={todo.text}
                  onChange={(e) => onChangeText(e, todo.id)}
                />
                {todo.active ? (
                  <button onClick={() => onClickEdit(index)}>編集</button>
                ) : (
                  <button onClick={() => onClickSave(index)}>保存</button>
                )}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
