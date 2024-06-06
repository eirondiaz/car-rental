import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { style } from '../../shared/ModalStyle'
import RentForm from './RentForm'
import Stepper from './Stepper'

const RentTable = ({
  data,
  setRefresh,
  isEditing,
  setEditing,
  setOpenEditForm,
  openEditFrom,
}) => {
  const [open, setOpen] = useState(false)
  //const [openEditFrom, setOpenEditForm] = useState(false)
  const [selected, setSelected] = useState({})
  //const [isEditing, setEditing] = useState(false)

  const handleClickOpen = (row) => {
    setSelected(row)
    setOpen(true)
  }

  const handleClickOpenEditForm = (row) => {
    setSelected(row)
    setOpenEditForm(true)
    setEditing(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenEditForm(false)
    setEditing(false)
    setSelected({})
  }

  const onDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/rents/${selected.id}`
      )
      setRefresh((prevVal) => !prevVal)
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
    }
  }

  return (
    <Box>
      <TableContainer sx={{ mt: 6 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Vehiculo</TableCell>
              <TableCell>Empleado</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha renta</TableCell>
              <TableCell>Fecha devolucion</TableCell>
              <TableCell>Monto x Dia</TableCell>
              <TableCell>Cantidad de dias</TableCell>
              <TableCell>Comentario</TableCell>
              <TableCell>Está rentado?</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.description}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.vehicle?.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.employee?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.client?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.rentDate}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.returnDate || 'Aun sin devolver'}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.amountPerDay}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.totalDays}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.comments}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.returnDate ? 'No' : 'Si'}
                </TableCell>
                <TableCell align="right">
                  <>
                    <Tooltip title={'Editar'}>
                      <IconButton
                        onClick={() => {
                          handleClickOpenEditForm(row)
                        }}
                      >
                        <EditOutlined color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'Eliminar'}>
                      <IconButton
                        onClick={() => {
                          handleClickOpen(row)
                        }}
                      >
                        <DeleteOutline color="error" />
                      </IconButton>
                    </Tooltip>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openEditFrom} onClose={handleClose}>
        <Box sx={style}>
          {/* <RentForm
            setRefresh={setRefresh}
            setIsEditing={setEditing}
            isEditing={isEditing}
            setOpen={setOpenEditForm}
            element={selected}
          /> */}
          <Stepper
            setRefresh={setRefresh}
            setIsEditing={setEditing}
            isEditing={isEditing}
            setOpen={setOpenEditForm}
            element={selected}
            setSelected={setSelected}
          />
        </Box>
      </Modal>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{`Estás seguro que deseas eliminar "${selected?.vehicle?.description}" - "${selected?.client?.name}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={onDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default RentTable
