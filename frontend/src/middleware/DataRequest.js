import axios from "axios";
import {BASE_URL} from "../config/Constants";
import {StudentsMapper} from "../config/DataMapper";

export const getAllStudents = () => axios.get(BASE_URL + "/listAll").then(r => {
  if (r) {
    return (
      {students: StudentsMapper(r.data), error: false})
  } else {
    console.log('response in progress')
    return {students: [], error: false}
  }
})
