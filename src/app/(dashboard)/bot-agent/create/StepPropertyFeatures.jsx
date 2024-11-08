// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

const StepBotDetails = ({ activeStep, handleNext, handlePrev, steps, formData, setFormData }) => {
  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      critical_knowledge: 'This bot is trained to answer questions about our products and services.',
      description: 'This is a sample description for the bot agent.'
    }
  })

  const onSubmit = data => {
    setFormData({ ...formData, ...data })
    handleNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        {/* Critical Knowledge Field */}
        <Grid item xs={12}>
          <Controller
            name='critical_knowledge'
            control={control}
            rules={{ required: 'Critical knowledge is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Critical Knowledge'
                placeholder='Enter critical knowledge for the bot'
                error={!!errors.critical_knowledge}
                helperText={errors.critical_knowledge?.message}
              />
            )}
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12}>
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Description'
                placeholder='Enter a description for the bot'
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
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
              type='submit'
              variant='contained'
              color={activeStep === steps.length - 1 ? 'success' : 'primary'}
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
    </form>
  )
}

export default StepBotDetails
