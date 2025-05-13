import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { supabase } from "../supabase-client";

interface PropsType {
  setUserConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Registration({ setUserConfirm }: PropsType) {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [inputNote, setInputNote] = useState("");
  const { setUserData } = useUserContext();

  const signUpHandler = async () => {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    });
    if (signUpError) {
      console.error("Error signing up: ", signUpError.message);
      return;
    }
    const { error: dbError } = await supabase.from("users").insert([
      {
        email: data.user?.email,
        user_name: data.user?.email,
      },
    ]);

    if (dbError) {
      console.error("Error db insert: ", dbError.message);
      return;
    }
  };

  const signInHandler = async () => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    if (signInError) {
      console.error("Error Sign In ", signInError.message);
      return;
    }

    setUserConfirm(true);
  };

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-background">
      <div className="flex flex-col justify-around items-center w-100 md:w-150 h-80 md:h-100 rounded-2xl bg-surface shadow-sm shadow-primary transition-[width, height] duration-300">
        <h1 className="headline-text">Fanatical Tracker</h1>
        <input
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          type="email"
          placeholder="Email..."
          className="bg-background secondary-text focus:outline-primary px-2 rounded-2xl "
        />
        <input
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          type="text"
          placeholder="Password..."
          className="bg-background secondary-text focus:outline-primary px-2 rounded-2xl"
        />
        {inputNote == "Wrong user name or password." ? (
          <p className="text-error secondary-text">{inputNote}</p>
        ) : inputNote == "Registration complete!" ? (
          <p className="text-success secondary-text">{inputNote}</p>
        ) : inputNote == "User with this name already exist" ? (
          <p className="text-secondary-text">{inputNote}</p>
        ) : (
          <></>
        )}
        <div className="flex justify-around w-full">
          <button
            onClick={signUpHandler}
            type="button"
            className="bg-primary secondary-text text-background p-2 w-28 rounded-2xl hover:bg-secondary transition-colors duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={signInHandler}
            type="button"
            className="bg-primary secondary-text text-background p-2 w-28 rounded-2xl hover:bg-secondary transition-colors duration-300"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
