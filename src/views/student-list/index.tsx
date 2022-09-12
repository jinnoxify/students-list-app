import { Student } from "models/student";
import { useContext, useState } from "react";
import { FC } from "react";
import studentsServices from "services/students-services";
import styles from "./styles.module.scss";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import { RouteList } from "models/route-list";
import { StudentsContext } from "context/StudentsContext";

const StudentList: FC = () => {
  const navigate = useNavigate();
  const { students, getData } = useContext(StudentsContext);

  return (
    <div className={styles.container}>
      {students.length === 0 ? (
        <div className="audio-loader-container">
          <Audio
            height="80"
            width="80"
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : (
        <>
          {" "}
          <h2 className="text-center">Students List</h2>
          <br></br>
          <div className={styles.row}>
            <button
              className="btn btn-info mb-2 btn-lg"
              onClick={() => navigate(RouteList.ADD)}
            >
              Add Student
            </button>
            <button
              className="btn btn-secondary mb-2 ml-2 btn-lg"
              onClick={getData}
            >
              Refresh
            </button>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> Student</th>
                    <th> City</th>
                    <th> Industry</th>
                    <th> Interests</th>
                    <th> Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(students as []).map((student: any) => (
                    <Tr key={student.id} student={student} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Tr: FC<{ student: Student; getData?: () => void }> = ({ student }) => {
  const { getData } = useContext(StudentsContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const details = (id?: number) => {
    navigate(`/details/${id}`);
  };
  const update = (id?: number) => {
    navigate(`/update/${id}`);
  };
  const remove = (id?: number) => {
    setLoading(true);
    setTimeout(function () {
      studentsServices
        .deleteStudent(Number(id))
        .then((res) => {
          if (res.status === 200) {
            getData();
            setLoading(false);
          }
        })
        .catch((error) => console.log(error));
    }, 5000);
  };
  return (
    <tr key={student.id}>
      <td> {student.Student} </td>
      <td> {student.City}</td>
      <td> {student.Industry}</td>
      <td> {student.Interests}</td>
      <td>
        <button onClick={() => update(student.id)} className="btn btn-primary">
          Update
        </button>
        <button
          style={{ marginLeft: "10px" }}
          className="btn btn-danger"
          onClick={() => {
            remove(student.id);
          }}
        >
          {loading ? <Loader /> : "Delete"}
        </button>
        <button
          style={{ marginLeft: "10px" }}
          className="btn btn-secondary"
          onClick={() => details(student.id)}
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default StudentList;
