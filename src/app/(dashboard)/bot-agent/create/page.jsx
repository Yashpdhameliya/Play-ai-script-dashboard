'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector from '@mui/material/StepConnector'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Component Imports
import StepIdentity from './StepIdentity'
import StepPropertyDetails from './StepPropertyDetails'
import StepPropertyFeatures from './StepPropertyFeatures'
import StepPropertyArea from './StepPropertyArea'
import StepPriceDetails from './StepPriceDetails'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'
import DeployWeb from './DeployWeb'
import apiService from '@/services/api'
import toast from 'react-hot-toast'

// Vars
const steps = [
  {
    title: 'Identity',
    subtitle: 'Your Name/Email'
  },
  {
    title: 'Behavior',
    subtitle: 'Property Type'
  },
  {
    title: 'Knowledge',
    subtitle: 'Bedrooms/Floor No'
  },
  {
    title: 'Actions',
    subtitle: 'Covered Area'
  },
  {
    title: 'Deploy · Phone',
    subtitle: 'Expected Price'
  },
  {
    title: 'Deploy · Web',
    subtitle: 'Expected Price'
  }
]

const getStepContent = (step, handleNext, handlePrev, setFormData, formData) => {
  const Tag =
    step === 0
      ? StepIdentity
      : step === 1
        ? StepPropertyDetails
        : step === 2
          ? StepPropertyFeatures
          : step === 3
            ? StepPropertyArea
            : step === 4
              ? StepPriceDetails
              : DeployWeb

  return (
    <Tag
      activeStep={step}
      handleNext={handleNext}
      handlePrev={handlePrev}
      steps={steps}
      setFormData={setFormData}
      formData={formData}
    />
  )
}

// Styled Components
const ConnectorHeight = styled(StepConnector)(() => ({
  '& .MuiStepConnector-line': {
    minHeight: 20
  }
}))

const PropertyListingWizard = () => {
  // States
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState()

  const handleNext = async data => {
    console.log('adsadsads', data)
    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      try {
        const response = await apiService.post('/api/v1/bot_agents', data)
        toast.success('Agent created successfully!')
        setActiveStep(0)
        console.log('responseresponse', response)
      } catch (error) {
        console.error('Error creating user:', error?.response?.data?.errors)
        toast.error(error?.response?.data?.errors)
      }

      // reset(defaultValues)
    }
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }
  console.log('formDataformData', formData)
  return (
    <Card className='flex flex-col lg:flex-row'>
      <CardContent className='max-lg:border-be lg:border-ie lg:min-is-[300px]'>
        <StepperWrapper className='bs-full'>
          <Stepper activeStep={activeStep} connector={<ConnectorHeight />} orientation='vertical'>
            {steps.map((step, index) => {
              return (
                <Step key={index} onClick={() => setActiveStep(index)}>
                  <StepLabel className='p-0' StepIconComponent={StepperCustomDot}>
                    <div className='step-label cursor-pointer'>
                      <Typography className='step-number'>{`0${index + 1}`}</Typography>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <CardContent className='flex-1 pbs-5'>
        {getStepContent(activeStep, handleNext, handlePrev, setFormData, formData)}
      </CardContent>
    </Card>
  )
}

export default PropertyListingWizard
