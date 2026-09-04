import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TransactionDataTable from '@/components/TransactionDataTable'

export const dynamic = 'force-dynamic'

export default async function TransactionsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all transactions for the user
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select(`
      id, 
      amount, 
      type, 
      merchant, 
      date, 
      is_recurring, 
      note, 
      raw_description,
      category_id,
      payment_source_id,
      categories (id, name, color, icon),
      payment_sources (id, name, type, last_four)
    `)
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  // Fetch all categories for the dropdown in the drawer
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, color, icon')
    .order('name')

  return (
    <div className="flex flex-col gap-6 relative max-w-7xl mx-auto w-full">
      <TransactionDataTable 
        transactions={transactions || []} 
        categories={categories || []} 
      />
    </div>
  )
}
