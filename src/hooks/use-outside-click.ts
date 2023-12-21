import { MutableRefObject, useEffect } from "react";

function useOutsideClick({
  ref,
  onClickOutside,
}: {
  ref: MutableRefObject<null | HTMLElement>;
  onClickOutside: () => void;
}): void {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export default useOutsideClick;
