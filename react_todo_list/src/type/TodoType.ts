export type Todo = {
  id: number;
  // TODOの内容
  text: string;
  // TODOの完了ステータス
  completed: boolean;
  // 編集モードかどうか
  active: boolean;
};
