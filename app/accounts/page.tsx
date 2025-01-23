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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/lib/supabase/types'
import { useToast } from '@/hooks/use-toast'

type BankAccount = Tables<'bank_accounts'> & {
  account_balances: Tables<'account_balances'>[]
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchAccounts()
  }, [])

  async function fetchAccounts() {
    const { data, error } = await supabase
      .from('bank_accounts')
      .select('*, account_balances(*)')

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch accounts',
        variant: 'destructive',
      })
      return
    }

    setAccounts(data)
  }

  async function handleAddAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const bankName = formData.get('bankName') as string
    const accountNumber = formData.get('accountNumber') as string
    const openingBalance = parseFloat(formData.get('openingBalance') as string)
    const isDefault = formData.get('isDefault') === 'on'

    try {
      const { error } = await supabase.from('bank_accounts').insert({
        bank_name: bankName,
        account_number: accountNumber,
        opening_balance: openingBalance,
        is_default: isDefault,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      })

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Account has been added',
      })

      fetchAccounts()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add account',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bank Accounts</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
              <DialogDescription>
                Add a new bank account to track your finances
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  name="bankName"
                  placeholder="Enter bank name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Enter account number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="openingBalance">Opening Balance</Label>
                <Input
                  id="openingBalance"
                 <boltAction type="file" filePath="app/accounts/page.tsx">                  name="openingBalance"
                  type="number"
                  step="0.01"
                  placeholder="Enter opening balance"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="isDefault" name="isDefault" />
                <Label htmlFor="isDefault">Set as default account</Label>
              </div>
              <Button type="submit">Add Account</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle>{account.bank_name}</CardTitle>
              <CardDescription>
                {account.account_number
                  ? `****${account.account_number.slice(-4)}`
                  : 'No account number'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Balance</span>
                  <span className="font-medium">
                    $
                    {account.account_balances[0]?.current_balance.toFixed(2) ||
                      '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Deposits</span>
                  <span className="font-medium">
                    $
                    {account.account_balances[0]?.total_deposits.toFixed(2) ||
                      '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Withdrawals</span>
                  <span className="font-medium">
                    $
                    {account.account_balances[0]?.total_withdrawals.toFixed(2) ||
                      '0.00'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}