// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

// Vars
const data = [
  {
    title: 'I am the Builder',
    value: 'builder',
    content: 'List property as Builder, list your project and get highest reach.',
    asset: 'ri-home-6-line',
    isSelected: true
  },
  {
    title: 'I am the Owner',
    value: 'owner',
    content: 'Submit property as an Individual. Lease, Rent or Sell at the best price.',
    asset: 'ri-user-3-line'
  },
  {
    title: 'I am the broker',
    value: 'broker',
    content: 'Earn highest commission by listing your clients properties at the best price.',
    asset: 'ri-money-dollar-circle-line'
  }
]

const StepIdentity = ({ activeStep, handleNext, handlePrev, steps }) => {
  // Vars
  const initialSelectedOption = data.find(item => item.isSelected)?.value || ''

  // States
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      display_name: '',
      voice: '',
      voice_speed: '',
      description: '',
      greeting: '',
      prompt: '',
      criticalKnowledge: ''
    }
  })

  const onSubmit = data => {
    console.log('Form data:', data)
    handleNext()
  }

  const handleOptionChange = event => {
    setSelectedOption(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Controller
            name='display_name'
            control={control}
            rules={{ required: 'Display Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label='Display Name'
                placeholder='display_name'
                error={!!errors.display_name}
                helperText={errors.display_name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
            <Grid item xs={18} md={9}>
              <FormControl fullWidth error={!!errors.voice}>
                <InputLabel id='voice-select'>Voice</InputLabel>
                <Controller
                  name='voice'
                  control={control}
                  rules={{ required: 'Voice selection is required' }}
                  render={({ field }) => (
                    <Select {...field} label='Voice' labelId='voice-select'>
                      <MenuItem value='en-US'>English (US)</MenuItem>
                      <MenuItem value='en-GB'>English (UK)</MenuItem>
                    </Select>
                  )}
                />
                {errors.voice && <p className='MuiFormHelperText-root'>{errors.voice.message}</p>}
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth error={!!errors.voice_speed}>
                <InputLabel id='speed-select'>Speed</InputLabel>
                <Controller
                  name='voice_speed'
                  control={control}
                  rules={{ required: 'Speed selection is required' }}
                  render={({ field }) => (
                    <Select {...field} label='Speed' labelId='speed-select'>
                      {[...Array(11)].map((_, index) => {
                        const value = (0.5 + index * 0.1).toFixed(1) + 'x'
                        return (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )}
                />
                {errors.voice_speed && <p className='MuiFormHelperText-root'>{errors.voice_speed.message}</p>}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Controller
                name='description'
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Description'
                    placeholder='description'
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='greeting'
                control={control}
                rules={{ required: 'Greeting is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Greeting'
                    placeholder='greeting'
                    error={!!errors.greeting}
                    helperText={errors.greeting?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='prompt'
                control={control}
                render={({ field }) => <TextField {...field} fullWidth label='Prompt' placeholder='prompt' />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name='criticalKnowledge'
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label='Critical Knowledge' placeholder='critical_knowledge' />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

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

export default StepIdentity
