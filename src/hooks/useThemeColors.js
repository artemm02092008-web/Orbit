import { useApp } from "../context/AppContext";

export const useThemeColors = () => {
  const { themeColors } = useApp() || {};
  return themeColors || { primary: "#8A56FF", secondary: "#7C6AFA" };
};
