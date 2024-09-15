export type TodoType = {
  id: string;
  // TODOの内容
  text: string;
  // TODOの完了ステータス
  completed: boolean;
  // 編集モードかどうか
  active: boolean;
};
