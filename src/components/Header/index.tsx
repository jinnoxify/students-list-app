import { FC, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useNavigate } from "react-router-dom";
import studentsServices from "services/students-services";
import { StudentsContext } from "context/StudentsContext";

const Header: FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);
  const { setStudents } = useContext(StudentsContext);
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (input !== "") {
      studentsServices.searchStudent(input).then((res) => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            setNoResults(true);
            return;
          }
          setStudents(res.data);
          setInput("");
        }
      });
    }
  };
  useEffect(() => {
    if (noResults) {
      setTimeout(() => {
        setNoResults(false);
        setInput("");
      }, 3000);
    }
  }, [noResults]);
  return (
    <>
      <header className={styles.container}>
        <img
          onClick={() => navigate("/")}
          src="https://www.pngitem.com/pimgs/m/248-2484502_custom-icons-marc-engle-student-logo-transparent-background.png"
          alt="logo"
        />
        <form className={styles.input} onSubmit={onSubmit}>
          <PersonSearchIcon />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search..."
          />
        </form>
      </header>
      {noResults && (
        <div className="alert alert-primary" role="alert">
          No student found with that name. Please try again putting the full
          exact name.
        </div>
      )}
    </>
  );
};

export default Header;
