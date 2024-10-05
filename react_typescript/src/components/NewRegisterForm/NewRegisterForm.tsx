import { useState } from "react";
import { SubmitHandler, useFieldArray } from "react-hook-form";
import Modal from "react-modal";
// import styled from "styled-components";
import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";
import { useSetRecoilState } from "recoil";
import { userListDataSelector } from "../../Atoms/UserListData";
import { NewRegisterInputType, useMyForm } from "./schema";

// const StyledLoginPageWrapper = styled.div`
//   text-align: center;
//   color: white;
//   line-height: 2;
//   text-align: left;
//   display: block;
//   margin-bottom: 13px;
//   margin-top: 20px;
//   font-size: 14px;
//   font-weight: 200;
// `;

// const StyledLoginTitleContainer = styled.div`
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const StyledForm = styled.form`
//   max-width: 500px;
//   margin: 0 auto;
// `;

// const StyledFormWrapper = styled.div`
//   background: #0e101c;
//   max-width: 400px;
//   margin: 0 auto;
// `;

// const StyledLabel = styled.label`
//   line-height: 2;
//   text-align: left;
//   display: block;
//   margin-bottom: 13px;
//   margin-top: 20px;
//   color: white;
//   font-size: 14px;
//   font-weight: 200;
// `;

// const StyledInput = styled.input`
//   display: block;
//   box-sizing: border-box;
//   width: 100%;
//   border-radius: 4px;
//   border: 1px solid white;
//   padding: 10px 15px;
//   margin-bottom: 10px;
//   font-size: 14px;

//   &:disabled {
//     opacity: 0.4;
//   }

//   &[type="submit"] {
//     background: #ec5990;
//     color: white;
//     text-transform: uppercase;
//     border: none;
//     margin-top: 40px;
//     padding: 15px;
//     font-size: 16px;
//     font-weight: 100;
//     letter-spacing: 5px;

//     &:hover {
//       background: #bf1650;
//     }

//     &:active {
//       transition: 0.3s all;
//       transform: translateY(3px);
//       border: 1px solid transparent;
//       opacity: 0.8;
//     }
//   }
// `;

// const StyledErrorMessage = styled.p`
//   color: #bf1650;

//   &::before {
//     display: inline;
//     content: "⚠ ";
//   }
// `;

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

// react-modalの使用
Modal.setAppElement("#root");

// type UserListData = {
//   userListData: (MentorDataType | StudentDataType)[];
// };

