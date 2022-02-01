import { useEffect, useState, useRef } from "react";

const useHotkeys = () => {
  const [heldKeys, setHeldKeys] = useState([]);
  const heldKeysRef = useRef;
  heldKeysRef.current = heldKeys;

  useEffect(() => {
    function handleKeyEvent(event, isUpEvent) {
      const keyName = event.key;
      if (!isUpEvent && !heldKeysRef.current.includes(keyName)) {
        setHeldKeys((prevState) => {
          return [...prevState, keyName];
        });
      }
      if (isUpEvent && heldKeysRef.current.includes(keyName)) {
        setHeldKeys((prevState) =>
          prevState.filter((name) => name !== keyName)
        );
      }
    }

    function handleKeyDown(event) {
      handleKeyEvent(event, false);
    }

    function handleKeyUp(event) {
      handleKeyEvent(event, true);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [heldKeysRef]);
  return heldKeys;
};

export default useHotkeys;
