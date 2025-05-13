import { useState } from "react";
import type { AllUserDataType } from "../App";
interface PropsType {
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
  setUserData: React.Dispatch<React.SetStateAction<AllUserDataType>>;
}
export function AddModal({ setOpenModal, setUserData }: PropsType) {
  const [addData, setAddDada] = useState("");

  const saveNewPeriodHandler = () => {
    const now = new Date();
    const timeOfCreating = now.getTime();
    setUserData((prev) => ({
      user_name: prev.user_name,
      allData: [
        ...prev.allData,
        {
          data: {
            period: [addData, timeOfCreating],
            profit: [],
            expenses: [],
          },
        },
      ],
    }));
    setOpenModal("");
  };

  return (
    <div className="flex flex-col justify-around w-6/10 h-50 bg-surface rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="Name">Transition period name:</label>
        <input
          type="text"
          id="Name"
          className="border-primary text-text-primary px-2 outline-none border-1 rounded-2xl mt-4"
          placeholder="Name..."
          onChange={(e) => {
            setAddDada(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={saveNewPeriodHandler}
          className="text-text-primary bg-primary px-3 py-1 rounded-2xl hover:bg-secondary"
        >
          Save
        </button>
      </div>
    </div>
  );
}
