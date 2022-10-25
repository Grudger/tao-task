import {useEffect, useState} from "react";
import {DataGrid, GridCellEditStopReasons} from '@mui/x-data-grid';
import axios from "axios";
import {BASE_URL} from "../config/Constants";
import {studentColumns, StudentsMapper} from "../config/DataMapper";
import StudentModal from "./modal/StudentModal";
import {updateStudent} from "../middleware/DataRequest";

export default function StudentTable(props) {

  const [students, setStudents] = useState([]);
  const [error, setError] = useState(false);
  // export state function to column params for error
  const colDefs = studentColumns(setError)

  const onCommit = ({field, value, id, reason}) => {
    if (reason === GridCellEditStopReasons.enterKeyDown)
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
      {
        error && <h4 className={"invalid"}>Please input valid data</h4>
      }
      <DataGrid rows={students}
                columns={colDefs}
                stickyHeader
                editMode="cell"
                disableIgnoreModificationsIfProcessingProps
                onCellEditCommit={(p) => onCommit(p)}
                experimentalFeatures={{newEditingApi: true, preventCommitWhileValidating: false}}
      />
    </div>
  )


}

