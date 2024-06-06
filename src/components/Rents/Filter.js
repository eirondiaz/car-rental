import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const Filter = ({ filterData, setFilter }) => {
  console.log('filterData', filterData)
  const [vehicleList, setVehicleList] = useState([])
  const [clientList, setClientList] = useState([])

  const handleChange = (e) => {
    const { value, name } = e.target

    setFilter((prevVal) => ({
      ...prevVal,
      [name]: value,
    }))
  }

  const resetFilter = () => setFilter({})

  const getVehicles = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/vehicles`)
      setVehicleList(res.data.data)
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
    getClients()
  }, [])

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <FormControl sx={{ width: 200, mr: 2 }}>
          <InputLabel id="demo-simple-select-label">Vehiculo</InputLabel>
          <Select
            required
            value={filterData?.vehicleId || ''}
            name={'vehicleId'}
            label="Vehiculo"
            onChange={handleChange}
          >
            {vehicleList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 200, mr: 2 }}>
          <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
          <Select
            required
            value={filterData?.clientId || ''}
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

        <TextField
          required
          sx={{ width: 200 }}
          name="rentDate"
          //label="Fecha Admision"
          type={'date'}
          variant="outlined"
          value={filterData?.rentDate || ''}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Button variant="outlined" onClick={resetFilter}>
          Limpiar
        </Button>
      </Box>
    </Box>
  )
}
