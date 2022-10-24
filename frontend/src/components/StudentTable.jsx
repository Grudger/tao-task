import {useEffect, useState} from "react";
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import axios from "axios";
import {BASE_URL} from "../config/Constants";
import {studentColumns, StudentsMapper, validateEmail} from "../config/DataMapper";
import StudentModal from "./modal/StudentModal";

export default function StudentTable(props) {

  const [students, setStudents] = useState([]);

  const apiRef = useGridApiRef();

  const onEdit = (p) => {
    console.log('params', p)
    if (p['field'] === 'email') {
      return validateEmail(p['value'])
    }
  }

  useEffect(() => {
    updateData()
  }, [])

  const updateData = () => {
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
      <StudentModal open={false} refreshData={updateData}/>

      <DataGrid rows={students}
                columns={studentColumns}
                stickyHeader
                editMode="row"
                apiRef={apiRef}
                disableIgnoreModificationsIfProcessingProps
                onRowEditStop={(params) => onEdit(params)}
                experimentalFeatures={{newEditingApi: true}}/>
    </div>
  )


}

