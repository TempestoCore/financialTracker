import type { UserDataType } from "../App";
import type { AllUserDataType } from "../App";
import { useState } from "react";
interface PropsType {
  elem: UserDataType;
  idx: number;
  setUserData: React.Dispatch<React.SetStateAction<AllUserDataType>>;
}

export function Data({ elem, idx, setUserData }: PropsType) {
  const [addElement, setAddElement] = useState([false, false]);
  const [addElementValue, setAddElementValue] = useState(["", ""]);
  const [sum, setSum] = useState(0);

  const elementTime = (time: number) => {
    const now = new Date();
    now.setTime(time);
    let hours: string | number = now.getHours();
    let minutes: string | number = now.getMinutes();
    if (hours <= 9) {
      hours = "0" + `${hours}`;
    }
    if (minutes <= 9) {
      minutes = "0" + `${minutes}`;
    }
    return `${hours}:${minutes} ${now.getDate()}:${
      now.getMonth() + 1
    }:${now.getFullYear()}`;
  };

  const addProfitHandler = () => {
    const now = new Date();
    const time = now.getTime();
    if (addElementValue[0] == "") return;
    setUserData((prevState) => {
      // Создаем глубокую копию состояния
      const newAllData = [...prevState.allData];

      // Проверяем, существует ли data и profit
      if (newAllData[idx]?.data?.profit) {
        newAllData[idx] = {
          ...newAllData[idx],
          data: {
            ...newAllData[idx].data,
            profit: [
              ...newAllData[idx].data!.profit!,
              [Number(addElementValue[0]), time],
            ],
          },
        };
      } else if (newAllData[idx]?.data) {
        // Если profit null или undefined, создаем новый массив
        newAllData[idx] = {
          ...newAllData[idx],
          data: {
            ...newAllData[idx].data,
            profit: [[Number(addElementValue[0]), time]],
          },
        };
      } else if (newAllData[idx]) {
        // Если data null или undefined, создаем всю структуру
        newAllData[idx] = {
          ...newAllData[idx],
          data: {
            period: ["", 0], // нужно указать значения по умолчанию
            profit: [[Number(addElementValue[0]), time]],
            expenses: [],
          },
        };
      }

      return {
        ...prevState,
        allData: newAllData,
      };
    });
  };

  const addExpensesHandler = () => {
    const now = new Date();
    const time = now.getTime();
    if (addElementValue[1] == "") return;
    setUserData((prevState) => {
      // Создаем глубокую копию состояния
      const newAllData = [...prevState.allData];

      // Проверяем, существует ли data и profit
      if (newAllData[idx]?.data?.expenses) {
        newAllData[idx] = {
          ...newAllData[idx],
          data: {
            ...newAllData[idx].data,
            expenses: [
              ...newAllData[idx].data!.expenses!,
              [Number(addElementValue[1]), time],
            ],
          },
        };
      } else if (newAllData[idx]?.data) {
        // Если expenses null или undefined, создаем новый массив
        newAllData[idx] = {
          ...newAllData[idx],
          data: {
            ...newAllData[idx].data,
            expenses: [[Number(addElementValue[1]), time]],
          },
        };
      } else if (newAllData[idx]) {
        // Если data null или undefined, создаем всю структуру
        newAllData[idx] = {
          ...newAllData[idx],
          data: {
            period: ["", 0], // нужно указать значения по умолчанию
            expenses: [[Number(addElementValue[1]), time]],
            profit: [],
          },
        };
      }

      return {
        ...prevState,
        allData: newAllData,
      };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^-?\d*\.?\d{0,2}$/.test(input)) {
      setAddElementValue([input, ""]);
    }
  };
  const handleChangeEx = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^-?\d*\.?\d{0,2}$/.test(input)) {
      setAddElementValue(["", input]);
    }
  };

  return (
    <div className="flex flex-none snap-always snap-center w-full h-full">
      <div className="flex flex-col grow items-center m-5 bg-surface rounded-2xl border-1 border-primary">
        <div className="main-text text-text-primary py-4">
          {elem.data?.period[0] + " " + idx}
        </div>
        <div
          className={`secondary-text pb-4 ${
            sum > 0 ? `text-success` : `text-error`
          }`}
        >
          {sum}
        </div>
        <div className="flex w-9/10 justify-around gap-10 border-1 h-full mb-4 border-primary rounded-2xl secondary-text">
          <div className="grid grid-cols-1 w-4/10 gap-4 justify-items-center">
            <div className="secondary-text text-text-secondary">
              Profit - Time
            </div>
            {elem.data?.profit.map((elem) => (
              <div
                key={Math.random()}
                className="secondary-text text-text-secondary"
              >
                <span className="text-success">{elem[0]}</span>
                {` - ${elementTime(elem[1])}`}
              </div>
            ))}

            {addElement[0] && (
              <input
                inputMode="numeric"
                type="text"
                value={addElementValue[0]}
                onChange={handleChange}
                className=" border-1 border-primary rounded-2xl w-8/10 h-10 px-2 outline-none"
              ></input>
            )}
            {!addElement[0] ? (
              <button
                onClick={() => {
                  setAddElementValue(["", ""]);
                  setAddElement([true, false]);
                }}
                className="bg-primary w-40 h-10 py-1 rounded-2xl secondary-text text-text-primary hover:bg-secondary"
              >
                Add new profit
              </button>
            ) : (
              <button
                onClick={() => {
                  addProfitHandler();
                  setSum((prev) => prev + Number(addElementValue[0]));
                  setAddElement([false, false]);
                }}
                className="bg-primary w-40 h-10 py-1 rounded-2xl secondary-text text-text-primary hover:bg-secondary"
              >
                Save
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 w-4/10 gap-4 justify-items-center">
            <div className="secondary-text text-text-secondary">
              Expenses - Time
            </div>
            {elem.data?.expenses.map((elem) => (
              <div
                key={Math.random()}
                className="secondary-text text-text-secondary"
              >
                <span className="text-error">{elem[0]}</span>
                {` - ${elementTime(elem[1])}`}
              </div>
            ))}

            {addElement[1] && (
              <input
                inputMode="numeric"
                type="text"
                value={addElementValue[1]}
                onChange={handleChangeEx}
                className=" border-1 border-primary rounded-2xl w-8/10 h-10 px-2 outline-none"
              ></input>
            )}
            {!addElement[1] ? (
              <button
                onClick={() => {
                  setAddElementValue(["", ""]);
                  setAddElement([false, true]);
                }}
                className="bg-primary w-40 h-10 py-1 rounded-2xl secondary-text text-text-primary hover:bg-secondary"
              >
                Add new expenses
              </button>
            ) : (
              <button
                onClick={() => {
                  addExpensesHandler();
                  setSum((prev) => prev - Number(addElementValue[1]));
                  setAddElement([false, false]);
                }}
                className="bg-primary w-40 h-10 py-1 rounded-2xl secondary-text text-text-primary hover:bg-secondary"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
