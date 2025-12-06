import { useEffect } from "react";

export default function useKey(Key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === Key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [Key, action]
  );
}
