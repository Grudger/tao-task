import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, FormControl, MenuItem, Modal, TextField} from "@mui/material";
import {validationSchema} from "../../config/DataMapper";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

export default function StudentModal({refreshData}) {
  const initialState = {
    studentName: null,
    studentNameError: true,
    email: null,
    emailError: true,
    phone: null,
    phoneError: true,
    mobile: null,
    mobileError: true,
    dob: null,
    dobError: true,
    gender: "F",
    genderError: true,
    address: null,
    addressError: true,
    disableSave: true
  }

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState(initialState)

  // reset errors if re-using form
  useEffect(() => {
    //setFormData(initialState)
  })


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    refreshData();
    setOpen(false)
  }

  const handleChange = (e, field) => {
    const value = e.target.value

    const validator = validationSchema[field];
    const isValid = validator(value)

    setFormData({
      ...formData,
      [field]: value,
      [field + "Error"]: !isValid,
      disableSave: saveDisabled()
    })

  }

  const saveDisabled = () => {
    let disabled = true;
    //separate errors to unlock save button
    Object.keys(formData).filter(key => {
      disabled = disabled && formData[key]
    })
    console.log("evaluated errors", disabled)
    return disabled;
  }

  const genders = [
    {value: 'M', label: 'Male'},
    {value: 'F', label: 'Female'}
  ]

  return (
    <>
      <Button onClick={handleOpen}>Add Row</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={{'& > :not(style)': {m: 1, gap:1} }}
          noValidate
          autoComplete="off"
        >

          <FormControl
            variant={"standard"}
            /*onChange={(e) => handleChange(e)}*/
            sx={style}
            /*error={!formData.disableSave}*/
          >
            <h3>Enter the new student information please</h3>
            <br/>
            <TextField error={formData["studentNameError"]} label={'Student Name'} id={'studentName'} required={true}
                       onChange={e => {
                         handleChange(e, "studentName")
                       }}/>
            <br/>
            <TextField error={formData["emailError"]} label={'E-mail Address'} id={'email'} required={true}
                       onChange={e => {
                         handleChange(e, "email")
                       }}/>
            <br/>
            <TextField error={formData["addressError"]} label={'Address'} id={'address'} required={true}
                       onChange={e => {
                         handleChange(e, "address")
                       }}/>
            <br/>
            <TextField error={formData["phoneError"]} label={'Phone Number'} id={'phone'} required={true}
                       onChange={e => {
                         handleChange(e, "phone")
                       }}/>
            <br/>
            <TextField error={formData["mobileError"]} label={'Mobile Number'} id={'mobile'} required={true}
                       onChange={e => {
                         handleChange(e, "mobile")
                       }}/>
            <br/>
            <TextField
              id={'dob'}
              type={'date'}
              label={'Date of Birth'}
              format={'dd/MM/yyyy'}
              error={formData["dobError"]}
              required={true}
              InputLabelProps={{shrink: true}}
              onChange={e => {
                handleChange(e, "dob")
              }}/>
            <br/>
            <TextField id={'gender'}
                       select
                       value={formData["gender"]}
                       onChange={e => {
                         handleChange(e, "gender")
                       }}
                       label={'Gender'}
                       error={formData["genderError"]}
                       required={true}>
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br/>
            <Button onClick={handleSave} disabled={formData["disableSave"] === true}>Save</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </FormControl>
        </Box>
      </Modal>
    </>)
}