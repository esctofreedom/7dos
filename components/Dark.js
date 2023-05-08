import useDarkMode from "./useDarkMode";
import { Lightbulb, Moon } from "lucide-react";

const ToggleDark = ({ colorTheme, setTheme }) => {
  return (
    <>
      {colorTheme === "light" ? (
        // create toggle that changes the theme
        <div className="flex justify-center items-center">
          <button
            className="flex items-center justify-center w-full px-4 py-1   rounded-md
          hover:bg-gray-200 dark:hover:bg-denim-700 bg-yellow-500/30  border-2 border-yellow-400 "
            onClick={() => {
              setTheme("light");
            }}
          >
            <Lightbulb className="w-5 h-5 ml-2 -mr-1 text-yellow-500 " />
          </button>

          <button
            className="flex items-center justify-center w-full px-4 py-1   rounded-md
          hover:bg-gray-200 dark:hover:bg-denim-700 "
            onClick={() => {
              setTheme("dark");
            }}
          >
            <Moon className="w-5 h-5 ml-2 -mr-1 text-gray-700 dark:text-denim-200" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            className={`flex items-center justify-center w-full px-4 py-1   rounded-md
          hover:bg-gray-200 dark:hover:bg-denim-700 `}
            onClick={() => {
              setTheme("dark");
            }}
          >
            <Moon className="w-5 h-5 ml-2 -mr-1 text-gray-700 dark:text-denim-200" />
          </button>

          <button
            className="flex items-center justify-center w-full px-4 py-1   rounded-md
          hover:bg-gray-200 dark:hover:bg-denim-700"
            onClick={() => {
              setTheme("light");
            }}
          >
            <Lightbulb className="w-5 h-5 ml-2 -mr-1 text-gray-700 dark:text-denim-200" />
          </button>
        </div>
      )}
    </>
  );
};

const ButtonDark = ({ colorTheme, setTheme }) => {
  return (
    <>
      {colorTheme === "light" ? (
        <button onClick={() => setTheme("light")}>
          <div className="rounded-full h-8 w-8 hover:bg-yellow-500 hover:bg-opacity-40 flex hover:scale-110 items-center justify-center transition ease-in-out border-2 border-yellow-500 border-opacity-30">
            <Lightbulb
              className="text-yellow-500 "
              height={"1.5rem"}
              width={"1.5rem"}
            />
          </div>
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <div className="rounded-full h-8 w-8 hover:bg-gray-400 hover:bg-opacity-30 flex hover:scale-110 items-center justify-center transition ease-in-out  border-2 border-gray-500 border-opacity-30">
            <Moon
              className="text-gray-600 "
              height={"1.5rem"}
              width={"1.5rem"}
            />
          </div>
        </button>
      )}
    </>
  );
};

export const Dark = () => {
  //  style can be 0 or 1
  // 0 means circular button
  // 1 means toggle

  const [colorTheme, setTheme] = useDarkMode();

  const style = 0;
  console.log("0", style);
  return (
    <>
      {style === 0 && (
        <ButtonDark colorTheme={colorTheme} setTheme={setTheme} />
      )}
      {style === 1 && (
        <ToggleDark colorTheme={colorTheme} setTheme={setTheme} />
      )}
    </>
  );
};
