import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import NavbarItem from '../NavbarItem';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { Netflix } from '../icons';

type Anchor = 'left';

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
    <div className="sm:hidden flex items-center">
      <button className="text-red-600" onClick={toggleDrawer('left', true)}>
        <Bars3BottomLeftIcon className="w-5" />
      </button>
      <Drawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        disableEnforceFocus
        className="z-30"
      >
        <div className="w-[200px] sm:hidden bg-[#131313] h-full px-4 py-2">
          {/* <div className="flex md:hidden justify-end mt-2 mr-2 p-1 text-white">
            <Search />
          </div> */}
          <div className="px-5 py-3">
            <Netflix className="h-4" />
          </div>

          <NavbarItem className="flex-col flex ml-2 gap-3" />
        </div>
      </Drawer>
    </div>
  );
}
