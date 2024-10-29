export type NewRegisterInputType = {
  id: number;
  name: string;
  email: string;
  role: "student" | "mentor";
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  studyMinutes?: number;
  taskCode?: number;
  studyLangs?: string[];
  score?: number;
  experienceDays?: number;
  useLangs?: string[];
  availableStartCode?: number;
  availableEndCode?: number;
};
