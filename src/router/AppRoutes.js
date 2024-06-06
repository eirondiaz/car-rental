import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BrandScreen from '../components/Brands/BrandScreen'
import ClientScreen from '../components/Clients/ClientScreen'
import EmployeeScreen from '../components/Employee/EmployeeScreen'
import FuelScreen from '../components/Fuels/FuelScreen'
import ModelScreen from '../components/Models/ModelScreen'
import RentScreen from '../components/Rents/RentScreen'
import VehicleScreen from '../components/Vehicles/VehicleScreen'
import VTypeScreen from '../components/VehicleTypes/VTypeScreen'
import { Layout } from '../shared/components/Layout'

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/*" element={<Navigate to="/vehicle-types" />}></Route>
            <Route path="/brands" element={<BrandScreen />}></Route>
            <Route path="/models" element={<ModelScreen />}></Route>
            <Route path="/vehicle-types" element={<VTypeScreen />}></Route>
            <Route path="/fuels" element={<FuelScreen />}></Route>
            <Route path="/vehicles" element={<VehicleScreen />}></Route>
            <Route path="/employees" element={<EmployeeScreen />}></Route>
            <Route path="/clients" element={<ClientScreen />}></Route>
            <Route path="/rents" element={<RentScreen />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
