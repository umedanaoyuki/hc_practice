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
