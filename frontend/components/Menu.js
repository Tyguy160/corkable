import Edit from '../components/Icons/Edit';
import Share from '../components/Icons/Share';
import Sort from '../components/Icons/Sort';
import Add from '../components/Icons/Add';
import Link from 'next/link';
import { usePopper } from 'react-popper';
import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import useAuth from '../hooks/useAuth';

export default function Menu() {
  const { auth, data } = useAuth();
  const [showPopper, setShowPopper] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  function handleClickAway() {
    setShowPopper(false);
  }

  return (
    <ClickAwayListener
      onClickAway={handleClickAway}
      className="flex flex-row justify-between w-full pt-6">
      <div className="flex flex-row px-5">
        <div className="flex flex-row px-2 cursor-pointer focus:none">
          <Edit />
        </div>
        <div className="cursor-pointer focus:none">
          <Share />
        </div>
      </div>
      <div className="flex flex-row px-5">
        <div className="px-2 cursor-pointer focus:none">
          <Sort />
        </div>
        {/* <Link href="/createBoard"> */}
        <div
          className="cursor-pointer focus:none"
          ref={setReferenceElement}
          onClick={() => setShowPopper(!showPopper)}>
          <Add />
        </div>
        {/* </Link> */}
        {showPopper && (
          <div
            className="w-40 px-3 py-4 -m-5 bg-white border-2 rounded-lg shadow-lg"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}>
            <div className="flex flex-col">
              <div className="mx-2 my-1 text-sm font-light cursor-pointer">
                Create
              </div>
              {data && data.boards.length ? (
                <Link href="/createPin">
                  <div className="mx-2 my-1 text-lg font-semibold tracking-wide cursor-pointer">
                    Pin
                  </div>
                </Link>
              ) : null}
              <Link href="/createBoard">
                <div className="mx-2 my-1 text-lg font-semibold tracking-wide cursor-pointer">
                  Board
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
