import "./App.css";
import { UserContextProvider } from "./components/UserContext";
import { Header } from "./components/Header";
import { Data } from "./components/Data";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { SignInModal } from "./components/SignInModal";
import { SignUpModal } from "./components/SignUpModal";
import { AddModal } from "./components/AddModal";
import { supabase } from "./supabase-client";
import { useRef } from "react";
export interface UserDataType {
  data: {
    period: [string, number]; // String is period name, number is date of creating
    profit: [number, number][] | []; // First number is date, second profit value.
    expenses: [number, number][] | []; // First number is date, second expenses value.
  } | null;
}
export interface AllUserDataType {
  user_name: string;
  allData: UserDataType[] | [];
}

function App() {
  const [openModal, setOpenModal] = useState("");
  const [isUserSignIn, setIsUserSignIn] = useState("");
  const [fetchedUserData, setFetchedUserData] = useState<{
    user_name: string;
    data: string | null;
  }>({
    user_name: "",
    data: "",
  });
  const [userData, setUserData] = useState<AllUserDataType>({
    user_name: "",
    allData: [],
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const FetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetch user ", error.message);
      setIsUserSignIn("Sign In");
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

    if (userData[1] && typeof userData[1] == "string") {
      const dataObj = JSON.parse(userData[1]);
      setUserData(dataObj);
    }
    setIsUserSignIn("Sign Out");

    console.log(data);
    console.log(userData);
  };

  useEffect(() => {
    FetchUser();
  }, []);

  return (
    <UserContextProvider>
      <div
        className={`min-w-screen min-h-screen bg-background flex flex-col justify-between z-10 ${
          openModal
            ? "pointer-events-none overflow-hidden"
            : "pointer-events-auto overflow-auto"
        }`}
      >
        <div
          className={
            openModal
              ? `fixed flex justify-center items-center z-20 top-0 left-0 min-w-screen min-h-screen bg-black/50 pointer-events-auto`
              : "hidden"
          }
        >
          {openModal == "Sign Up" ? (
            <SignUpModal
              setOpenModal={setOpenModal}
              setIsUserSignIn={setIsUserSignIn}
              setFetchedUserData={setFetchedUserData}
            />
          ) : openModal == "Sign In" ? (
            <SignInModal
              setOpenModal={setOpenModal}
              setIsUserSignIn={setIsUserSignIn}
              setFetchedUserData={setFetchedUserData}
            />
          ) : (
            openModal == "Add" && (
              <AddModal setOpenModal={setOpenModal} setUserData={setUserData} />
            )
          )}
        </div>
        <Header
          setOpenModal={setOpenModal}
          isUserSignIn={isUserSignIn}
          setIsUserSignIn={setIsUserSignIn}
          fetchedUserData={fetchedUserData}
          setFetchedUserData={setFetchedUserData}
        />
        <div className="flex grow">
          <div
            ref={scrollRef}
            className="flex grow overflow-x-auto snap-x snap-mandatory w-full hide-scrollbar hide-scrollbar"
          >
            {userData.allData.length == 0 ? (
              <div className="flex justify-center items-center w-full main-text text-text-primary">
                For start add new transition period
              </div>
            ) : (
              userData.allData.map((elem, idx) => (
                <Data
                  key={elem.data?.period[1]}
                  elem={elem}
                  idx={idx}
                  setUserData={setUserData}
                />
              ))
            )}
          </div>
        </div>
        <Footer scrollRef={scrollRef} setOpenModal={setOpenModal} />
      </div>
    </UserContextProvider>
  );
}

export default App;
