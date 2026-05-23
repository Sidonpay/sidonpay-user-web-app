import { useState, useEffect } from "react";
import PinSetupModal from "../pages/PinSetupmodal";
import { usePinSetup } from "../hooks/usePinSetup";

interface WithPinCheckProps {
  children: React.ReactNode;
}

const WithPinCheck: React.FC<WithPinCheckProps> = ({ children }) => {
  const { isPinActivated } = usePinSetup();
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!isPinActivated()) {
      setShowPinModal(true);
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <>
      {showPinModal && (
        <PinSetupModal onComplete={() => setShowPinModal(false)} />
      )}
      {children}
    </>
  );
};

export default WithPinCheck;