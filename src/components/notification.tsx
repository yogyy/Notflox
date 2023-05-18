import { Popover, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export default function Notifications() {
  return (
    <div className="relative">
      <Popover className="flex">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-full text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600`}
              title="Notifications"
            >
              <span>
                <BellIcon
                  className={`${open ? '' : ''}
                w-6 m-1 text-gray-300`}
                />
                <div
                  className={
                    !open
                      ? 'w-[7px] h-[7px] bg-red-700 absolute top-1 right-1 rounded-full animate-pulse'
                      : ''
                  }
                ></div>
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-0"
              enterTo="opacity-100 translate-y-1"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-1"
              leaveTo="opacity-0 translate-y-0"
            >
              <Popover.Panel className="absolute z-10 max-w-sm px-3 mt-8 md:mt-10 w-max -right-2 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-4 bg-zinc-800">
                    <span className="flex items-center">
                      <span className="text-sm font-medium text-gray-200">
                        Greetings!
                      </span>
                    </span>
                    <span className="block text-sm text-gray-400">
                      Welcome to Notflox, enjoy surfing~
                    </span>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
