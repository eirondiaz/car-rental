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
import React, { useState, useEffect } from 'react'

const RentForm = ({
  vehicleId,
  clientId,
  employeeId,
  data,
  handleChange,
  //element = {},
  isEditing = false,
  setIsEditing,
  setRefresh,
  setOpen,
}) => {
  //const [data, setData] = useState(element)
  const [vehicleList, setVehicleList] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [clientList, setClientList] = useState([])

  // const handleChange = (e) => {
  //   const { name, value } = e.target

  //   setData((prevVal) => ({
  //     ...prevVal,
  //     [name]: value,
  //   }))
  // }

  const onSubmit = async () => {
    isEditing ? update() : create()
  }

  const getVehicles = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/vehicles?isNotRented=${
          isEditing ? '0' : '1'
        }`
      )
      setVehicleList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getEmployees = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/employees`)
      setEmployeeList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getClients = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients`)
      setClientList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const create = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/brands`, data)
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
        `${process.env.REACT_APP_API_URL}/brands/${data.id}`,
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

  useEffect(() => {
    getVehicles()
    getEmployees()
    getClients()
  }, [])

  return (
    <Box sx={{ mt: 6 }}>
      {/* <Typography variant="h5">{`${
        isEditing ? 'Editar' : 'Agregar'
      } Renta`}</Typography> */}
      <Box>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Vehiculo</InputLabel>
          <Select
            required
            disabled
            defaultValue={vehicleId || ''}
            name={'vehicleId'}
            label="Vehiculo"
            onChange={handleChange}
          >
            {vehicleList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.description} | {x?.brand?.description || ''}{' '}
                {x?.model?.description || ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Empleado</InputLabel>
          <Select
            required
            disabled
            defaultValue={employeeId || ''}
            name={'employeeId'}
            label="Empleado"
            onChange={handleChange}
          >
            {employeeList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
          <Select
            required
            disabled
            defaultValue={clientId || ''}
            name={'clientId'}
            label="Cliente"
            onChange={handleChange}
          >
            {clientList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            required
            sx={{ width: '100%', mb: 2, mr: 2 }}
            name="rentDate"
            //label="Fecha Admision"
            type={'date'}
            variant="outlined"
            defaultValue={data?.rentDate || ''}
            onChange={handleChange}
          />
          {isEditing && (
            <TextField
              required
              sx={{ width: '100%', mb: 2 }}
              name="returnDate"
              //label="Fecha Admision"
              type={'date'}
              variant="outlined"
              defaultValue={data?.returnDate || ''}
              onChange={handleChange}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            required
            sx={{ width: '100%', mb: 2, mr: 2 }}
            name="amountPerDay"
            type="number"
            label="Monto x Dias"
            variant="outlined"
            defaultValue={data?.amountPerDay || ''}
            onChange={handleChange}
          />
          <TextField
            required
            sx={{ width: '100%', mb: 2 }}
            name="totalDays"
            type="number"
            label="Cantidad dias"
            variant="outlined"
            defaultValue={data?.totalDays || ''}
            onChange={handleChange}
          />
        </Box>
        <TextField
          required
          sx={{ width: '100%' }}
          name="comments"
          label="Comentario"
          variant="outlined"
          defaultValue={data?.comments || ''}
          onChange={handleChange}
        />
      </Box>
      {/* <Button onClick={onSubmit} sx={{ mt: 4 }} variant="contained">
        {isEditing ? 'Editar' : 'Agregar'}
      </Button> */}
    </Box>
  )
}

export default RentForm
