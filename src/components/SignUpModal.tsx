import { useState } from "react";
import { supabase } from "../supabase-client";
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
export function SignUpModal({
  setOpenModal,
  setIsUserSignIn,
  setFetchedUserData,
}: PropsType) {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error: SignUpError } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
    });

    if (SignUpError) {
      console.error("Error Sign Up ", SignUpError.message);
      return;
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        user_name: signUpData.name,
        email: signUpData.email,
      },
    ]);

    if (insertError) {
      console.log("Error insert ", insertError.message);
      return;
    }
    setFetchedUserData({
      user_name: signUpData.name,
      data: null,
    });
    setIsUserSignIn("Sign Out");
    setOpenModal("");
  };

  return (
    <form
      onSubmit={(e) => {
        signUpHandler(e);
      }}
      className=" flex flex-col relative items-center justify-around w-120 h-100 bg-surface rounded-2xl border-1 border-primary"
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setSignUpData((prev) => ({ ...prev, name: e.target.value }));
          }}
          placeholder="Write your name..."
          id="name"
          className="outline-none border-1 border-primary rounded-2xl px-3 text-text-primary"
        />
      </span>
      <span className="w-8/10 flex justify-end px-10">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setSignUpData((prev) => ({ ...prev, email: e.target.value }));
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
            setSignUpData((prev) => ({ ...prev, password: e.target.value }));
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
        Sign Up
      </button>
    </form>
  );
}
