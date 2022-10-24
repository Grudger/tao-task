import {useEffect, useState} from "react";
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import axios from "axios";
import {BASE_URL} from "../config/Constants";
import {studentColumns, StudentsMapper} from "../config/DataMapper";
import StudentModal from "./modal/StudentModal";
import {updateStudent} from "../middleware/DataRequest";

export default function StudentTable(props) {

  const [students, setStudents] = useState([]);

  const apiRef = useGridApiRef();

  const onEdit = ({field, id}, event) => {
    const value = event.target.value ? event.target.value : event.target.textContent
    console.log('updating field ' + field, value)
    updateStudent({[field]: value}, id)

  }


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    console.log('updating Data')
    axios.get(BASE_URL + "/listAll").then(r => {
      if (r) {
        setStudents(StudentsMapper(r.data))
      } else
        console.log('response in progress')
    })
  }

  return (
    <div style={{height: 300, width: '100%'}}>
      <StudentModal open={false} refreshData={fetchData}/>

      <DataGrid rows={students}
                columns={studentColumns}
                stickyHeader
                editMode="cell"
                apiRef={apiRef}
                disableIgnoreModificationsIfProcessingProps
                onCellEditStop={(p, e) => onEdit(p, e)}
                experimentalFeatures={{newEditingApi: true}}/>
    </div>
  )


}

