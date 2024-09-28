import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputType } from "../type/NewRegisterInputType";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLoginPageWrapper = styled.div`
  text-align: center;
  color: white;
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 13px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 200;
`;

const StyledLoginTitleContainer = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const StyledFormWrapper = styled.div`
  background: #0e101c;
  max-width: 400px;
  margin: 0 auto;
`;

const StyledLabel = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 13px;
  margin-top: 20px;
  color: white;
  font-size: 14px;
  font-weight: 200;
`;

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;

  &:disabled {
    opacity: 0.4;
  }

  &[type="submit"] {
    background: #ec5990;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 15px;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 5px;

    &:hover {
      background: #bf1650;
    }

    &:active {
      transition: 0.3s all;
      transform: translateY(3px);
      border: 1px solid transparent;
      opacity: 0.8;
    }
  }
`;

const StyledErrorMessage = styled.p`
  color: #bf1650;

  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

export const Login = () => {
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
      alert("アカウントID or パスワードが間違っています");
    }
    reset();
  };

  const loginSuccess = () => {
    navigate("/Top");
  };

  return (
    <StyledLoginPageWrapper>
      <StyledLoginTitleContainer>
        <h1>ログイン画面</h1>
      </StyledLoginTitleContainer>
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel>アカウントID</StyledLabel>
          <StyledInput {...register("accountId", { required: true })} />
          {errors.password && (
            <StyledErrorMessage>
              アカウントIDを入力してください
            </StyledErrorMessage>
          )}
          <StyledLabel>パスワード</StyledLabel>
          <StyledInput
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <StyledErrorMessage>
              パスワードを入力してください
            </StyledErrorMessage>
          )}
          <StyledInput type="submit" value={"ログイン"} />
        </StyledForm>
      </StyledFormWrapper>
    </StyledLoginPageWrapper>
  );
};
