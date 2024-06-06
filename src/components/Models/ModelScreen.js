import { Add } from '@mui/icons-material'
import { Box, IconButton, Modal, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { style } from '../../shared/ModalStyle'
import BrandForm from './ModelForm'
import ModelTable from './ModelTable'

const ModelScreen = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setEditing] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/models `)
      setData(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [refresh])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Gestión de modelos</Typography>
        <Tooltip title="Agregar">
          <IconButton onClick={handleOpen}>
            <Add color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <ModelTable
        data={data}
        setRefresh={setRefresh}
        isEditing={isEditing}
        setEditing={setEditing}
        setOpenEditForm={setOpen}
        openEditFrom={open}
      />

      {/* <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <BrandForm />
        </Box>
      </Modal> */}
    </Box>
  )
}

export default ModelScreen
