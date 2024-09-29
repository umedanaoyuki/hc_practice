import * as yup from "yup";

export const schema = yup.object({
  id: yup.number(),
  name: yup
    .string()
    .label("名前")
    .required("${label}は入力必須です")
    .max(20, "${label}は${max}文字以内で入力してください。"),
  role: yup.string().label("ロール").required("${label}の入力は必須です"),
  email: yup
    .string()
    .label("メールアドレス")
    .email("メールアドレスを登録してください")
    .required("${label}は入力必須です"),
  age: yup
    .number()
    .label("年齢")
    .typeError("${label}は数値で入力してください")
    .integer("${label}は整数で入力してください")
    .positive("${label}は正の数で入力してください")
    .max(100, "100歳以上は登録できません")
    .required("${label}は入力必須です"),
  postCode: yup.string().label("郵便番号").required("${label}は入力必須です"),
  phone: yup.string().label("電話番号").required("${label}は入力必須です"),
  hobbies: yup
    .array(yup.string())
    .label("趣味")
    .required("${label}は入力必須です"),
  url: yup
    .string()
    .label("URL")
    .url("URLを登録してください")
    .required("${label}は入力必須です"),
  studyMinutes: yup.number(),
  taskCode: yup.number(),
  taskLangs: yup.array(yup.string()),
  score: yup.number(),
  experienceDays: yup.number(),
  useLangs: yup.array(yup.string()),
  availableStartCode: yup.number(),
  availableEndCode: yup.number(),
});
