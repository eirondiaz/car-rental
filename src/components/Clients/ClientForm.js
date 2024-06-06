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

const ClientForm = ({
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
      await axios.post(`${process.env.REACT_APP_API_URL}/clients`, data)
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEditing(false)
      //setIsLoading(false)
    }
  }

  const update = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/clients/${data.id}`,
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
      } Clientes`}</Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="name"
          label="Nombre"
          variant="outlined"
          defaultValue={data?.name || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="cedula"
          label="Cedula"
          inputProps={{ maxLength: 11 }}
          variant="outlined"
          defaultValue={data?.cedula || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="creditCard"
          type={'number'}
          label="No. Tarjeta CR"
          variant="outlined"
          defaultValue={data?.creditCard || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="creditLimit"
          type={'number'}
          label="Limite de credito"
          variant="outlined"
          defaultValue={data?.creditLimit || ''}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo Persona</InputLabel>
          <Select
            required
            defaultValue={data?.type || ''}
            name={'type'}
            label="Tipo Persona"
            onChange={handleChange}
          >
            <MenuItem value={'Fisica'}>Fisica</MenuItem>
            <MenuItem value={'Juridica'}>Juridica</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button onClick={onSubmit} sx={{ mt: 4 }} variant="contained">
        {isEditing ? 'Editar' : 'Agregar'}
      </Button>
    </Box>
  )
}

export default ClientForm
