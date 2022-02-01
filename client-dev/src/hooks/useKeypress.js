import { useEffect } from "react";

const useKeypress = (callback) => {
  useEffect(() => {
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [callback]);
};

export default useKeypress;
