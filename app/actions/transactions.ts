'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateTransaction(id: string, categoryId: number | null, note: string | null) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('transactions')
    .update({ 
      category_id: categoryId,
      note: note
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }
  
  revalidatePath('/transactions')
  revalidatePath('/dashboard')
  
  return { success: true }
}
