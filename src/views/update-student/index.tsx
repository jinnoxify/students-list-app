import Form from "components/Form";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { Student } from "models/student";
import studentsServices from "services/students-services";

const UpdateStudent: FC = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<Student>({} as Student);
  useEffect(() => {
    studentsServices.getStudentById(Number(id)).then((res) => {
      setStudent(res.data);
    });
  }, [id]);
  return (
    <div className={styles.container}>
      <Form values={student} />
    </div>
  );
};

export default UpdateStudent;
