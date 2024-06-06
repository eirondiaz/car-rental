import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RentForm from './RentForm'
import { InspectionForm } from './InspectionForm'
import axios from 'axios'

const steps = ['Inspección', 'Renta']

export default function HorizontalLinearStepper({
  setSelected,
  element = {},
  isEditing = false,
  setIsEditing,
  setRefresh,
  setOpen,
}) {
  const [rentData, setRentData] = React.useState(element)
  const [inspectData, setInspectData] = React.useState({
    ...element?.inspection,
    employeeId: element?.inspection?.employee?.id,
    clientId: element?.inspection?.client?.id,
    vehicleId: element?.inspection?.vehicle?.id,
  })
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set())

  const handleChangeRent = (e) => {
    const { name, value } = e.target

    setRentData((prevVal) => ({
      ...prevVal,
      [name]: value,
    }))
  }

  const handleChangeInspect = (e) => {
    const { name, value, checked } = e.target

    setInspectData((prevVal) => ({
      ...prevVal,
      [name]: name.includes('has') ? checked : value,
    }))
  }

  // const isStepOptional = (step) => {
  //   return step === 1
  // }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    if (activeStep === steps.length - 1) {
      const data = {
        ...rentData,
        clientId: inspectData?.clientId,
        employeeId: inspectData?.employeeId,
        vehicleId: inspectData?.vehicleId,
        inspection: inspectData,
      }

      isEditing ? update(data) : create(data)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const create = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/rents`, data)
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const update = async (data) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/rents/${data.id}`, data)
      setRefresh((prevVal) => !prevVal)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setSelected({})
      setIsEditing(false)
      //setIsLoading(false)
    }
  }

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.")
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values())
  //     newSkipped.add(activeStep)
  //     return newSkipped
  //   })
  // }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Vehiculo rentado correctamente
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <InspectionForm
              data={inspectData}
              handleChange={handleChangeInspect}
              isEditing={isEditing}
            />
          ) : (
            <RentForm
              setRefresh={setRefresh}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              handleChange={handleChangeRent}
              data={rentData}
              vehicleId={inspectData?.vehicleId}
              clientId={inspectData?.clientId}
              employeeId={inspectData?.employeeId}
              //setOpen={setOpenEditForm}
              //element={selected}
            />
            // <Typography sx={{ mt: 2, mb: 1 }}>Step Eiron</Typography>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}
