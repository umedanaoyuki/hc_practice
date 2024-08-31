import { ChangeEvent, useRef, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";

type Todo = {
  id: number;
  text: string;
  // 完了したかどうか
  completed: boolean;
  // 編集モードかどうか
  active: boolean;
};

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const inputRefObject = useRef<(HTMLInputElement | null)[]>([]);

  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  const onChangeText = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    // console.log("onChangeText実行中");
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: event.target.value };
        }
        return todo;
      })
    );
  };

  const onClickAdd = () => {
    // 入力が空の場合 何も動作しない
    if (todoText === "") return;
    const newTodos = [
      ...todos,
      {
        id: todos.length,
        text: todoText,
        completed: false,
        active: true,
      },
    ];
    setTodos(newTodos);
    console.log("onClick");
    // console.log(newTodos);
    setTodoText("");
    console.log(todoText);
  };

  const onClickDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const onClickEdit = (id: number) => {
    inputRefObject.current[id]?.focus();

    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          // todo.text = value;
          return {
            ...todo,
            active: false,
          };
        }
        return todo;
      })
    );
  };

  const onClickSave = (id: number) => {
    console.log("保存ボタンの押下");

    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            active: true,
          };
        }
        return todo;
      })
    );
  };

  /**
   * 取り消し線の追加
   */
  const handleCompleted = (id: number) => {
    console.log("チェックボックス押下");
    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        // idが一致しない場合はもとの配列を返す
        return todo;
      })
    );
  };

  return (
    <>
      <p>TODOリスト</p>
      <div>
        <p>すべてのタスク:{todos.length}</p>
        <p>
          完了済のタスク:
          {
            todos.filter((todo) => {
              return todo.completed == true;
            }).length
          }
        </p>
        <p>
          未完了のタスク:
          {
            todos.filter((todo) => {
              return todo.completed == false;
            }).length
          }
        </p>
      </div>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
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
    </>
  );
}

export default App;
