import { Student } from "models/student";
import { useEffect, useState } from "react";
import { FC } from "react";
import studentsServices from "services/students-services";
import styles from "./styles.module.scss";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const StudentDetails: FC = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<Student>({} as Student);
  useEffect(() => {
    studentsServices.getStudentById(Number(id)).then((res) => {
      setStudent(res.data);
    });
  }, [id]);

  return (
    <div className={styles.container}>
      {Object.keys(student).length === 0 ? (
        <div className="audio-loader-container">
          <Audio
            height="80"
            width="80"
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <div>
          <br></br>
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center pt-2"> View Student Details</h3>
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <div className={styles.row}>
                  <label>
                    <strong>ID:</strong>
                  </label>
                  <div> {student.id}</div>
                </div>
                <div className={styles.row}>
                  <label>
                    <strong>Student:</strong>
                  </label>
                  <div> {student.Student}</div>
                </div>
                <div className={styles.row}>
                  <label>
                    <strong>City:</strong>
                  </label>
                  <div> {student.City}</div>
                </div>
                <div className={styles.row}>
                  <label>
                    <strong>Industry:</strong>
                  </label>
                  <div> {student.Industry}</div>
                </div>
                <div className={styles.row}>
                  <label>
                    <strong>Interests:</strong>
                  </label>
                  <div> {student.Interests}</div>
                </div>
              </div>
              <img
                src="https://marketmusclescdn.nyc3.digitaloceanspaces.com/wp-content/uploads/sites/674/2022/05/18153831/usericon.png"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
