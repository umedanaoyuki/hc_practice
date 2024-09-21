import { useForm } from "react-hook-form";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
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
        <input {...register("accountId")} />
        <label>パスワード</label>
        <input {...register("password", { required: true, maxLength: 10 })} />
        {errors.password && <p>This field is required</p>}
        <input type="submit" value={"ログイン"} />
      </form>
    </>
  );
};

export default Login;
