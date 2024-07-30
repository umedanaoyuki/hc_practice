// TODOリストを格納する配列
let todoList = [];
const addTask = document.getElementById("addTask");
addTask.addEventListener("click", addTodoItem);

// すべてのタスクの数
let totalCount = todoList.length;

// 完了済タスクの数
let tasksCompleted = 0;

// 未完了のタスクの数
let tasksNotCompleted = 0;

function addTodoItem() {
  let item = document.getElementById("todoInput").value;

  console.log(`itemは${item.length}`);

  if (item.length === 0) {
    window.alert("1文字以上の入力が必要です。");
    return false;
  }

  if (item.length > 20) {
    window.alert("20文字以下で入力してください。");
    return false;
  }

  todoList.push(item);

  let list = document.getElementById("todoList");
  let listItem = document.createElement("div");
  listItem.className = "todoItem";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // 完了済みタスク
  const completedTasks = document.getElementById("completed-tasks");

  checkbox.onclick = function () {
    if (checkbox.checked) {
      itemText.style.textDecoration = "line-through";
      listItem.classList.add("checked");

      // 完了済みタスク
      tasksCompleted += 1;
      console.log("taskCompleted" + tasksCompleted);

      // 未完了のタスク
      const notCompletedTasks = document.getElementById("not-completed-tasks");
      tasksNotCompleted -= 1;
      console.log("tasksNotCompleted" + tasksNotCompleted);

      completedTasks.textContent = tasksCompleted;
      notCompletedTasks.textContent = tasksNotCompleted;

      console.log("checkbox-checked true");
    } else {
      itemText.style.textDecoration = "none";
      listItem.classList.remove("checked");

      // 完了済みタスク
      const completedTasks = document.getElementById("completed-tasks");
      tasksCompleted -= 1;
      console.log("taskCompleted" + tasksCompleted);

      // 未完了のタスク
      const notCompletedTasks = document.getElementById("not-completed-tasks");
      tasksNotCompleted += 1;
      console.log("tasksNotCompleted" + tasksNotCompleted);

      completedTasks.textContent = tasksCompleted;
      notCompletedTasks.textContent = tasksNotCompleted;

      console.log("checkbox-checked else");
    }
  };

  listItem.appendChild(checkbox);
  let itemText = document.createElement("span");
  itemText.textContent = item;
  listItem.appendChild(itemText);

  let buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  listItem.appendChild(buttonsDiv);

  // 保存ボタンの表示をさせるための状態管理用の変数
  let showUpdateButton = 0;
  let updateButton = document.createElement("button");

  // 編集
  let editButton = document.createElement("button");
  editButton.innerHTML = '<i class="edit-button">編集</i>';
  editButton.onclick = function () {
    itemText.contentEditable = true;
    itemText.focus();

    if (showUpdateButton === 0) {
      updateButton.innerHTML = '<i class="update-button">保存</i>';
      buttonsDiv.prepend(updateButton);
      temp += 1;
    }
  };
  buttonsDiv.appendChild(editButton);

  itemText.onblur = function () {
    itemText.contentEditable = false;

    console.log("itemText " + itemText.textContent);

    todoList[todoList.indexOf(item)] = itemText.textContent;
  };

  updateButton.onclick = function () {
    const updateButtonElement = document.querySelector(".update-button");
    console.log(`保存ボタン押下${itemText.textContent}`);

    if (itemText.textContent.length === 0) {
      window.alert("1文字以上の入力が必要です。");
      return false;
    }

    if (itemText.textContent.length > 20) {
      window.alert("20文字以下で入力してください。");
      return false;
    }

    updateButtonElement.remove();
  };

  // 削除
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="trash-button">削除</i>';
  deleteButton.onclick = function () {
    console.log(todoList.length);
    const result = window.confirm("本当に削除しますか？");

    if (result) {
      list.removeChild(listItem);
      todoList.splice(todoList.indexOf(item), 1);

      console.log(todoList.length);

      if (checkbox.checked) {
        console.log("チェックされている");
        tasksCompleted -= 1;
        completedTasks.textContent = tasksCompleted;

        const allTaskNumber = document.getElementById("all-task-number");
        console.log(allTaskNumber);
        allTaskNumber.textContent = todoList.length;
      } else {
        console.log("チェックされていない");
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

  console.log("allTaskNumber");
  const allTaskNumber = document.getElementById("all-task-number");
  allTaskNumber.textContent = todoList.length;

  const notCompletedTasks = document.getElementById("not-completed-tasks");
  tasksNotCompleted += 1;
  notCompletedTasks.textContent = tasksNotCompleted;
}
