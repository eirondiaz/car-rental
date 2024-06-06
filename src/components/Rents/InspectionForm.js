import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const InspectionForm = ({ handleChange, data, isEditing }) => {
  //const [data, setData] = useState(data)
  const [vehicleList, setVehicleList] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [clientList, setClientList] = useState([])

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

  useEffect(() => {
    getVehicles()
    getEmployees()
    getClients()
  }, [])

  return (
    <Box sx={{ mt: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl sx={{ mr: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Vehiculo</InputLabel>
          <Select
            required
            defaultValue={data?.vehicleId || ''}
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
          <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
          <Select
            required
            defaultValue={data?.clientId || ''}
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
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl sx={{ mr: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Empleado</InputLabel>
          <Select
            required
            defaultValue={data?.employeeId || ''}
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
        <FormControl sx={{}} fullWidth>
          <InputLabel id="demo-simple-select-label">
            Cantidad combustible
          </InputLabel>
          <Select
            required
            defaultValue={data?.fuelAmount || ''}
            name={'fuelAmount'}
            label="Cantidad combustible"
            onChange={handleChange}
          >
            <MenuItem value="1/4">1/4</MenuItem>
            <MenuItem value="1/2">1/2</MenuItem>
            <MenuItem value="3/4">3/4</MenuItem>
            <MenuItem value="Lleno">Lleno</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={data?.hasScratch}
              name="hasScratch"
              onChange={handleChange}
            />
          }
          label="Tiene rayadura?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data?.hasSpareTire}
              name="hasSpareTire"
              onChange={handleChange}
            />
          }
          label="Tiene goma respuesta?"
        />
      </Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={data?.hasJack}
              name="hasJack"
              onChange={handleChange}
            />
          }
          label="Tiene gato?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data?.hasBrokenGlass}
              name="hasBrokenGlass"
              onChange={handleChange}
            />
          }
          label="Tiene rotura en cristal?"
        />
      </Box>
      {/* <TextField
        required
        sx={{ width: '100%' }}
        name="comments"
        label="Comentario"
        variant="outlined"
        defaultValue={data?.comments || ''}
        onChange={handleChange}
      /> */}
    </Box>
  )
}
