import { useEffect } from "react";

export function useKey(key, fun) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() == key.toLowerCase()) {
          fun();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, fun]
  );
}
