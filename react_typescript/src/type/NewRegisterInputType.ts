export type NewRegisterInputStudentType = {
  id: number;
  name: string;
  email: string;
  role: "student";
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
};

export type NewRegisterInputMentorType = {
  id: number;
  name: string;
  email: string;
  role: "mentor";
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
};
