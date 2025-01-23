export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bank_accounts: {
        Row: {
          id: string
          user_id: string
          bank_name: string
          account_number: string | null
          opening_balance: number
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bank_name: string
          account_number?: string | null
          opening_balance?: number
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bank_name?: string
          account_number?: string | null
          opening_balance?: number
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      account_balances: {
        Row: {
          id: string
          bank_account_id: string
          current_balance: number
          remaining_balance: number
          total_deposits: number
          total_withdrawals: number
          last_updated: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          bank_account_id: string
          current_balance?: number
          remaining_balance?: number
          total_deposits?: number
          total_withdrawals?: number
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bank_account_id?: string
          current_balance?: number
          remaining_balance?: number
          total_deposits?: number
          total_withdrawals?: number
          last_updated?: string
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          bank_account_id: string
          type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'INVESTMENT'
          amount: number
          description: string | null
          category: string
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bank_account_id: string
          type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'INVESTMENT'
          amount: number
          description?: string | null
          category: string
          date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bank_account_id?: string
          type?: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'INVESTMENT'
          amount?: number
          description?: string | null
          category?: string
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      transaction_type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'INVESTMENT'
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]