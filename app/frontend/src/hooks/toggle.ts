import { useState } from 'react';

export function useToggle(initialState: boolean) {
  const [isToggled, setIsToggled] = useState(initialState);

  function toggle() {
    setIsToggled(!isToggled);
  }

  function set(val: boolean) {
    setIsToggled(val);
  }

  return [isToggled, toggle, set];
}
