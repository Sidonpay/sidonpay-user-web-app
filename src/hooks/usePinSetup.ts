export const usePinSetup = () => {
  const isPinActivated = (): boolean => {
    return localStorage.getItem("pinActivated") === "true";
  };

  const activatePin = (pin: string): void => {
    localStorage.setItem("pinActivated", "true");
    localStorage.setItem("userPin", pin);
  };

  return { isPinActivated, activatePin };
};