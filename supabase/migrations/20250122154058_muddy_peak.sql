/*
  # Initial Schema Setup for Expense Tracker

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - name (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - bank_accounts
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - bank_name (text)
      - account_number (text, optional)
      - opening_balance (decimal)
      - is_default (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - account_balances
      - id (uuid, primary key)
      - bank_account_id (uuid, foreign key)
      - current_balance (decimal)
      - remaining_balance (decimal)
      - total_deposits (decimal)
      - total_withdrawals (decimal)
      - last_updated (timestamp)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - transactions
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - bank_account_id (uuid, foreign key)
      - type (enum)
      - amount (decimal)
      - description (text)
      - category (text)
      - date (date)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create transaction_type enum
CREATE TYPE transaction_type AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER', 'INVESTMENT');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bank_accounts table
CREATE TABLE IF NOT EXISTS bank_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  bank_name text NOT NULL,
  account_number text,
  opening_balance decimal(12,2) NOT NULL DEFAULT 0,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create account_balances table
CREATE TABLE IF NOT EXISTS account_balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_account_id uuid REFERENCES bank_accounts(id) ON DELETE CASCADE NOT NULL,
  current_balance decimal(12,2) NOT NULL DEFAULT 0,
  remaining_balance decimal(12,2) NOT NULL DEFAULT 0,
  total_deposits decimal(12,2) NOT NULL DEFAULT 0,
  total_withdrawals decimal(12,2) NOT NULL DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  bank_account_id uuid REFERENCES bank_accounts(id) ON DELETE CASCADE NOT NULL,
  type transaction_type NOT NULL,
  amount decimal(12,2) NOT NULL,
  description text,
  category text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own bank accounts" ON bank_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bank accounts" ON bank_accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bank accounts" ON bank_accounts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bank accounts" ON bank_accounts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own account balances" ON account_balances
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM bank_accounts
      WHERE bank_accounts.id = account_balances.bank_account_id
      AND bank_accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own account balances" ON account_balances
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM bank_accounts
      WHERE bank_accounts.id = account_balances.bank_account_id
      AND bank_accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own account balances" ON account_balances
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM bank_accounts
      WHERE bank_accounts.id = account_balances.bank_account_id
      AND bank_accounts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bank_accounts_updated_at
  BEFORE UPDATE ON bank_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_account_balances_updated_at
  BEFORE UPDATE ON account_balances
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Function to update account balances after transaction
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update account balance based on transaction type
    UPDATE account_balances
    SET 
      current_balance = CASE 
        WHEN NEW.type IN ('INCOME') THEN current_balance + NEW.amount
        WHEN NEW.type IN ('EXPENSE', 'INVESTMENT') THEN current_balance - NEW.amount
        ELSE current_balance
      END,
      total_deposits = CASE 
        WHEN NEW.type = 'INCOME' THEN total_deposits + NEW.amount
        ELSE total_deposits
      END,
      total_withdrawals = CASE 
        WHEN NEW.type IN ('EXPENSE', 'INVESTMENT') THEN total_withdrawals + NEW.amount
        ELSE total_withdrawals
      END,
      last_updated = now()
    WHERE bank_account_id = NEW.bank_account_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating account balance
CREATE TRIGGER update_balance_after_transaction
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_account_balance();

-- Function to create initial account balance
CREATE OR REPLACE FUNCTION create_initial_account_balance()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO account_balances (bank_account_id, current_balance, remaining_balance)
  VALUES (NEW.id, NEW.opening_balance, NEW.opening_balance);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for creating initial account balance
CREATE TRIGGER create_account_balance_on_bank_account
  AFTER INSERT ON bank_accounts
  FOR EACH ROW
  EXECUTE FUNCTION create_initial_account_balance();