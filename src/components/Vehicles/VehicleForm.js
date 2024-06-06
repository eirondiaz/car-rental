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

const VehicleForm = ({
  element = {},
  isEditing = false,
  setIsEditing,
  setRefresh,
  setOpen,
}) => {
  const [data, setData] = useState(element)
  const [vTypeList, setVTypeList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [modelList, setModelList] = useState([])
  const [fuelList, setFuelList] = useState([])

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

  const getVTypes = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/vehicle-types`
      )
      setVTypeList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getModels = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/models?brandId=${data?.brandId || ''}`
      )
      setModelList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getFuels = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/fuels`)
      setFuelList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getBrands = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/brands`)
      setBrandList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const create = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/vehicles`, data)
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
        `${process.env.REACT_APP_API_URL}/vehicles/${data.id}`,
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
    getVTypes()
    getBrands()
    getFuels()
  }, [])

  useEffect(() => {
    getModels()
  }, [data?.brandId])

  return (
    <Box>
      <Typography variant="h5">{`${
        isEditing ? 'Editar' : 'Agregar'
      } Vehiculo`}</Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="description"
          label="Descripción"
          variant="outlined"
          defaultValue={data?.description || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="chasisNumber"
          type="number"
          inputProps={{ max: 3 }}
          label="No. Chasis"
          variant="outlined"
          defaultValue={data?.chasisNumber || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="motorNumber"
          type="number"
          label="No. Motor"
          variant="outlined"
          defaultValue={data?.motorNumber || ''}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ width: '100%', mb: 2 }}
          name="plateNumber"
          label="No. Placa"
          variant="outlined"
          defaultValue={data?.plateNumber || ''}
          onChange={handleChange}
        />
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo Vehiculo</InputLabel>
          <Select
            required
            defaultValue={data?.type?.description || ''}
            name={'typeId'}
            label="Tipo Vehiculo"
            onChange={handleChange}
          >
            {vTypeList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Marca</InputLabel>
          <Select
            required
            defaultValue={data?.brand?.description || ''}
            name={'brandId'}
            label="Marca"
            onChange={handleChange}
          >
            {brandList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mb: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
          <Select
            required
            defaultValue={data?.model?.description || ''}
            name={'modelId'}
            label="Modelo"
            onChange={handleChange}
          >
            {modelList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Tipo de Combustible
          </InputLabel>
          <Select
            required
            defaultValue={data?.fuel?.description || ''}
            name={'fuelId'}
            label="Tipo de Combustible"
            onChange={handleChange}
          >
            {fuelList.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={onSubmit} sx={{ mt: 4 }} variant="contained">
        {isEditing ? 'Editar' : 'Agregar'}
      </Button>
    </Box>
  )
}

export default VehicleForm
