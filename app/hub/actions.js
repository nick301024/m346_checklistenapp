'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateList(data) {
	const supabase = await createClient()

	await supabase
		.from('checkliste')
		.update(data)
		.eq('id', data.id)
}

export async function createList(data) {
	const supabase = await createClient()
	const userId = (await supabase.auth.getUser()).data.user.id;

	await supabase
		.from('checkliste')
		.insert({...data, user_id: userId})
}

export async function removeList(id) {
	const supabase = await createClient()

	await supabase
		.from('checkliste')
		.delete()
        .eq('id', id)
}

export async function revalidateHome(){
	revalidatePath('/');
}

export async function getData(){
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()

	const { data } = await supabase
        .from('checkliste')
        .select()
        .eq('user_id', user.id)
		.order('created_at', { ascending: false });
	return data;
}

