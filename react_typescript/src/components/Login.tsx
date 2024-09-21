import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputType } from "../type/LoginInputType";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginInputType>({
    defaultValues: {
      accountId: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    console.log(data);
    if (data.accountId === "testUser" && data.password === "testpassword") {
      loginSuccess();
    } else {
      alert("アカウントID or パスワードが間違っております");
    }
    reset();
  };

  const loginSuccess = () => {
    navigate("/Top");
  };

  return (
    <>
      <div className="login-title-container">
        <h1>ログイン画面</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
