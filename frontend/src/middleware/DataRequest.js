import axios from "axios";
import {BASE_URL} from "../config/Constants";
import {StudentsMapper} from "../config/DataMapper";

export const getAllStudents = () => axios.get(BASE_URL + "/listAll").then((response, error) => {
  if (response) {
    return (
      {students: StudentsMapper((response, error).data), error: false})
  } else {
    console.log(error)
    return {students: [], error: false}
  }
})

export const updateStudent = (body, id) => axios.patch(BASE_URL + "/update/" + id, body).then((response, error) => {
  if (error)
    console.log(error)
    }
)

export const deleteStudent = (id) => axios.delete(BASE_URL + "/delete/" + id).then((response, error) => {
    if (error)
      console.log(error)
  }
)

export const addStudent = (body) => axios.post(BASE_URL + "/add", body).then((response, error) => {
    if (error)
      console.log(error)
  }
)
