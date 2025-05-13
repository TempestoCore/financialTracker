import { supabase } from "../supabase-client";
import { useState } from "react";
interface PropsType {
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
  setIsUserSignIn: React.Dispatch<React.SetStateAction<string>>;
  setFetchedUserData: React.Dispatch<
    React.SetStateAction<{
      user_name: string;
      data: string | null;
    }>
  >;
}
export function SignInModal({
  setOpenModal,
  setIsUserSignIn,
  setFetchedUserData,
}: PropsType) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error: SignInError } = await supabase.auth.signInWithPassword(
      {
        email: userEmail,
        password: userPassword,
      }
    );

    if (SignInError) {
      console.error("Error Sign In ", SignInError.message);
      return;
    }

    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("user_name, data")
      .eq("email", `${data.user.email}`);

    if (fetchError) {
      console.error("Error fetch user data ", fetchError.message);
      return;
    }

    setFetchedUserData(userData[0]);
    setIsUserSignIn("Sign Out");
    setOpenModal("");
  };

  return (
    <form
      onSubmit={(e) => {
        signInHandler(e);
      }}
      className="flex flex-col relative items-center justify-around w-120 h-100 bg-surface rounded-2xl border-1 border-primary"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpenModal("");
        }}
        className="absolute top-0 right-0 p-2 m-2 border-2 border-primary rounded-2xl secondary-text text-text-primary hover:bg-secondary transition-colors duration-500"
      >
        Close
      </button>
      <span className="w-8/10 flex justify-end px-10">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          placeholder="Write your email..."
          id="email"
          className="outline-none border-1 border-primary rounded-2xl px-3 text-text-primary"
        />
      </span>
      <span className="w-8/10 flex justify-end px-10">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          placeholder="Write your password"
          id="password"
          className="outline-none border-1 border-primary rounded-2xl px-3 text-text-primary"
        />
      </span>
      <button
        type="submit"
        className="p-2 border-2 border-primary rounded-2xl main-text text-text-primary hover:bg-secondary transition-colors duration-500"
      >
        Sign In
      </button>
    </form>
  );
}
