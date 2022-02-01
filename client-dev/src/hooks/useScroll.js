import { useEffect, useRef, useState } from "react";

const useScroll = () => {

  const [scrollPercentage, setScrollPercentage] = useState(0);

  const elementRef = useRef();

  const element = elementRef.current;

  useEffect(() => {

    const onScrollHandler = () => {

      const scrollPercentage =
      element.scrollTop / (element.scrollHeight - element.clientHeight);
  
      setScrollPercentage(scrollPercentage);
    };
    if(element) {
      element.addEventListener("scroll", onScrollHandler);

    }
    return () => {
      if (element) {
        element.removeEventListener("scroll", onScrollHandler);

      }
    };
  }, [setScrollPercentage, element]);

  return { elementRef, scrollPercentage };
};

export default useScroll;
