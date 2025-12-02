import { createClient } from "@/lib/supabase/server"
import HubClient from "./hub-client"

export default async function Hub() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
    if (!user) {
        return <div>Not authorized</div>
    }

    const { data } = await supabase
        .from('checkliste')
        .select()
        .eq('user_id', user.id)
        
    return(
        <div>
            <HubClient myData={ data } /> 
        </div>
    )
}