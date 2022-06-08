import { useRef } from "react";

export const useDebounce = (delay = 300, notDelayInFirstTime = false) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(notDelayInFirstTime);

  const debounce = (func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
      return;
    }

    if (debouncing.current) {
      clearTimeout(debouncing.current);
    }
    debouncing.current = setTimeout(() => {
      func();
    }, delay);
  };

  return { debounce };
};
