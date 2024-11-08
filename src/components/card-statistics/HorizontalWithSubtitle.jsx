import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'

const BotAgentCard = props => {
  const {
    display_name,
    description,
    greeting,
    prompt,
    avatar_photo_url,
    widget_border_color,
    widget_background_color,
    widget_text_color,
    button_title
  } = props

  return (
    <Card
      style={{
        border: `2px solid ${widget_border_color}`,
        background: `linear-gradient(135deg, ${widget_background_color} 30%, #f0f0f5 100%)`,
        color: widget_text_color,
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s'
      }}
      className='rounded-lg shadow-md w-full max-w-sm hover:transform hover:scale-105'
    >
      <CardContent className='flex flex-col items-center gap-3 p-6'>
        {/* Avatar Section */}
        <Avatar
          alt={display_name}
          src={avatar_photo_url}
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: `3px solid ${widget_border_color}`,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
          }}
        />

        {/* Display Name */}
        <Typography variant='h5' component='h2' style={{ color: widget_text_color, fontWeight: '600' }}>
          {display_name}
        </Typography>

        {/* Description */}
        <Typography variant='body2' align='center' style={{ color: widget_text_color, marginBottom: '8px' }}>
          {description}
        </Typography>

        {/* Greeting */}
        <Typography variant='body1' align='center' style={{ fontWeight: 600, color: widget_text_color }}>
          {greeting}
        </Typography>

        {/* Prompt */}
        <Typography variant='body2' align='center' style={{ color: widget_text_color, marginBottom: '16px' }}>
          {prompt}
        </Typography>

        {/* Action Button */}
        <Button
          variant='contained'
          style={{
            backgroundColor: widget_border_color,
            color: '#ffffff',
            width: '100%',
            fontWeight: '600',
            padding: '12px 0',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
            transition: 'background-color 0.3s, transform 0.3s'
          }}
          className='mt-3 hover:bg-opacity-90 hover:transform hover:scale-105'
        >
          {button_title || 'Start Chat'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default BotAgentCard
