import * as React from 'react';
import {Box, Button, Modal, MenuItem, FormControl, TextField} from "@mui/material";
import {useState} from "react";
import {validateEmail, validatePhoneNumber} from "../../config/DataMapper";

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

export default function StudentModal(props) {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(true)
    const [formData, setFormData] = useState({
        studentName: null,
        nameError: true,
        email: null,
        emailError: true,
        phone: null,
        phoneError: true,
        mobile: null,
        mobileError: true,
        dob: null,
        dobError: true,
        gender: null,
        genderError: true,
        address: null,
        addressError: true
    })
    const [errors, setErrors] = useState({
        nameError: true,
        emailError: true,
        phoneError: true,
        mobileError: true,
        dobError: true,
        genderError: true,
        addressError: true
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSave = () => {
        props.refreshData();
        setOpen(false)
    }

    const handleChange = (e) => {
        /*Object.keys(formData).map((k, i) => {*/
        //})
    }
    const genders = [
        {value: 'M', label: 'Male'},
        {value: 'F', label: 'Female'}
    ]
    const [gender, setGender] = useState('F');

    const genderSelect = (e) => {
        setGender(e.target.value)
        setFormData({...formData, gender: e.target.value})
        setErrors({...errors, genderError: false})
    }

    const onEmailChange = (e) => {
        setFormData({...formData, email: e.target.value})
        const value = e.target.value
        let isValid = false

        if (value) {
            isValid = validateEmail(value) !== null
        }
        if (isValid) {
            setErrors({...errors, emailError: false})
        }
    }

    const enableSaveButton = () => {

    }

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
                    sx={{'& > :not(style)': {m: 1},}}
                    noValidate
                    autoComplete="off"
                >

                    <FormControl
                        variant={"standard"}
                        onChange={(e) => handleChange(e)}
                        sx={style}
                        error={error}
                    >
                        <h3>Enter Student information please</h3>
                        <br/>
                        <TextField error={errors.nameError} label={'Student Name'} id={'studentName'} required={true}
                                   onChange={e => {
                                       setFormData({...formData, studentName: e.target.value})
                                       setErrors({...errors, nameError: false})
                                   }}/>
                        <br/>
                        <TextField error={errors.emailError} label={'E-mail Address'} id={'email'}
                                   onChange={onEmailChange} required={true}/>
                        <br/>
                        <TextField error={errors.addressError} label={'Address'} id={'address'} required={true}
                                   onChange={e => {
                                       setFormData({...formData, address: e.target.value})
                                       setErrors({...errors, addressError: false})
                                   }}/>
                        <br/>
                        <TextField error={errors.phoneError} label={'Phone Number'} id={'phone'} required={true}

                                   onChange={e => {
                                       setFormData({...formData, phone: e.target.value})
                                       if (validatePhoneNumber(e.target.value) !== null)
                                           setErrors({...errors, phoneError: false})
                                   }}/>
                        <br/>
                        <TextField error={errors.mobileError} label={'Mobile Number'} id={'mobile'} required={true}
                                   onChange={e => {
                                       setFormData({...formData, mobile: e.target.value})
                                       if (validatePhoneNumber(e.target.value) !== null)
                                           setErrors({...errors, mobileError: false})
                                   }}/>
                        <br/>
                        <TextField
                            id={'dob'}
                            type={'date'}
                            label={'Date of Birth'}
                            format={'dd/MM/yyyy'}
                            error={errors.dobError}
                            required={true}
                            InputLabelProps={{shrink: true}}
                            onChange={e => {
                                setFormData({...formData, dob: e.target.value})
                                setErrors({...errors, dobError: false})
                            }}/>
                        <br/>
                        <TextField id={'gender'}
                                   select
                                   value={gender}
                                   onChange={genderSelect}
                                   label={'Gender'}
                                   error={errors.genderError}
                                   required={true}>
                            {genders.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br/>
                        <Button onClick={handleSave} disabled={error}>Save</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </FormControl>
                </Box>
            </Modal>
        </>)
}