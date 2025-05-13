import { supabase } from "../supabase-client";

export function SignOut() {
  const SignOutHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error: SignOutError } = await supabase.auth.signOut();
    if (SignOutError) {
      console.error("Error Sign In ", SignOutError.message);
      return;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        SignOutHandler(e);
      }}
      className="flex flex-col relative items-center justify-around w-120 h-100 bg-surface rounded-2xl border-1 border-primary"
    >
      <button
        type="submit"
        className="p-2 border-2 border-primary rounded-2xl main-text text-text-primary hover:bg-secondary transition-colors duration-500"
      >
        Sign Out
      </button>
    </form>
  );
}
