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

const StepAgentInstructions = ({ activeStep, handleNext, handlePrev, steps, formData, setFormData }) => {
  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      agent_action_instructions: 'Please follow up with human support if unresolved.'
    }
  })

  const onSubmit = data => {
    setFormData({ ...formData, ...data })
    handleNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        {/* Agent Action Instructions Field */}
        <Grid item xs={12}>
          <Controller
            name='agent_action_instructions'
            control={control}
            rules={{ required: 'Agent action instructions are required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Agent Action Instructions'
                placeholder='Enter action instructions for the agent'
                error={!!errors.agent_action_instructions}
                helperText={errors.agent_action_instructions?.message}
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

export default StepAgentInstructions
