import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const EmployeeForm = ({
  element = {},
  isEditing = false,
  setIsEditing,
  setRefresh,
  setOpen,
}) => {
  const [data, setData] = useState(element)

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }))
  }

  const onSubmit = async () => {
    isEditing ? update() : create()
  }

  const create = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/employees`, data)
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      //setIsEditing(false)
      //setIsLoading(false)
    }
  }

  const update = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/employees/${data.id}`,
        data
      )
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
      //setIsLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h5">{`${
        isEditing ? 'Editar' : 'Agregar'
      } Empleado`}</Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          required
          sx={{ width: '100%' }}
          name="name"
          label="Nombre"
          variant="outlined"
          defaultValue={data?.name || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mt: 2 }}
          name="cedula"
          inputProps={{ maxLength: 11 }}
          type={'number'}
          label="Cedula"
          variant="outlined"
          defaultValue={data?.cedula || ''}
          onChange={handleChange}
        />
        <FormControl sx={{ mt: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Tanda labor</InputLabel>
          <Select
            required
            defaultValue={data?.workShift || ''}
            name={'workShift'}
            label="Tanda labor"
            onChange={handleChange}
          >
            <MenuItem value={'Matutina'}>Matutina</MenuItem>
            <MenuItem value={'Vespertina'}>Vespertina</MenuItem>
            <MenuItem value={'Nocturna'}>Nocturna</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          sx={{ width: '100%', mt: 2 }}
          name="commissionPercentage"
          type={'number'}
          label="Porciento Comision"
          variant="outlined"
          defaultValue={data?.commissionPercentage || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mt: 2 }}
          name="hiringDate"
          //label="Fecha Admision"
          type={'date'}
          variant="outlined"
          defaultValue={data?.hiringDate || ''}
          onChange={handleChange}
        />
      </Box>
      <Button onClick={onSubmit} sx={{ mt: 4 }} variant="contained">
        {isEditing ? 'Editar' : 'Agregar'}
      </Button>
    </Box>
  )
}

export default EmployeeForm
