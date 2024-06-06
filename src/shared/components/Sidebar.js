import React, { useState } from 'react'
import '../../App.css'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import {
  BadgeRounded,
  BookmarkAddRounded,
  CarRepairRounded,
  DirectionsCarFilledRounded,
  EngineeringRounded,
  LocalGasStationRounded,
  ModelTrainingRounded,
  StyleRounded,
  SupervisedUserCircleRounded,
} from '@mui/icons-material'

const buttons = [
  {
    name: 'Tipos de vehiculos',
    icon: CarRepairRounded,
    path: '/vehicle-types',
    isSelected: true,
  },
  {
    name: 'Marcas',
    icon: StyleRounded,
    path: '/brands',
    isSelected: false,
  },
  {
    name: 'Modelos',
    icon: ModelTrainingRounded,
    path: '/models',
    isSelected: false,
  },
  {
    name: 'Tipo de combustible',
    icon: LocalGasStationRounded,
    path: '/fuels',
    isSelected: false,
  },
  {
    name: 'Vehiculos',
    icon: DirectionsCarFilledRounded,
    path: '/vehicles',
    isSelected: false,
  },
  {
    name: 'Clientes',
    icon: SupervisedUserCircleRounded,
    path: '/clients',
    isSelected: false,
  },
  {
    name: 'Empleados',
    icon: BadgeRounded,
    path: '/employees',
    isSelected: false,
  },
  // {
  //   name: 'Inspeccion',
  //   icon: EngineeringRounded,
  //   path: '/inspections',
  //   isSelected: false,
  // },
  {
    name: 'Renta & Devolucion',
    // icon: BookmarkAddRounded,
    icon: EngineeringRounded,
    path: '/rents',
    isSelected: false,
  },
]

export const Sidebar = () => {
  const [selected, setSelected] = useState(buttons)
  const navigate = useNavigate()

  const selectOption = (index, path) => {
    if (selected[index].isSelected) return
    const newSelection = selected.map((button, i) => ({
      ...button,
      isSelected: i === index ? !button.isSelected : false,
    }))
    setSelected(newSelection)
    navigate(path)
  }

  return (
    <Box className="drawer-container">
      <Box>
        <Typography>
          <p>Car Rental</p>
        </Typography>
      </Box>
      <Box>
        {selected.map((x, i) => (
          <Button
            key={i}
            onClick={() => selectOption(i, x.path)}
            style={{
              justifyContent: 'flex-start',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 15,
              ...(x.isSelected && {
                borderBottom: '3px solid blue',
                borderBottomRightRadius: '0',
                borderBottomLeftRadius: '0',
              }),
            }}
            sx={{ mb: 3, fontSize: 12 }}
            fullWidth
            variant="text"
            startIcon={<x.icon />}
          >
            {x.name}
          </Button>
        ))}
      </Box>
    </Box>
  )
}
