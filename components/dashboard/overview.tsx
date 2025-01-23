'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function Overview() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const now = new Date()
      const startOfYear = new Date(now.getFullYear(), 0, 1)

      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .gte('date', startOfYear.toISOString())

      const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        name: new Date(0, i).toLocaleString('default', { month: 'short' }),
        income: 0,
        expenses: 0,
      }))

      transactions?.forEach((tx) => {
        const month = new Date(tx.date).getMonth()
        if (tx.type === 'INCOME') {
          monthlyData[month].income += tx.amount
        } else if (tx.type === 'EXPENSE' || tx.type === 'INVESTMENT') {
          monthlyData[month].expenses += tx.amount
        }
      })

      setData(monthlyData)
    }

    fetchData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
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
        <Bar
          dataKey="income"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expenses"
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}