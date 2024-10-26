// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Vars
const initialData = {
  company: '',
  country: '',
  contact: ''
}

const AddUserDrawer = props => {
  // Props
  const { open, handleClose, userData, setData } = props

  // States
  const [formData, setFormData] = useState(initialData)

  // Hooks
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      voice: '',
      voice_speed: 1.0,
      display_name: '',
      description: '',
      greeting: '',
      prompt: '',
      critical_knowledge: '',
      visibility: '',
      avatar_photo_url: '',
      button_title: '',
      contact_number: '',
      widget_position: '',
      widget_border_color: '#000000',
      widget_background_color: '#ffffff',
      widget_text_color: '#333333',
      agent_action_instructions: '',
      widget_powered_by_label: '',
      widget_powered_by_url: '',
      crawl_target_url: ''
    }
  })

  console.log('formDataformData', userData)

  const onSubmit = data => {
    const newUser = {
      id: (userData?.length && userData.length + 1) || 1,
      ...data
    }

    console.log('newUsernewUser', newUser)

    // setData([...(userData ?? []), newUser])

    // handleClose()
    reset(defaultValues)
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
  }

  // Set form data when in edit mode
  // useEffect(() => {
  //   if (userData?.length) {
  //     reset(userData) // Update form fields with userData when component is loaded
  //   } else {
  //     reset(defaultValues) // Set default values on reset
  //   }
  // }, [userData, reset])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-5 plb-4'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='ri-close-line text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          {/* Text Fields for basic string fields */}
          {[
            'display_name',
            'description',
            'greeting',
            'prompt',
            'critical_knowledge',
            'avatar_photo_url',
            'button_title',
            'contact_number',
            'agent_action_instructions',
            'widget_powered_by_label',
            'widget_powered_by_url',
            'crawl_target_url'
          ].map(field => (
            <Controller
              key={field}
              name={field}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label={field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors[field])}
                  helperText={errors[field] && 'This field is required.'}
                />
              )}
            />
          ))}

          {/* Select Field for Voice */}
          <FormControl fullWidth error={Boolean(errors.voice)}>
            <InputLabel>Voice</InputLabel>
            <Controller
              name='voice'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} label='Voice'>
                  <MenuItem value='en-US'>English (US)</MenuItem>
                  <MenuItem value='en-GB'>English (UK)</MenuItem>
                  {/* Add other language options as needed */}
                </Select>
              )}
            />
            <FormHelperText>{errors.voice && 'This field is required.'}</FormHelperText>
          </FormControl>

          {/* Slider or TextField for Voice Speed */}
          <Controller
            name='voice_speed'
            control={control}
            rules={{ required: true, min: 0.5, max: 2 }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type='number'
                label='Voice Speed'
                inputProps={{ min: 0.5, max: 2, step: 0.1 }}
                error={Boolean(errors.voice_speed)}
                helperText={errors.voice_speed && 'Enter a speed between 0.5 and 2.'}
              />
            )}
          />

          {/* Visibility Select */}
          <FormControl fullWidth error={Boolean(errors.visibility)}>
            <InputLabel>Visibility</InputLabel>
            <Controller
              name='visibility'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} label='Visibility'>
                  <MenuItem value='public'>Public</MenuItem>
                  <MenuItem value='private'>Private</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.visibility && 'This field is required.'}</FormHelperText>
          </FormControl>

          {/* Widget Position */}
          <FormControl fullWidth error={Boolean(errors.widget_position)}>
            <InputLabel>Widget Position</InputLabel>
            <Controller
              name='widget_position'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} label='Widget Position'>
                  <MenuItem value='bottom-right'>Bottom Right</MenuItem>
                  <MenuItem value='bottom-left'>Bottom Left</MenuItem>
                  <MenuItem value='top-right'>Top Right</MenuItem>
                  <MenuItem value='top-left'>Top Left</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.widget_position && 'This field is required.'}</FormHelperText>
          </FormControl>

          {/* Color Inputs */}
          {['widget_border_color', 'widget_background_color', 'widget_text_color'].map(field => (
            <Controller
              key={field}
              name={field}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label={field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  type='color'
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors[field])}
                  helperText={errors[field] && 'This field is required.'}
                />
              )}
            />
          ))}

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='outlined' color='error' type='reset' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserDrawer
