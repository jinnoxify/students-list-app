import Form from "components/Form";
import { FC } from "react";
import styles from "./styles.module.scss";

const AddStudent: FC = () => {
  return (
    <div className={styles.container}>
      <Form />
    </div>
  );
};

export default AddStudent;
