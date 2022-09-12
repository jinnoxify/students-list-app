import { FC, useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import cx from "classnames";
import Header from "components/Header";
import { RouteList } from "models/route-list";
import StudentList from "views/student-list";
import AddStudent from "views/update-student";
import StudentDetails from "views/student-details";
import UpdateStudent from "views/update-student";
import { StudentsContext } from "context/StudentsContext";
import useStudents from "hooks/use-students";

const App: FC = () => {
  const { pathname } = useLocation();
  const [displayLocation, setDisplayLocation] = useState(pathname);
  const [students, setStudents, getData] = useStudents();
  const [transitionStage, setTransistionStage] = useState("fadeIn");
  useEffect(() => {
    if (pathname !== displayLocation) setTransistionStage("fadeOut");
  }, [pathname, displayLocation]);
  return (
    <StudentsContext.Provider value={{ students, setStudents, getData }}>
      <div
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(pathname);
          }
        }}
        className={cx("app", `${transitionStage}`)}
      >
        <Header />
        <Routes location={displayLocation}>
          <Route path={RouteList.ROOT} element={<StudentList />} />
          <Route path={RouteList.ADD} element={<AddStudent />} />
          <Route path={RouteList.UPDATE} element={<UpdateStudent />} />
          <Route path={RouteList.DETAILS} element={<StudentDetails />} />
        </Routes>
      </div>
    </StudentsContext.Provider>
  );
};

export default App;
