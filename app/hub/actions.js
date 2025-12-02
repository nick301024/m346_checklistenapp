'use server'

import { createClient } from "@/lib/supabase/server"

export async function updateList(data) {
	const supabase = await createClient()

	await supabase
		.from('checkliste')
		.update(data)
		.eq('id', data.id)
}

export async function createList(data) {
	const supabase = await createClient()

	await supabase
		.from('checkliste')
		.insert({...data, user_id: supabase.auth.getUser().data.user.id})
}

export async function removeList(id) {
	const supabase = await createClient()

	await supabase
		.from('checkliste')
		.delete()
        .eq('id', id)
}

