'use client'

// Next Imports
import { useState } from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import classnames from 'classnames'

import toast from 'react-hot-toast'

import Logo from '@components/layout/shared/Logo'

import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'
import apiService from '@/services/api'

const darkImg = '/images/pages/auth-v2-mask-4-dark.png'
const lightImg = '/images/pages/auth-v2-mask-4-light.png'
const darkIllustration = '/images/illustrations/auth/v2-forgot-password-dark.png'
const lightIllustration = '/images/illustrations/auth/v2-forgot-password-light.png'
const borderedDarkIllustration = '/images/illustrations/auth/v2-forgot-password-dark-border.png'
const borderedLightIllustration = '/images/illustrations/auth/v2-forgot-password-light-border.png'

const ForgotPasswordV2 = ({ mode }) => {
  const [formData, setFormData] = useState({ email: '' })

  // Hooks
  const { settings } = useSettings()
  const { lang: locale } = useParams()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await apiService.post('/api/v1/passwords/forgot_password', { user: formData }) // Assuming the endpoint is /users

      console.log('resdfsfdsponse', response)

      if (response?.data?.success) {
        // router.push('/login')
        toast.success(response?.data?.data?.message)
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error?.message)
    }
  }

  console.log('formDataformData', formData)

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex items-center justify-center bs-full flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <div className='pli-6 max-lg:mbs-40 lg:mbe-24'>
          <img
            src={characterIllustration}
            alt='character-illustration'
            className='max-bs-[677px] max-is-full bs-auto'
          />
        </div>
        <img src={authBackground} className='absolute bottom-[4%] z-[-1] is-full max-md:hidden' />
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <Link
          href={getLocalizedUrl('/', locale)}
          className='absolute block-start-5 sm:block-start-[38px] inline-start-6 sm:inline-start-[38px]'
        >
          <Logo />
        </Link>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div>
            <Typography variant='h4'>Forgot Password 🔒</Typography>
            <Typography className='mbs-1'>
              Enter your email and we&#39;ll send you instructions to reset your password
            </Typography>
          </div>
          <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <TextField
              type='email'
              autoFocus
              fullWidth
              label='Email'
              required
              value={formData?.email}
              onChange={e => setFormData({ email: e.target.value })}
            />
            <Button fullWidth variant='contained' type='submit'>
              Send reset link
            </Button>
            <Typography className='flex justify-center items-center' color='primary'>
              <Link href='/login' className='flex items-center gap-1.5'>
                <span>Back to Login</span>
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordV2
