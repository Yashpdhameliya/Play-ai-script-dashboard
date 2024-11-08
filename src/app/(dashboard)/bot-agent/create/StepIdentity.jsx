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
import Avatar from '@mui/material/Avatar'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'

const StepIdentity = ({ activeStep, handleNext, handlePrev, steps }) => {
  const initialSelectedOption = 'en-US'

  // States
  const [avatarUrl, setAvatarUrl] = useState('')

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      display_name: '',
      voice: initialSelectedOption,
      voice_speed: '1.0x',
      avatar_photo_url: avatarUrl,
      visibility: 'public'
    }
  })

  const onSubmit = data => {
    console.log('Form data:', data)
    handleNext()
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
                placeholder='Enter Agent Name'
                error={!!errors.display_name}
                helperText={errors.display_name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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
          <Controller
            name='avatar_photo_url'
            control={control}
            render={({ field }) => (
              <div className='flex items-center gap-4'>
                <Avatar src={field.value} alt='Avatar' sx={{ width: 56, height: 56 }} />
                <TextField {...field} fullWidth label='Avatar Photo URL' placeholder='https://picsum.photos/200/300' />
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='visibility-select'>Visibility</InputLabel>
            <Controller
              name='visibility'
              control={control}
              rules={{ required: 'Visibility selection is required' }}
              render={({ field }) => (
                <Select {...field} label='Visibility' labelId='visibility-select'>
                  <MenuItem value='public'>Public</MenuItem>
                  <MenuItem value='private'>Private</MenuItem>
                </Select>
              )}
            />
          </FormControl>
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