export const NewRegisterForm = () => {
  // let subtitle: { style: { color: string } };

  // モーダルオープン・クローズの状態管理
  const [modalIsOpen, setIsOpen] = useState(false);
  const setUserListData = useSetRecoilState(userListDataSelector);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    // console.log("モーダル閉じる");
    setIsOpen(false);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useMyForm();

  const roleType = watch("role");

  const {
    fields: hobbiesFields,
    append: appendHobby,
    remove: removeHobby,
  } = useFieldArray({
    control,
    name: "hobbies",
  });

  const {
    fields: studyLangsFields,
    append: appendStudyLang,
    remove: removeStudyLang,
  } = useFieldArray({
    control,
    name: "studyLangs",
  });

  const {
    fields: useLangsFields,
    append: appendUseLang,
    remove: removeUseLang,
  } = useFieldArray({
    control,
    name: "useLangs",
  });

  const onSubmit: SubmitHandler<NewRegisterInputType> = (formData) => {
    console.log("formData出力");
    console.log({ formData });

    try {
      const commonData = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        age: formData.age,
        postCode: formData.postCode,
        phone: formData.phone,
        hobbies:
          formData.hobbies?.filter(
            (lang): lang is string => lang != undefined
          ) || [],
        url: formData.url,
      };

      const cleanedFormData = {
        ...commonData,
        studyMinutes: formData.studyMinutes ?? null,
        taskCode: formData.taskCode ?? null,
        studyLangs:
          formData.studyLangs?.filter(
            (lang): lang is string => lang != undefined
          ) || [],
        score: formData.score ?? null,
        experienceDays: formData.experienceDays ?? null,
        useLangs:
          formData.useLangs?.filter(
            (lang): lang is string => lang != undefined
          ) || [],
        availableStartCode: formData.availableStartCode ?? null,
        availableEndCode: formData.availableEndCode ?? null,
      };

      if (cleanedFormData.role === "student") {
        const newUser = {
          ...cleanedFormData,
          studyMinutes: cleanedFormData.studyMinutes,
          taskCode: cleanedFormData.taskCode,
          studyLangs: cleanedFormData.studyLangs,
          score: cleanedFormData.score,
        } as StudentDataType;

        setUserListData((prevUserListData) => [...prevUserListData, newUser]);
        closeModal();
        reset();
      } else {
        const newUser = {
          ...cleanedFormData,
          experienceDays: cleanedFormData.experienceDays,
          useLangs: cleanedFormData.useLangs,
          availableStartCode: cleanedFormData.availableStartCode,
          availableEndCode: cleanedFormData.availableEndCode,
        } as MentorDataType;

        setUserListData((prevUserListData) => [...prevUserListData, newUser]);
        closeModal();
        reset();
      }
    } catch {
      console.log(errors);
    }
  };

  // const onerror = (err) => console.log(err);

  console.log({ errors });

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
              <label htmlFor="name">名前</label>
              <input type="text" {...register("name")} />
              <div>{errors.name?.message}</div>
              <label htmlFor="role">ロール</label>
              <div>
                <input type="radio" value="student" {...register("role")} />
                <label htmlFor="">生徒</label>
                <input type="radio" value="mentor" {...register("role")} />
                <label htmlFor="">先生</label>
              </div>
              <div>{errors.role?.message}</div>
              <label htmlFor="email">メールアドレス</label>
              <input type="email" {...register("email")} />
              <div>{errors.email?.message}</div>
              <label htmlFor="age">年齢</label>
              <input type="number" {...register("age")} />
              <div>{errors.age?.message}</div>
              <label htmlFor="postCode">郵便番号</label>
              <input type="number" {...register("postCode")} />
              <div>{errors.postCode?.message}</div>
              <label htmlFor="phone">電話番号</label>
              <input type="number" {...register("phone")} />
              <div>{errors.phone?.message}</div>
              <label htmlFor="hobbies">趣味(3つまで)</label>
              {hobbiesFields.map((field, index) => (
                <div key={field.id}>
                  <input
                    type="text"
                    {...register(`hobbies.${index}` as const)}
                    placeholder={`趣味 ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeHobby(index)}
                    disabled={hobbiesFields.length <= 1}
                  >
                    削除
                  </button>
                </div>
              ))}
              {hobbiesFields.length < 3 && (
                <>
                  <button type="button" onClick={() => appendHobby("")}>
                    趣味を追加
                  </button>
                  <div>{errors.hobbies?.message}</div>
                </>
              )}

              <label htmlFor="url">URL</label>
              <input type="text" {...register("url")} />
              <div>{errors.url?.message}</div>

              {roleType === "student" && (
                <>
                  <label htmlFor="studyMinutes">勉強時間</label>
                  <input type="number" {...register("studyMinutes")} />
                  <div>{errors.studyMinutes?.message}</div>
                  <label htmlFor="taskCode">課題番号</label>
                  <input type="number" {...register("taskCode")} />
                  <div>{errors.taskCode?.message}</div>
                  <label htmlFor="studyLangs">勉強中の言語(2つまで)</label>
                  {studyLangsFields.map((field, index) => (
                    <div key={field.id}>
                      <input
                        type="text"
                        {...register(`studyLangs.${index}` as const)}
                        placeholder={`言語 ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeStudyLang(index)}
                        disabled={studyLangsFields.length <= 1}
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  {studyLangsFields.length < 2 && (
                    <>
                      <button type="button" onClick={() => appendStudyLang("")}>
                        言語を追加
                      </button>
                      <div>{errors.studyLangs?.message}</div>
                    </>
                  )}
                  <label htmlFor="score">ハピネススコア</label>
                  <input type="number" {...register("score")} />
                  <div>{errors.score?.message}</div>
                </>
              )}

              {roleType === "mentor" && (
                <>
                  <label htmlFor="experienceDays">実務経験年数</label>
                  <input type="number" {...register("experienceDays")} />
                  <div>{errors.experienceDays?.message}</div>
                  <label htmlFor="useLangs">
                    現場で使っている言語(2つまで)
                  </label>
                  {useLangsFields.map((field, index) => (
                    <div key={field.id}>
                      <input
                        type="text"
                        {...register(`useLangs.${index}` as const)}
                        placeholder={`言語 ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeUseLang(index)}
                        disabled={useLangsFields.length <= 1}
                      >
                        削除
                      </button>
                    </div>
                  ))}
                  {useLangsFields.length < 2 && (
                    <>
                      <button type="button" onClick={() => appendUseLang("")}>
                        言語を追加
                      </button>
                      <div>{errors.useLangs?.message}</div>
                    </>
                  )}

                  <label htmlFor="availableStartCode">
                    担当できる課題番号初め
                  </label>
                  <input type="number" {...register("availableStartCode")} />
                  <div>{errors.availableStartCode?.message}</div>
                  <label htmlFor="availableEndCode">
                    担当できる課題番号終わり
                  </label>
                  <input type="number" {...register("availableEndCode")} />
                  <div>{errors.availableEndCode?.message}</div>
                </>
              )}

              <input type="submit" value="登録" />
            </form>
          </div>
          <button onClick={closeModal}>閉じる</button>
        </div>
      </Modal>
    </div>
  );
};
