export type MentorDataType = {
  id: number;
  name: string;
  role: "mentor";
  email: string;
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
