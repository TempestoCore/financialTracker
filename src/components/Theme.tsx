import { FaRegMoon } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { useState } from "react";
export function Theme() {
  const [switchTheme, setSwitchTheme] = useState(false);

  const switchThemeHandler = () => {
    document.documentElement.classList.add("theme-changing");
    document.documentElement.classList.toggle("dark");

    setTimeout(() => {
      document.documentElement.classList.remove("theme-changing");
    }, 50);
  };

  return (
    <div className="flex justify-center items-center absolute left-1/2">
      <CiSun
        onClick={() => {
          setSwitchTheme(true);
          switchThemeHandler();
        }}
        className={`absolute size-15 cursor-pointer text-primary ${
          switchTheme
            ? "opacity-0 invisible rotate-180"
            : "opacity-100 rotate-0"
        } transition-all duration-500`}
      />
      <FaRegMoon
        onClick={() => {
          setSwitchTheme(false);
          switchThemeHandler();
        }}
        className={`absolute size-11 cursor-pointer text-primary ${
          switchTheme
            ? "opacity-100 rotate-0"
            : "opacity-0 invisible rotate-180"
        } transition-all duration-500`}
      />
    </div>
  );
}
