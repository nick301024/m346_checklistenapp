import { createClient } from "@/lib/supabase/server"

export default async function Checklists(){
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()
    console.log(user?.id)
    return(
        <div className="these">
            <p>test</p>
        </div>
    )
}