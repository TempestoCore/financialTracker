import { Theme } from "./Theme";
import { supabase } from "../supabase-client";
interface PropsType {
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
  isUserSignIn: string;
  setIsUserSignIn: React.Dispatch<React.SetStateAction<string>>;
  fetchedUserData: {
    user_name: string;
    data: string | null;
  };
  setFetchedUserData: React.Dispatch<
    React.SetStateAction<{
      user_name: string;
      data: string | null;
    }>
  >;
}
export function Header({
  setOpenModal,
  isUserSignIn,
  setIsUserSignIn,
  fetchedUserData,
  setFetchedUserData,
}: PropsType) {
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error Sign Out ", error.message);
      return;
    }
    setIsUserSignIn("Sign In");
    setFetchedUserData({
      user_name: "",
      data: null,
    });
  };

  function showRegistration() {
    if (isUserSignIn == "Sign Out") {
      return (
        <div className="main-text text-text-secondary">
          <a
            onClick={signOutUser}
            className="main-text text-text-secondary hover:text-primary transition-colors duration-300 cursor-pointer"
          >
            Sign Out
          </a>
        </div>
      );
    }
    if (isUserSignIn == "Sign In") {
      return (
        <div className="main-text text-text-secondary">
          <a
            onClick={() => {
              setOpenModal("Sign Up");
            }}
            className="main-text text-text-secondary hover:text-primary transition-colors duration-300 cursor-pointer"
          >
            Sign Up
          </a>{" "}
          /{" "}
          <a
            onClick={() => {
              setOpenModal("Sign In");
            }}
            className="main-text text-text-secondary hover:text-primary transition-colors duration-300 cursor-pointer"
          >
            Sign In
          </a>
        </div>
      );
    }
  }

  return (
    <header className="flex relative items-center justify-between px-5 min-w-screen h-20 border-b-1 border-collapse border-primary bg-surface select-none">
      <div className="main-text text-text-secondary">
        {fetchedUserData.user_name ? `Hello ${fetchedUserData.user_name}` : ""}
      </div>
      <Theme />
      {showRegistration()}
    </header>
  );
}
