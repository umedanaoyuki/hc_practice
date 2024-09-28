import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { LoginInputType } from "../type/LoginInputType";
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export const NewRegisterForm = () => {
  let subtitle;
  // モーダルオープン・クローズの状態管理
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

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

  const onSubmit: SubmitHandler<LoginInputType> = (data) => {
    console.log(data);
    return null;
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="MewRegistrationModal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>新規登録</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
        <div>
          <div>
            <h1>新規登録</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="">アカウントID</label>
              <input {...register("accountId", { required: true })} />
              {errors.password && (
                <p className="">アカウントIDを入力してください</p>
              )}
              <label>パスワード</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && <p>パスワードを入力してください</p>}
              {/* ラジオボタン */}

              <label htmlFor="">ロール</label>
              <div>
                <input type="radio" value="生徒" checked />
                生徒
                <input type="radio" value="先生" />
                先生
              </div>
              <label htmlFor="">名前</label>
              <input type="text" />
              <label htmlFor="">メールアドレス</label>
              <input type="email"></input>
              <label htmlFor="">年齢</label>
              <input type="number" />
              <label htmlFor="">郵便番号</label>
              <input type="number" />
              <label htmlFor="">電話番号</label>
              <input type="number" />
              <label htmlFor="">趣味(3つまで)</label>
              <input type="text" />
              <label htmlFor="">URL</label>
              <input type="text" />

              <label htmlFor="">勉強時間</label>
              <input type="number" />
              <label htmlFor="">課題番号</label>
              <input type="number" />
              <label htmlFor="">勉強中の言語(2つまで)</label>
              <input type="text" />
              <label htmlFor="">ハピネススコア</label>
              <input type="number" />

              <label htmlFor="">実務経験年数</label>
              <input type="number" />
              <label htmlFor="">現場で使っている言語(2つまで)</label>
              <input type="text" />
              <label htmlFor="">担当できる課題番号初め</label>
              <input type="number" />
              <label htmlFor="">担当できる課題番号終わり</label>
              <input type="number" />

              <input type="submit" value="登録" />
            </form>
          </div>
          <button onClick={closeModal}>閉じる</button>
        </div>
      </Modal>
    </div>
  );
};
