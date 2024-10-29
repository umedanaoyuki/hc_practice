import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const schema = yup.object().shape({
  id: yup.number().required(),
  name: yup
    .string()
    .label("名前")
    .required("${label}は入力必須です")
    .max(20, "${label}は${max}文字以内で入力してください。"),
  role: yup
    .string()
    .label("ロール")
    .oneOf(["student", "mentor"])
    .required("${label}の入力は必須です"),
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
  postCode: yup
    .string()
    .matches(/^\d{3}-\d{4}$/, "郵便番号は123-4567の形式で入力してください")
    .label("郵便番号")
    .required("${label}は入力必須です"),
  phone: yup
    .string()
    .matches(
      /^(0[5-9]0\d{8}|0[1-9][1-9]\d{7}|0120\d{6})$/,
      "有効な電話番号を入力してください"
    )
    .label("電話番号")
    .required("${label}は入力必須です"),
  // hobbiesの定義を修正
  hobbies: yup
    .array()
    .of(yup.string().nullable())
    .label("趣味")
    .min(1, "少なくとも1つの趣味を入力してください")
    .required("${label}は入力必須です"),
  url: yup
    .string()
    .label("URL")
    .url("URLを登録してください")
    .required("${label}は入力必須です"),
  studyMinutes: yup
    .number()
    .nullable()
    .label("勉強時間")
    .typeError("${label}は数値で入力してください")
    .positive("${label}は正の数で入力してください")
    .min(30, "30分以上で入力してください")
    .when("role", {
      is: (val: string) => val === "student",
      then: (schema) => schema.required("${label}は入力必須です"),
      otherwise: (schema) => schema.notRequired(),
    }),
  taskCode: yup
    .number()
    .label("課題番号")
    .typeError("${label}は数値で入力してください")
    .nullable()
    .when("role", {
      is: (val: string) => val === "student",
      then: (schema) => schema.required("${label}は入力必須です"),
      otherwise: (schema) => schema.notRequired(),
    }),
  // studyLangsの定義を修正
  studyLangs: yup
    .array()
    .of(yup.string().nullable())
    .label("勉強している言語")
    .when("role", {
      is: (val: string) => val === "student",
      then: (schema) =>
        schema
          .required("${label}は入力必須です")
          .min(1, "少なくとも1つの言語を入力してください"),
      otherwise: (schema) => schema.notRequired(),
    }),
  score: yup
    .number()
    .nullable()
    .label("ハピネススコア")
    .typeError("${label}は数値で入力してください")
    .when("role", {
      is: (val: string) => val === "student",
      then: (schema) => schema.required("${label}は入力必須です"),
      otherwise: (schema) => schema.notRequired(),
    }),
  experienceDays: yup
    .number()
    .nullable()
    .label("実務経験年数")
    .typeError("${label}は数値で入力してください")
    .when("role", {
      is: (val: string) => val === "mentor",
      then: (schema) => schema.required("${label}は入力必須です"),
      otherwise: (schema) => schema.notRequired(),
    }),
  // useLangsの定義を修正
  useLangs: yup
    .array()
    .of(yup.string().nullable())
    .when("role", {
      is: (val: string) => val === "mentor",
      then: (schema) =>
        schema
          .required("${label}は入力必須です")
          .min(1, "少なくとも1つの言語を入力してください"),
      otherwise: (schema) => schema.notRequired(),
    }),
  availableStartCode: yup
    .number()
    .nullable()
    .typeError("数値で入力してください")
    .when("role", {
      is: (val: string) => val === "mentor",
      then: (schema) => schema.required("入力必須です"),
      otherwise: (schema) => schema.notRequired(),
    }),
  availableEndCode: yup
    .number()
    .nullable()
    .typeError("数値で入力してください")
    .when("role", {
      is: (val: string) => val === "mentor",
      then: (schema) => schema.required("入力必須です"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export type NewRegisterInputType = yup.InferType<typeof schema>;

export const useMyForm = () => {
  return useForm<NewRegisterInputType>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: Math.random(),
      name: "",
      role: "student",
      email: "",
      age: undefined,
      postCode: undefined,
      phone: undefined,
      hobbies: undefined, // 空の配列ではなく、空の文字列を含む配列を初期値として設定
      url: "",
      studyMinutes: null,
      taskCode: null,
      studyLangs: undefined, // 空の配列ではなく、空の文字列を含む配列を初期値として設定
      score: null,
      experienceDays: undefined,
      useLangs: undefined, // 空の配列ではなく、空の文字列を含む配列を初期値として設定
      availableStartCode: undefined,
      availableEndCode: undefined,
    },
  });
};
