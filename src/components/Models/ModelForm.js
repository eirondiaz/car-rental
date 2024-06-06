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

const ModelForm = ({
  element = {},
  isEditing = false,
  setIsEditing,
  setRefresh,
  setOpen,
}) => {
  const [data, setData] = useState(element)
  const [brandList, setBrandList] = useState([])

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
      await axios.post(`${process.env.REACT_APP_API_URL}/models`, data)
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
    getBrands()
  }, [])

  return (
    <Box>
      <Typography variant="h5">{`${
        isEditing ? 'Editar' : 'Agregar'
      } Modelo`}</Typography>
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
        <FormControl fullWidth>
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
      </Box>
      <Button onClick={onSubmit} sx={{ mt: 4 }} variant="contained">
        {isEditing ? 'Editar' : 'Agregar'}
      </Button>
    </Box>
  )
}

export default ModelForm
