// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

const StepGreetingPrompt = ({ activeStep, handleNext, handlePrev, steps }) => {
  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      greeting: 'Hello! How can I assist you today?',
      prompt: 'Please ask any question related to our services.'
    }
  })

  const onSubmit = data => {
    console.log('Form data:', data)
    handleNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        {/* Greeting Field */}
        <Grid item xs={12}>
          <Controller
            name='greeting'
            control={control}
            rules={{ required: 'Greeting is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Greeting'
                placeholder='Enter a greeting message'
                error={!!errors.greeting}
                helperText={errors.greeting?.message}
              />
            )}
          />
        </Grid>

        {/* Prompt Field */}
        <Grid item xs={12}>
          <Controller
            name='prompt'
            control={control}
            rules={{ required: 'Prompt is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Prompt'
                placeholder='Enter a prompt message'
                error={!!errors.prompt}
                helperText={errors.prompt?.message}
              />
            )}
          />
        </Grid>

        {/* Navigation Buttons */}
        <Grid item xs={12}>
          <div className='flex items-center justify-between'>
            <Button variant='outlined' color='secondary' disabled={activeStep === 0} onClick={handlePrev}>
              Previous
            </Button>
            <Button type='submit' variant='contained' color={activeStep === steps.length - 1 ? 'success' : 'primary'}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default StepGreetingPrompt
