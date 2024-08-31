import { ChangeEvent, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [todoText, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);

  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  const onClickAdd = () => {
    // 入力が空の場合 何も動作しない
    if (todoText === "") return;
    const newTodos = [
      ...todos,
      {
        id: todos.length,
        text: todoText,
        completed: false,
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

  const onClickComplete = (index: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    const newCompletedTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompletedTodos);
  };

  // 戻る機能
  const onClickBack = (index: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    // 完了のTODOの更新
    setCompleteTodos(newCompleteTodos);

    // 未完了のTODO
    const newInCompletedTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newInCompletedTodos);
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
                  <p
                    className={`todo-item ${todo.completed ? "completed" : ""}`}
                  >
                    {todo.text}
                  </p>
                  <button>保存</button>
                  <button>編集</button>
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
