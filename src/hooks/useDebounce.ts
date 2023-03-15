import { useRef } from "react";
export default function useDebounce({ time = 400 }: { time?: number }) {
  const timeout = useRef<NodeJS.Timeout>(null);

  const debounceOnClick = (cb: (...args: any) => void) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      cb();
    }, time);
  };

  return {
    debounceOnClick,
  };
}
