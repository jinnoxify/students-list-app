import { Student } from "models/student";
import { createContext, Dispatch, SetStateAction } from "react";

interface StudentsContextModel {
  students: Student[];
  setStudents: Dispatch<SetStateAction<Student[]>>;
  getData: () => void;
}

export const StudentsContext = createContext<StudentsContextModel>(
  {} as StudentsContextModel
);
