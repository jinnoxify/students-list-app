import Loader from "components/Loader";
import { StudentsContext } from "context/StudentsContext";
import { RouteList } from "models/route-list";
import { Student } from "models/student";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import studentsServices from "services/students-services";

const Form: FC<{ values?: Student }> = ({ values }) => {
  const [student, setStudent] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const { pathname } = useLocation();
  const { getData } = useContext(StudentsContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const isAddView = pathname === RouteList.ADD;
  useEffect(() => {
    if (values)
      if (Object.keys(values).length > 0) {
        setStudent(values.Student);
        setIndustry(values.Industry);
        setInterests(values.Interests);
        setCity(values.City);
      }
  }, [values]);

  const add = (e: any) => {
    setLoading(true);
    e.preventDefault();
    studentsServices
      .createStudent({
        Student: student,
        City: city,
        Interests: interests,
        Industry: industry,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/");
          getData();
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setLoading(true);
  };

  const update = (e: any) => {
    setLoading(true);
    e.preventDefault();
    studentsServices
      .updateStudent(
        {
          Student: student,
          City: city,
          Interests: interests,
          Industry: industry,
        },
        Number(id)
      )
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          getData();
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setLoading(true);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3>{isAddView ? "Add student" : "Update student"}</h3>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label> Student: </label>
                <input
                  placeholder="Student"
                  name="Student"
                  className="form-control"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> City: </label>
                <input
                  placeholder="City"
                  name="City"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Industry: </label>
                <input
                  placeholder="Industry"
                  name="Industry"
                  className="form-control"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Interests: </label>
                <input
                  placeholder="Interests"
                  name="Interests"
                  className="form-control"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>

              <button
                disabled={
                  loading ||
                  student === "" ||
                  city === "" ||
                  interests === "" ||
                  industry === ""
                }
                className="btn btn-success"
                onClick={isAddView ? add : update}
              >
                {loading ? <Loader /> : isAddView ? "Save" : "Update"}
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="btn btn-danger"
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
