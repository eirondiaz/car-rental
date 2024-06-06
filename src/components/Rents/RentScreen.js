import { Add, SaveAlt } from '@mui/icons-material'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Filter } from './Filter'
import RentTable from './RentTable'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

const RentScreen = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setEditing] = useState(false)
  const [filter, setFilter] = useState({})
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const exportToExcel = () => {
    const dataToExport = data.map((x) => ({
      id: x.id,
      Vehiculo: x?.vehicle?.description || '',
      Empleado: x?.employee?.name || '',
      Cliente: x?.client?.name || '',
      Fecha_Renta: x?.rentDate || '',
      Fecha_Devolucion: x?.returnDate || 'Aun no devuelto',
      Monto_Por_Dia: x?.amountPerDay || '',
      Cantidad_de_dias: x?.totalDays || '',
      Comentario: x?.comments || '',
    }))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, `rentas.xlsx`)
  }

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/rents?clientId=${
          filter?.clientId || ''
        }&vehicleId=${filter?.vehicleId || ''}&rentDate=${
          filter?.rentDate || ''
        }`
      )
      setData(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [refresh, filter])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Gestión de rentas y devoluciones</Typography>
        <Box>
          <Tooltip title="Exportar a excel">
            <IconButton sx={{mr:1}} onClick={exportToExcel}>
              <SaveAlt color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Agregar">
            <IconButton onClick={handleOpen}>
              <Add color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Filter filterData={filter} setFilter={setFilter} />

      <RentTable
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

export default RentScreen
