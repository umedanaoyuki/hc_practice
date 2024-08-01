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

  // 保存ボタンの表示をさせるための状態管理用の変数（この変数が0のときに保存ボタンが表示できる）
  let showUpdateButton = 0;

  // 保存ボタン（更新するためのボタン）
  let updateButton = document.createElement("button");

  // すべてのTODOの数を管理する数字
  const allTaskNumber = document.getElementById("all-task-number");

  // 完了済みタスク数を管理する数字
  const completedTasks = document.getElementById("completed-tasks");

  // 未完了のタスク数を管理する数字
  const notCompletedTasks = document.getElementById("not-completed-tasks");

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
      tasksNotCompleted -= 1;

      completedTasks.textContent = tasksCompleted;
      notCompletedTasks.textContent = tasksNotCompleted;
    } else {
      itemText.style.textDecoration = "none";
      listItem.classList.remove("checked");

      tasksCompleted -= 1;
      tasksNotCompleted += 1;

      completedTasks.textContent = tasksCompleted;
      notCompletedTasks.textContent = tasksNotCompleted;
    }
  };

  listItem.appendChild(checkbox);
  // 入力したTODOの「文字」を格納するタグ
  let itemText = document.createElement("span");
  itemText.textContent = item;
  listItem.appendChild(itemText);

  // ３つのボタン要素を入れるタグ
  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  listItem.appendChild(buttonsDiv);

  // 編集ボタン
  let editButton = document.createElement("button");
  editButton.innerHTML = '<i class="edit-button">編集</i>';
  editButton.onclick = function () {
    itemText.contentEditable = true;
    itemText.focus();

    // 保存ボタン表示
    if (showUpdateButton === 0) {
      updateButton.innerHTML = '<i class="update-button">保存</i>';
      buttonsDiv.prepend(updateButton);
      // 保存ボタンを管理する状態管理の変数に1を追加
      showUpdateButton += 1;
    }
  };
  buttonsDiv.appendChild(editButton);

  itemText.onblur = function () {
    itemText.contentEditable = false;
    todoList[todoList.indexOf(item)] = itemText.textContent;
  };

  updateButton.onclick = function () {
    // 保存ボタンのボタン要素
    const updateButtonElement = document.querySelector(".update-button");

    // 保存（更新）をしようとした際にTODOが空の場合にエラー
    if (itemText.textContent.length === 0) {
      window.alert("1文字以上の入力が必要です。");
      return false;
    }

    // 保存（更新）をしようとした際に文字数が多すぎる場合にエラー
    if (itemText.textContent.length > 20) {
      window.alert("20文字以下で入力してください。");
      return false;
    }

    updateButtonElement.remove();
    // 保存ボタンの状態管理の変数の値を0に戻す
    showUpdateButton -= 1;
  };

  // 削除ボタン
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="trash-button">削除</i>';

  deleteButton.onclick = function () {
    // confirmの結果
    const result = window.confirm("本当に削除しますか？");

    if (result) {
      list.removeChild(listItem);
      todoList.splice(todoList.indexOf(item), 1);

      if (checkbox.checked) {
        tasksCompleted -= 1;
        completedTasks.textContent = tasksCompleted;
        allTaskNumber.textContent = todoList.length;
      } else {
        tasksNotCompleted -= 1;
        notCompletedTasks.textContent = tasksNotCompleted;
        allTaskNumber.textContent = todoList.length;
      }
    }
  };
  buttonsDiv.appendChild(deleteButton);
  list.appendChild(listItem);
  document.getElementById("todoInput").value = "";

  // const allTaskNumber = document.getElementById("all-task-number");
  allTaskNumber.textContent = todoList.length;
  tasksNotCompleted += 1;
  notCompletedTasks.textContent = tasksNotCompleted;
}
