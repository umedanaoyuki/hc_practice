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
  studyLangs?: (string | undefined)[];
  score?: number;
  experienceDays?: number;
  useLangs?: (string | undefined)[];
  availableStartCode?: number;
  availableEndCode?: number;
};
