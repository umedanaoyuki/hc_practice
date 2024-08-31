import { ChangeEvent, useRef, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { DisplayTodoList } from "./components/DisplayTodoList";
import { Todo } from "./type/TodoType";

function App() {
  // TODOの入力欄の状態
  const [todoText, setTodoText] = useState<string>("");

  // 全TODOリストの状態
  const [todos, setTodos] = useState<Todo[]>([]);

  const inputRefObject = useRef<(HTMLInputElement | null)[]>([]);

  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  const onChangeText = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: event.target.value };
        }
        return todo;
      })
    );
  };

  /**
   * TODOを追加するためのメソッド
   */
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
    setTodoText("");
  };

  /**
   * TODOを削除するためのメソッド
   */
  const onClickDelete = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  /**
   * TODOを編集するためのメソッド
   */
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

  /**
   * 編集したTODOを保存するためのメソッド
   */
  const onClickSave = (id: number) => {
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
      <h1>TODOリスト</h1>
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
      <DisplayTodoList
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
        onClickSave={onClickSave}
        handleCompleted={handleCompleted}
        onChangeText={onChangeText}
        todos={todos}
      />
    </>
  );
}

export default App;
