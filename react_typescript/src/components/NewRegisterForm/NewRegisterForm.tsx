import { useState } from "react";
import { SubmitHandler, useFieldArray } from "react-hook-form";
import Modal from "react-modal";
import { MentorDataType } from "../../type/MentorDataType";
import { StudentDataType } from "../../type/StudentDataType";
import { useSetRecoilState } from "recoil";
import { userListDataSelector } from "../../Atoms/UserListData";
import { NewRegisterInputType, useMyForm } from "./schema";
import styled from "styled-components";
import { Button } from "../../common/Button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
  },
};

const PositionDiv = styled.div`
  justify-content: center;
`;

const H1 = styled.h1`
  margin: 0 auto 20px;
  text-align: center;
`;

const CustomInput = styled.input`
  margin-top: 4px;
  border: 1px solid black;
`;

const CustomDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CustomDiv2 = styled.div`
  margin-left: 20px;
`;

const CustomDiv3 = styled.div`
  margin-top: 2px;
  margin-left: 10px;
`;

const CustomDiv4 = styled.div`
  display: flex;
`;

const CustomButton = styled.button`
  background-color: transparent;
  border: none;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const FormWrapper = styled.div`
  display: flex;
`;

const RegisterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Register = styled.input`
  background-color: #ff6b3a;
  color: white;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid "FF6B3A";
`;

const AdditionalButton = styled.button`
  margin-top: 1.5px;
  color: white;
  background-color: #659ad2;
  border-radius: 3px;
`;

const Label = styled.label`
  margin-top: 4px;
