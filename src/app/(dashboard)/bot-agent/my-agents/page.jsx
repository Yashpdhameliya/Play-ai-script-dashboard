'use client'
import Grid from '@mui/material/Grid'
import Characters from '@views/statistics/Characters'
import Vertical from '@views/statistics/Vertical'
import BarChart from '@views/statistics/BarChart'
import LineChart from '@views/statistics/LineChart'
import RadialBarChart from '@views/statistics/RadialBarChart'
import StackedBarChart from '@views/statistics/StackedBarChart'
import SmoothLineChart from '@views/statistics/SmoothLineChart'
import DonutChart from '@views/statistics/DonutChart'
import SalesProfit from '@views/statistics/SalesProfit'
import TotalVisits from '@views/statistics/TotalVisits'
import SalesMonth from '@views/statistics/SalesMonth'
import OrdersImpressions from '@views/statistics/OrdersImpressions'
import MarketingSales from '@views/statistics/MarketingSales'
import WeeklySalesBg from '@views/statistics/WeeklySalesBg'
import Sales from '@views/statistics/Sales'
import LiveVisitors from '@views/statistics/LiveVisitors'
import HorizontalStatisticsCard from '@views/statistics/HorizontalStatisticsCard'
import CustomerStatisticsCard from '@views/statistics/CustomerStatisticsCard'
import UserListCards from '@views/statistics/UserListCards'

// Data Imports
import LogisticsStatisticsCard from '@/views/statistics/LogisticsStatisticsCard'
import { getStatisticsData } from '@/app/server/actions'
import { useEffect, useState } from 'react'
import apiService from '@/services/api'
import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'
import BotAgentCard from '@/components/card-statistics/HorizontalWithSubtitle'

const Statistics = () => {
  const [agentList, setAgentList] = useState()
  const getUserData = async () => {
    try {
      const response = await apiService.get('/api/v1/bot_agents?sort_by=created_at&sort_direction=desc') // Assuming the endpoint is /users
      console.log('sfdsfd', response)
      setAgentList(response?.data?.data)
      // return response
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])
  console.log('agentListagentList', agentList)
  return (
    <Grid container spacing={6}>
      {agentList?.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <BotAgentCard {...item} />
        </Grid>
      ))}
      {/* <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <Characters data={data.statsCharacter} />
      </Grid>
      <Grid item xs={12}>
        <LogisticsStatisticsCard data={data?.statsHorizontalWithBorder} />
      </Grid>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <Vertical data={data.statsVertical} />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <BarChart />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <LineChart />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <RadialBarChart />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <StackedBarChart />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <SmoothLineChart />
      </Grid>
      <Grid item xs={12} sm={4} lg={2}>
        <DonutChart />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <SalesProfit />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <TotalVisits />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <SalesMonth />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <OrdersImpressions />
      </Grid>
      <Grid item xs={12}>
        <HorizontalStatisticsCard data={data?.statsHorizontalWithAvatar} />
      </Grid>
      <Grid item xs={12}>
        <CustomerStatisticsCard customerStatData={data?.customerStats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <MarketingSales />
      </Grid>
      <Grid item xs={12} md={6}>
        <LiveVisitors />
      </Grid>
      <Grid item xs={12} md={6}>
        <WeeklySalesBg />
      </Grid>
      <Grid item xs={12} md={6}>
        <Sales />
      </Grid> */}
    </Grid>
  )
}

export default Statistics
