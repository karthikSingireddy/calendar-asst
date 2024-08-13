import { useState } from 'react';

export type useToggleReturnType = [boolean, { toggle: () => void, set: (val: boolean) => void }];

export function useToggle(initialState: boolean): useToggleReturnType {
  const [isToggled, setIsToggled] = useState(initialState);

  function toggle() {
    setIsToggled(!isToggled);
  }

  function set(val: boolean) {
    setIsToggled(val);
  }

  return [isToggled, { toggle, set }];
}
