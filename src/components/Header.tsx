import { useState } from "react";
import { useTheme } from "../context/themeContext";
import { Moon, Sun } from "lucide-react";
import SheetWrapper from "./SheetWrapper";
const Header = () => {
  const { setTheme, theme } = useTheme();
  const [openSheet, setOpenSheet] = useState(false);
  const handleThemeChange = (theme: "light" | "dark") => {
    setTheme(theme);
  };
  const handleSheetOpen = () => {
    setOpenSheet(!openSheet);
  };
  return (
    <div className="flex px-10 items-center justify-between h-full">
      <div className="logo font-medium">T-A-X-I-T-Y</div>
      <div className="context flex gap-5 ">
        <p className="font-medium cursor-pointer" onClick={handleSheetOpen}>
          View History
        </p>
        <span className="flex items-center justify-center cursor-pointer">
          {theme === "dark" && (
            <Moon onClick={() => handleThemeChange("light")} />
          )}
          {theme === "light" && (
            <Sun onClick={() => handleThemeChange("dark")} />
          )}
        </span>
      </div>
      <SheetWrapper openSheet={openSheet} handleOpenSheet={handleSheetOpen}>
        <div className="h-full flex items-center justify-center text-xl font-bold">
          Coming soon
        </div>
      </SheetWrapper>
    </div>
  );
};

export default Header;
