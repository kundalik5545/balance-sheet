'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'
import { ScrollArea } from '@/components/ui/scroll-area'

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Tables<'transactions'>[]>([])

  useEffect(() => {
    async function fetchTransactions() {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .limit(10)

      if (data) {
        setTransactions(data)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.description || transaction.category}
              </p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(transaction.date), 'PPP')}
              </p>
            </div>
            <div
              className={`text-sm font-medium ${
                transaction.type === 'INCOME'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.type === 'INCOME' ? '+' : '-'}$
              {transaction.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}