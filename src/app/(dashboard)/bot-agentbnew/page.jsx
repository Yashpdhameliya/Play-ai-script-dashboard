'use client'
import { useEffect, useState } from 'react'

import AgentList from '@views/apps/user'
import apiService from '@/services/api'

const getUserData = async () => {
  try {
    const response = await apiService.get('/api/v1/bot_agents?sort_by=created_at&sort_direction=desc') // Assuming the endpoint is /users

    return response?.data?.data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

const BotAgentApp = async () => {
  const data = await getUserData()

  console.log('datadata', data)

  return <AgentList userData={[]} />
}

export default BotAgentApp
