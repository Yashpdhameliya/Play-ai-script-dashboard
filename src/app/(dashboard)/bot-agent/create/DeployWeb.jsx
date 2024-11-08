// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

import DirectionalIcon from '@components/DirectionalIcon'

const DeployWeb = ({ activeStep, handleNext, handlePrev, steps }) => {
  const [formData, setFormData] = useState({
    crawl_target_url: '',
    widget_border_color: '#000000',
    widget_background_color: '#ffffff',
    widget_text_color: '#333333',
    button_title: '',
    widget_position: 'bottom-right',
    widget_powered_by_label: '',
    widget_powered_by_url: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Grid container spacing={6}>
      {/* Crawl Target URL */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Crawl Target URL'
          placeholder='https://example.com/content'
          name='crawl_target_url'
          value={formData.crawl_target_url}
          onChange={handleInputChange}
          type='url'
        />
      </Grid>

      {/* Widget Border Color */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Widget Border Color'
          name='widget_border_color'
          value={formData.widget_border_color}
          onChange={handleInputChange}
          type='color'
        />
      </Grid>

      {/* Widget Background Color */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Widget Background Color'
          name='widget_background_color'
          value={formData.widget_background_color}
          onChange={handleInputChange}
          type='color'
        />
      </Grid>

      {/* Widget Text Color */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Widget Text Color'
          name='widget_text_color'
          value={formData.widget_text_color}
          onChange={handleInputChange}
          type='color'
        />
      </Grid>

      {/* Button Title */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Button Title'
          placeholder='Chat with Us'
          name='button_title'
          value={formData.button_title}
          onChange={handleInputChange}
        />
      </Grid>

      {/* Widget Position */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          select
          label='Widget Position'
          name='widget_position'
          value={formData.widget_position}
          onChange={handleInputChange}
        >
          <MenuItem value='bottom-right'>Bottom Right</MenuItem>
          <MenuItem value='bottom-left'>Bottom Left</MenuItem>
          <MenuItem value='top-right'>Top Right</MenuItem>
          <MenuItem value='top-left'>Top Left</MenuItem>
        </TextField>
      </Grid>

      {/* Widget Powered By Label */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label='Powered By Label'
          placeholder='Powered by XYZ'
          name='widget_powered_by_label'
          value={formData.widget_powered_by_label}
          onChange={handleInputChange}
        />
      </Grid>

      {/* Widget Powered By URL */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label='Powered By URL'
          placeholder='https://example.com'
          name='widget_powered_by_url'
          value={formData.widget_powered_by_url}
          onChange={handleInputChange}
          type='url'
        />
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
            onClick={() => handleNext(formData)}
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

export default DeployWeb
