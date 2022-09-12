import axios from "axios";
import { Student } from "../models/student";

const STUDENT_API_BASE_URL = "https://retoolapi.dev/1q052p/data";

class StudentsService {
  getStudents() {
    return axios.get(STUDENT_API_BASE_URL);
  }

  createStudent(student: Student) {
    return axios.post(STUDENT_API_BASE_URL, student);
  }

  getStudentById(studentId: number) {
    return axios.get(STUDENT_API_BASE_URL + "/" + studentId);
  }

  updateStudent(student: Student, studentId: number) {
    return axios.put(STUDENT_API_BASE_URL + "/" + studentId, student);
  }

  deleteStudent(studentId: number) {
    return axios.delete(STUDENT_API_BASE_URL + "/" + studentId);
  }

  searchStudent(Student: string) {
    return axios.get(STUDENT_API_BASE_URL, { params: { Student } });
  }
}

export default new StudentsService();
