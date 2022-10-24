import {useEffect, useRef, useState} from "react";
import {DataGrid, GridCellEditStopReasons, useGridApiRef} from '@mui/x-data-grid';
import axios from "axios";
import {BASE_URL} from "../config/Constants";
import {
    studentColumns,
    StudentsMapper,
    validateAge,
    validateEmail,
    validateName,
    validatePhoneNumber
} from "../config/DataMapper";
import StudentModal from "./modal/StudentModal";
import {updateStudent} from "../middleware/DataRequest";

export default function StudentTable(props) {

    const [students, setStudents] = useState([]);
    const [error, setError] = useState(false);

    const validateFields = (field, value) => {
        // to cater drop down menu's content
        console.log("validating !")
        let isValid = false;

        switch (field) {
            case "email": {
                isValid = validateEmail(value)
                break
            }
            case "phone" : {
                isValid = validatePhoneNumber(value)
                break
            }
            case "studentName": {
                isValid = validateName(value)
                break
            }
            case "age" : {
                isValid = validateAge(value)
                break
            }
            default : {
            }

        }
        if (isValid) {
            setError(false)
        } else {
            setError(true)
        }

    }

    const onCommit = ({field, value, id, reason}) => {
        validateFields(field, value)
        if(reason === GridCellEditStopReasons.enterKeyDown)
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
                      columns={studentColumns}
                      stickyHeader
                      editMode="cell"
                      disableIgnoreModificationsIfProcessingProps
                      //onCellEditStop={(p, e) => onEditStop(p, e)}
                      onCellEditCommit={onCommit}
                      experimentalFeatures={{newEditingApi: true, preventCommitWhileValidating: false}}
            />
        </div>
    )


}

