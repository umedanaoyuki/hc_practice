import { ChangeEvent, useRef, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { DisplayTodoList } from "./components/DisplayTodoList";
import { TodoType } from "./type/TodoType";
import { v4 as uuidv4 } from "uuid";

function App() {
  // TODOの入力欄の状態
  const [todoText, setTodoText] = useState<string>("");

  // 全TODOリストの状態
  const [todos, setTodos] = useState<TodoType[]>([]);

  const inputRefObject = useRef<(HTMLInputElement | null)[]>([]);

  /**
   * TODO入力欄の表示を切り替えるメソッド
   */
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  /**
   * TODOの内容を書き換えるメソッド
   */
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
    const uniqueId = uuidv4();
    // 入力が空の場合 何も動作しない
    if (todoText === "") return;
    const newTodos = [
      ...todos,
      {
        id: uniqueId,
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
    const result = window.confirm("本当によろしいですか？");
    if (result) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  /**
   * TODOを編集するためのメソッド
   */
  const onClickEdit = (id: number) => {
    inputRefObject.current[id]?.focus();

    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
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
      <h1>TODO リスト</h1>
      <div className="task-info">
        <p className="indivisual-task">すべてのタスク:&nbsp;{todos.length}</p>
        <p className="indivisual-task">
          完了済のタスク:&nbsp;
          {
            todos.filter((todo) => {
              return todo.completed;
            }).length
          }
        </p>
        <p className="indivisual-task">
          未完了のタスク:&nbsp;
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
