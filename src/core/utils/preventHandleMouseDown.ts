import { MouseEvent } from 'react';

export const preventHandleMouseDown = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
  event.preventDefault();
};
