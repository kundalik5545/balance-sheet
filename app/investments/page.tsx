'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Tables<'transactions'>[]>([])
  const [totalInvested, setTotalInvested] = useState(0)
  const [monthlyData, setMonthlyData] = useState<any[]>([])

  useEffect(() => {
    async function fetchInvestments() {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', 'INVESTMENT')
        .order('date', { ascending: true })

      if (data) {
        setInvestments(data)
        setTotalInvested(
          data.reduce((sum, investment) => sum + investment.amount, 0)
        )

        // Process monthly data for the chart
        const monthlyTotals: { [key: string]: number } = {}
        let runningTotal = 0

        data.forEach((investment) => {
          const month = investment.date.slice(0, 7) // Get YYYY-MM
          runningTotal += investment.amount
          monthlyTotals[month] = runningTotal
        })

        const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
          month,
          total,
        }))

        setMonthlyData(chartData)
      }
    }

    fetchInvestments()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Investments</h1>
        <Button>Add Investment</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Invested</CardTitle>
            <CardDescription>Your total investment amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalInvested.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment Growth</CardTitle>
            <CardDescription>Cumulative investment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value}`, 'Total Invested']}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment History</CardTitle>
          <CardDescription>Your investment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div
                key={investment.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <div className="font-medium">
                    {investment.description || investment.category}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(investment.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="font-medium">${investment.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}