`;

// react-modalの使用
Modal.setAppElement("#root");

export const NewRegisterForm = () => {
  // モーダルオープン・クローズの状態管理
  const [modalIsOpen, setIsOpen] = useState(false);
  const setUserListData = useSetRecoilState(userListDataSelector);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
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
        score: formData.score ?? null,
        studyMinutes: formData.studyMinutes ?? null,
        taskCode: formData.taskCode ?? null,
        studyLangs:
          formData.studyLangs?.filter(
            (lang): lang is string => lang != undefined
          ) || [],
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

  console.log({ roleType });
  console.log({ errors });

  return (
    <PositionDiv>
      <Button $primary onClick={openModal}>
        新規登録
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="MewRegistrationModal"
      >
        <div>
          <CustomDiv>
            <CustomButton onClick={closeModal}>
              <img
                src="../../../public/closeIcon.svg"
                alt="閉じるボタン"
                height="25"
                width="25"
              />
              <br />
            </CustomButton>
          </CustomDiv>
          <div>
            <H1>新規登録</H1>
          </div>
          <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormWrapper>
                <div>
                  <label htmlFor="name">名前</label>
                  <br />
                  <CustomInput type="text" {...register("name")} />
                  <div>{errors.name?.message}</div>

                  <InputContainer>
                    <label htmlFor="role">ロール</label>
                    <br />
                    <CustomDiv4>
                      <CustomInput
                        type="radio"
                        value="student"
                        {...register("role")}
                      />
                      <Label>生徒</Label>
                      <CustomDiv3>
                        <CustomInput
                          type="radio"
                          value="mentor"
                          {...register("role")}
                        />
                        <Label>先生</Label>
                      </CustomDiv3>
                    </CustomDiv4>
                    {/* <br /> */}
                    <div>{errors.role?.message}</div>
                  </InputContainer>

                  <InputContainer>
                    <label htmlFor="email">メールアドレス</label>
                    <br />
                    <CustomInput type="email" {...register("email")} />
                    <div>{errors.email?.message}</div>
                  </InputContainer>
                  <InputContainer>
                    <label htmlFor="age">年齢</label>
                    <br />
                    <CustomInput type="number" {...register("age")} />
                    <div>{errors.age?.message}</div>
                  </InputContainer>

                  <InputContainer>
                    <label htmlFor="postCode">郵便番号</label>
                    <br />
                    <CustomInput type="text" {...register("postCode")} />
                    <div>{errors.postCode?.message}</div>
                  </InputContainer>

                  <InputContainer>
                    <label htmlFor="phone">電話番号(ハイフンなし)</label>
                    <br />
                    <CustomInput type="text" {...register("phone")} />
                    <div>{errors.phone?.message}</div>
                  </InputContainer>
                </div>

                <CustomDiv2>
                  <div>
                    <label htmlFor="hobbies">趣味(3つまで)</label>
                    {hobbiesFields.map((field, index) => (
                      <div key={field.id}>
                        <CustomInput
                          type="text"
                          {...register(`hobbies.${index}` as const)}
                          placeholder={`趣味 ${index + 1}`}
                        />
                        <AdditionalButton
                          type="button"
                          onClick={() => removeHobby(index)}
                          disabled={hobbiesFields.length <= 1}
                        >
                          削除
                        </AdditionalButton>
                      </div>
                    ))}
                    {hobbiesFields.length < 3 && (
                      <>
                        <br />
                        <AdditionalButton
                          type="button"
                          onClick={() => appendHobby("")}
                        >
                          趣味を追加
                        </AdditionalButton>
                        <div>{errors.hobbies?.message}</div>
                      </>
                    )}
                  </div>

                  <InputContainer>
                    <label htmlFor="url">URL</label>
                    <br />
                    <CustomInput type="text" {...register("url")} />
                    <div>{errors.url?.message}</div>
                  </InputContainer>

                  <InputContainer>
                    {roleType === "mentor" && (
                      <>
                        <label htmlFor="experienceDays">実務経験年数</label>
                        <CustomInput
                          type="number"
                          {...register("experienceDays")}
                        />
                        <div>{errors.experienceDays?.message}</div>
                        <label htmlFor="useLangs">
                          現場で使っている言語(2つまで)
                        </label>
                        {useLangsFields.map((field, index) => (
                          <div key={field.id}>
                            <CustomInput
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
                            <AdditionalButton
                              type="button"
                              onClick={() => appendUseLang("")}
                            >
                              言語を追加
                            </AdditionalButton>
                            <div>{errors.useLangs?.message}</div>
                          </>
                        )}

                        <label htmlFor="availableStartCode">
                          担当できる課題番号初め
                        </label>
                        <CustomInput
                          type="number"
                          {...register("availableStartCode")}
                        />
                        <div>{errors.availableStartCode?.message}</div>
                        <label htmlFor="availableEndCode">
                          担当できる課題番号終わり
                        </label>
                        <CustomInput
                          type="number"
                          {...register("availableEndCode")}
                        />
                        <div>{errors.availableEndCode?.message}</div>
                      </>
                    )}
                  </InputContainer>

                  <InputContainer>
                    {roleType === "student" && (
                      <>
                        <InputContainer>
                          <label htmlFor="studyMinutes">勉強時間（分）</label>
                          <br />
                          <CustomInput
                            type="number"
                            {...register("studyMinutes")}
                          />
                          <div>{errors.studyMinutes?.message}</div>
                        </InputContainer>
                        <InputContainer>
                          <label htmlFor="taskCode">課題番号</label>
                          <br />
                          <CustomInput
                            type="number"
                            {...register("taskCode")}
                          />
                          <div>{errors.taskCode?.message}</div>
                        </InputContainer>
                        <InputContainer>
                          <label htmlFor="studyLangs">
                            勉強中の言語(2つまで)
                          </label>
                          {studyLangsFields.map((field, index) => (
                            <div key={field.id}>
                              <CustomInput
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
                              <br />
                              <AdditionalButton
                                type="button"
                                onClick={() => appendStudyLang("")}
                              >
                                言語を追加
                              </AdditionalButton>
                              <div>{errors.studyLangs?.message}</div>
                            </>
                          )}
                        </InputContainer>
                        <InputContainer>
                          <label htmlFor="score">ハピネススコア</label>
                          <br />
                          <CustomInput type="number" {...register("score")} />
                          <div>{errors.score?.message}</div>
                        </InputContainer>
                      </>
                    )}
                  </InputContainer>
                </CustomDiv2>
              </FormWrapper>
              <RegisterButtonContainer>
                <Register type="submit" value="登録" />
              </RegisterButtonContainer>
            </form>
          </FormContainer>
        </div>
      </Modal>
    </PositionDiv>
  );
};
