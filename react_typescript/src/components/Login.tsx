import { useForm } from "react-hook-form";
import { LoginInputType } from "../type/LoginInputType";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputType>({
    defaultValues: {
      accountId: "",
      password: "",
    },
  });

  return (
    <>
      <div className="login-title-container">
        <h1>ログイン画面</h1>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <label>アカウントID</label>
        <input {...register("accountId", { required: true })} />
        {errors.password && <p>アカウントIDを入力してください</p>}
        <label>パスワード</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>パスワードを入力してください</p>}
        <input type="submit" value={"ログイン"} />
      </form>
    </>
  );
};

export default Login;
