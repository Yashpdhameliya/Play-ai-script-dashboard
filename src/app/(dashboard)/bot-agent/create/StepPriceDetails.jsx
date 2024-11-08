// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

const StepPriceDetails = ({ activeStep, handleNext, handlePrev, steps, formData, setFormData }) => {
  const [contactNumber, setContactNumber] = useState('+1234567890')
  const [error, setError] = useState('')

  const handleContactChange = e => {
    const value = e.target.value
    if (/^\+?[0-9]*$/.test(value)) {
      // Regex to allow numbers and optional leading +
      setContactNumber(value)
      setError('')
    } else {
      setError('Please enter a valid number')
    }
  }

  const handleContactSubmit = () => {
    if (!contactNumber.match(/^\+?[0-9]+$/)) {
      setError('Please enter a valid contact number')
      return
    }
    setFormData({ ...formData, contactNumber: contactNumber })
    handleNext()
  }

  return (
    <Grid container spacing={5}>
      {/* Contact Number Field */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Contact Number'
          placeholder='+1234567890'
          type='tel'
          value={contactNumber}
          onChange={handleContactChange}
          error={!!error}
          helperText={error || 'Only numbers are allowed'}
        />
      </Grid>

      {/* Navigation Buttons */}
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='outlined'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleContactSubmit}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='ri-check-line' />
              ) : (
                <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepPriceDetails
