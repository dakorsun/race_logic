import React, { useState } from 'react';
import Panel from './Panel';
import { RowBlockChild } from '../../LayoutElements';
import SlideToogleContent from '../../SlideToogleContent';

enum ICreateButtonLabels {
  CREATE = 'Create',
  CLOSE = 'Close',
}

function CreateEvent() : JSX.Element {
  const [isCreateButtonActive, setIsCreateButtonActive] = useState(true);

  const handleCreateButtonClick = ():void => {
    setIsCreateButtonActive(!isCreateButtonActive);
  };

  return (
    <>
      <RowBlockChild right>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className={`trigger button ${isCreateButtonActive ? ' active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleCreateButtonClick();
          }}
        >
          <span className="label">
            {isCreateButtonActive ? ICreateButtonLabels.CLOSE : ICreateButtonLabels.CREATE}
          </span>
        </div>
      </RowBlockChild>

      <RowBlockChild column>
        <SlideToogleContent isVisible={isCreateButtonActive}>
          <Panel />
        </SlideToogleContent>
      </RowBlockChild>
    </>
  );
}

export default CreateEvent;
