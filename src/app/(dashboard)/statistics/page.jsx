// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import Horizontal from '@views/statistics/Horizontal'
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

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/widget-examples` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getStatisticsData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/widget-examples`)

  if (!res.ok) {
    throw new Error('Failed to fetch statisticsData')
  }

  return res.json()
} */
const Statistics = async () => {
  // Vars
  const data = await getStatisticsData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Horizontal data={data.statsHorizontal} />
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
      </Grid>
    </Grid>
  )
}

export default Statistics
