// TODOリストを格納する配列
let todoList = [];

const addTask = document.getElementById("addTask");
// 入力したタスクを追加
addTask.addEventListener("click", addTodoItem);

// すべてのTODOリストの数
let totalCount = todoList.length;

// 完了済タスクの数
let tasksCompleted = 0;

// 未完了のタスクの数
let tasksNotCompleted = 0;

/**
 * TODOリスト追加・編集・削除・更新の処理
 */
function addTodoItem() {
  // 入力されたTODOリスト
  let item = document.getElementById("todoInput").value;

  // 空の入力を制限
  if (item.length === 0) {
    window.alert("1文字以上の入力が必要です。");
    return false;
  }

  // 入力できる文字数を制限
  if (item.length > 20) {
    window.alert("20文字以下で入力してください。");
    return false;
  }

  todoList.push(item);

  // 入力したTODOを表示させるためのタグのidを取得
  let list = document.getElementById("todoList");
  let listItem = document.createElement("div");
  listItem.className = "todoItem";

  // TODOリストの未完了・完了を切り替えるためのチェックボックスの作成
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // 保存ボタンの表示をさせるための状態管理用の変数
  let showUpdateButton = 0;

  // 保存ボタン（更新するためのボタン）
  let updateButton = document.createElement("button");

  // 完了済みタスク数を管理する数字
  const completedTasks = document.getElementById("completed-tasks");

  checkbox.onclick = function () {
    // 保存ボタンが表示されている状態（TODOの編集中）の時には、チェックボックスにチェックができないようにする
    if (showUpdateButton != 0) {
      window.alert("保存ボタンを押してください");
      return false;
    }

    if (checkbox.checked) {
      itemText.style.textDecoration = "line-through";
      listItem.classList.add("checked");
      tasksCompleted += 1;

      // 未完了のタスク数を管理する数字
      const notCompletedTasks = document.getElementById("not-completed-tasks");
      tasksNotCompleted -= 1;

      completedTasks.textContent = tasksCompleted;
      notCompletedTasks.textContent = tasksNotCompleted;
    } else {
      itemText.style.textDecoration = "none";
      listItem.classList.remove("checked");

      // 完了済みタスク
      const completedTasks = document.getElementById("completed-tasks");
      tasksCompleted -= 1;

      // 未完了のタスク
      const notCompletedTasks = document.getElementById("not-completed-tasks");
      tasksNotCompleted += 1;

      completedTasks.textContent = tasksCompleted;
      notCompletedTasks.textContent = tasksNotCompleted;
    }
  };

  listItem.appendChild(checkbox);
  let itemText = document.createElement("span");
  itemText.textContent = item;
  listItem.appendChild(itemText);

  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  listItem.appendChild(buttonsDiv);

  // 編集
  let editButton = document.createElement("button");
  editButton.innerHTML = '<i class="edit-button">編集</i>';
  editButton.onclick = function () {
    itemText.contentEditable = true;
    itemText.focus();

    // 保存ボタン表示
    if (showUpdateButton === 0) {
      updateButton.innerHTML = '<i class="update-button">保存</i>';
      buttonsDiv.prepend(updateButton);
      showUpdateButton += 1;
    }
  };
  buttonsDiv.appendChild(editButton);

  itemText.onblur = function () {
    itemText.contentEditable = false;
    todoList[todoList.indexOf(item)] = itemText.textContent;
  };

  updateButton.onclick = function () {
    const updateButtonElement = document.querySelector(".update-button");

    if (itemText.textContent.length === 0) {
      window.alert("1文字以上の入力が必要です。");
      return false;
    }

    if (itemText.textContent.length > 20) {
      window.alert("20文字以下で入力してください。");
      return false;
    }

    updateButtonElement.remove();
    showUpdateButton -= 1;
  };

  // 削除
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="trash-button">削除</i>';
  deleteButton.onclick = function () {
    const result = window.confirm("本当に削除しますか？");

    if (result) {
      list.removeChild(listItem);
      todoList.splice(todoList.indexOf(item), 1);

      if (checkbox.checked) {
        tasksCompleted -= 1;
        completedTasks.textContent = tasksCompleted;

        const allTaskNumber = document.getElementById("all-task-number");
        allTaskNumber.textContent = todoList.length;
      } else {
        tasksNotCompleted -= 1;
        notCompletedTasks.textContent = tasksNotCompleted;

        const allTaskNumber = document.getElementById("all-task-number");
        allTaskNumber.textContent = todoList.length;
      }
    }
  };
  buttonsDiv.appendChild(deleteButton);
  list.appendChild(listItem);
  document.getElementById("todoInput").value = "";

  const allTaskNumber = document.getElementById("all-task-number");
  allTaskNumber.textContent = todoList.length;

  const notCompletedTasks = document.getElementById("not-completed-tasks");
  tasksNotCompleted += 1;
  notCompletedTasks.textContent = tasksNotCompleted;
}
