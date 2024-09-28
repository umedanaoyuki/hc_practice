import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { NewRegisterInputType } from "../type/NewRegisterInputType";
import styled from "styled-components";
import { MentorDataType } from "../type/MentorDataType";
import { StudentDataType } from "../type/StudentDataType";
import { useSetRecoilState } from "recoil";
import { userListDataAtom } from "../Atoms/UserListData";

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

type UserListData = {
  userListData: (MentorDataType | StudentDataType)[];
};

export const NewRegisterForm = ({ userListData }: UserListData) => {
  let subtitle: { style: { color: string } };

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
  } = useForm<NewRegisterInputType>({
    defaultValues: {
      id: undefined,
      password: "",
      name: "",
      email: "",
      role: "",
      age: undefined,
      postCode: "",
      phone: "",
      hobbies: [],
      url: "",
      studyMinutes: undefined,
      taskCode: undefined,
      taskLangs: undefined,
      score: undefined,
      experienceDays: undefined,
      useLangs: [],
      availableStartCode: undefined,
      availableEndCode: undefined,
    },
  });

  const setUserListData = useSetRecoilState(userListDataAtom);

  const onSubmit: SubmitHandler<NewRegisterInputType> = (data) => {
    const newUser = {
      ...data,
    } as StudentDataType | MentorDataType;

    setUserListData((prevUserListData) => [...prevUserListData, newUser]);
    closeModal();
    reset();
  };

  // const [seleced, isSelected] = useState("");

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
        <div>
          <div>
            <h1>新規登録</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="id">アカウントID</label>
              <input {...register("id", { required: true })} />
              {errors.password && (
                <p className="">アカウントIDを入力してください</p>
              )}
              <label htmlFor="password">パスワード</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && <p>パスワードを入力してください</p>}
              {/* ラジオボタン */}
              <label htmlFor="role">ロール</label>
              <div>
                <input
                  type="radio"
                  value="student"
                  {...register("role", { required: true })}
                />
                <label htmlFor="">生徒</label>
                <input
                  type="radio"
                  value="mentor"
                  {...register("role", { required: true })}
                />
                <label htmlFor="">先生</label>
              </div>
              <label htmlFor="name">名前</label>
              <input type="text" {...register("name", { required: true })} />
              <label htmlFor="email">メールアドレス</label>
              <input type="email" {...register("email", { required: true })} />
              <label htmlFor="age">年齢</label>
              <input type="number" {...register("age", { required: true })} />
              <label htmlFor="postCode">郵便番号</label>
              <input
                type="number"
                {...register("postCode", { required: true })}
              />
              <label htmlFor="phone">電話番号</label>
              <input type="number" {...register("phone", { required: true })} />
              <label htmlFor="hobbies">趣味(3つまで)</label>
              <input type="text" {...register("hobbies", { required: true })} />
              <label htmlFor="url">URL</label>
              <input type="text" {...register("url", { required: true })} />

              <label htmlFor="studyMinutes">勉強時間</label>
              <input
                type="number"
                {...register("studyMinutes", { required: true })}
              />
              <label htmlFor="taskCode">課題番号</label>
              <input
                type="number"
                {...register("taskCode", { required: true })}
              />
              <label htmlFor="taskLangs">勉強中の言語(2つまで)</label>
              <input
                type="text"
                {...register("taskLangs", { required: true })}
              />
              <label htmlFor="score">ハピネススコア</label>
              <input type="number" {...register("score", { required: true })} />

              <label htmlFor="experienceDays">実務経験年数</label>
              <input
                type="number"
                {...register("experienceDays", { required: true })}
              />
              <label htmlFor="useLangs">現場で使っている言語(2つまで)</label>
              <input
                type="text"
                {...register("useLangs", { required: true })}
              />
              <label htmlFor="availableStartCode">担当できる課題番号初め</label>
              <input
                type="number"
                {...register("availableStartCode", { required: true })}
              />
              <label htmlFor="availableEndCode">担当できる課題番号終わり</label>
              <input
                type="number"
                {...register("availableEndCode", { required: true })}
              />

              <input type="submit" value="登録" />
            </form>
          </div>
          <button onClick={closeModal}>閉じる</button>
        </div>
      </Modal>
    </div>
  );
};
