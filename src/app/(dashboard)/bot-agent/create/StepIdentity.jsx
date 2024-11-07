// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DirectionalIcon from '@components/DirectionalIcon'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller } from 'react-hook-form'

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
  const initialSelectedOption = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // States
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption)
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleOptionChange = prop => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
    } else {
      setSelectedOption(prop.target.value)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TextField fullWidth label='Display Name' placeholder='display_name' />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={18} md={9}>
            <FormControl fullWidth>
              <InputLabel id='voice-select'>Voice</InputLabel>
              <Select label='voice' labelId='voice-select' aria-describedby='voice-select' defaultValue=''>
                <MenuItem value='en-US'>English (US)</MenuItem>
                <MenuItem value='en-GB'>English (UK)</MenuItem>
              </Select>
            </FormControl>{' '}
          </Grid>{' '}
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id='speed-select'>Speed</InputLabel>
              <Select label='speed' labelId='speed-select' aria-describedby='speed-select' defaultValue=''>
                {[...Array(11)].map((_, index) => {
                  const value = (0.5 + index * 0.1).toFixed(1) + 'x'
                  return (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>{' '}
          </Grid>
        </Grid>{' '}
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label='Description' placeholder='description' />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label='Greeting' placeholder='greeting' />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label='Prompt' placeholder='prompt' />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label='Critical Knowledge' placeholder='critical_knowledge' />
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
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
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

export default StepIdentity
