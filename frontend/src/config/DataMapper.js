export function StudentsMapper(students) {
  students.map((s) => {
    const dob = new Date(s['dob'])
    s['id'] = s['studentId']
    s['dob'] = dob.getDate() + ' / ' + dob.getMonth() + ' / ' + dob.getFullYear()
    return s
  })
  return students;
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePhoneNumber = (phone) => {
  return String(phone)
      .match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
}

export const studentColumns = [
  {field: 'studentId', headerName: 'Student ID', width: 100},
  {field: 'studentName', headerName: 'Student Name', width: 150, editable: true},
  {field: 'gender', headerName: 'Gender', width: 150, editable: true, type: 'singleSelect', valueOptions: ['M', 'F']},
  {field: 'address', headerName: 'Address', width: 250, editable: true},
  {
    field: 'email', headerName: 'E-mail Address', width: 200, editable: true,
    preProcessEditCellProps: (params) => {
      const isValid = validateEmail(params.props.value) !== null;
      return {...params.props, error: isValid};
    }
  },
  {field: 'dob', headerName: 'DoB', width: 150, editable: true, type: 'date', format: 'dd/MM/yyyy'},
  {field: 'mobile', headerName: 'Mobile Number', width: 150, editable: true},
  {field: 'phone', headerName: 'Phone Number', width: 150, editable: true}
]