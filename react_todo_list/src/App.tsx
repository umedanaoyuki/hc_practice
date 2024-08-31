import { ChangeEvent, useRef, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  active: boolean;
};

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const inputRefObject = useRef<HTMLInputElement>(null);

  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
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
    console.log(newTodos);
    setTodoText("");
    // console.log(todos);
  };

  const onClickDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const onClickEdit = (id: number) => {
    // console.log(todos[index]);
    console.log("編集ボタン押下");
    console.log(inputRefObject.current);
    inputRefObject.current?.focus();

    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            active: !todo.active,
          };
        }
        return todo;
      })
    );
  };

  // タスクの上限
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

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
        <p>すべてのタスク:{completeTodos.length + incompleteTodos.length}</p>
        <p>完了済のタスク:{completeTodos.length}</p>
        <p>未完了のタスク:{incompleteTodos.length}</p>
      </div>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />
      <div>TODO表示</div>
      <div>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={todo.id}>
                <div className="list-row">
                  <input
                    type="checkbox"
                    onClick={() => handleCompleted(todo.id)}
                  />
                  <input
                    ref={inputRefObject}
                    disabled={todo.active}
                    type="text"
                    className={`todo-item ${todo.completed ? "completed" : ""}`}
                    value={todo.text}
                    onChange={onChangeText}
                  />
                  <button>保存</button>
                  <button onClick={() => onClickEdit(index)}>編集</button>
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
