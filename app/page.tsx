import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import HubClient from "./hub/hub-client";

export default async function Home() {
  const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return <div>Not authorized</div>
    }

    const { data } = await supabase
        .from('checkliste')
        .select()
        .eq('user_id', user.id)
		    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              
              <AuthButton />
            </div>
          </nav>
          <main >
            <HubClient myData={ data } /> 
          </main>
        </div>
      </div>
    </main>
  );
}
