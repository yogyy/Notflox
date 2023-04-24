import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NavbarItem from '../NavbarItem';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import Search from './Search';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open);

      setState({ ...state, [anchor]: open });
    };

  return (
    <div className="block lg:hidden">
      <button className="text-red-600" onClick={toggleDrawer('left', true)}>
        <Bars3BottomLeftIcon className="w-8" />
      </button>
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        disableEnforceFocus
      >
        <div className="w-[60vw] md:w-[40vw] bg-[#131313] h-full">
          <div className="flex md:hidden justify-around mt-2 mr-2 p-1 text-white">
            <Search />
          </div>
          <NavbarItem className="flex-col flex ml-2 gap-3" />
        </div>
      </Drawer>
    </div>
  );
}
