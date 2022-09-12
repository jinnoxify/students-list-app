import { Student } from "models/student";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import studentsServices from "services/students-services";

function useStudents(): [
  Student[],
  Dispatch<SetStateAction<Student[]>>,
  () => void
] {
  const [students, setStudents] = useState<Student[]>([]);
  const getData = () => {
    studentsServices.getStudents().then((res) => {
      setStudents(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return [students, setStudents, getData];
}

export default useStudents;
