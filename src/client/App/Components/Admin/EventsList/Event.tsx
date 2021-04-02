import React from 'react';
import { formatDateToResultString } from '../../../../../utils/stringUtils';
import { EventData } from './dataTypes';

interface IEventProps {
  data: EventData
}
const Event = ({ data }: IEventProps): JSX.Element => {
  const {
    // id,
    name, dateFrom, dateTo,
    // createdAt, updatedAt,
  } = data;

  return (
    <div className="list-element event">
      <div className="name">
        {name}
      </div>
      <div className="date">
        {dateFrom !== dateTo
          ? (
            <>
              <span>{formatDateToResultString(dateFrom)}</span>
              <span>{formatDateToResultString(dateTo)}</span>
            </>
          ) : (
            <span>
              {formatDateToResultString(dateFrom)}
            </span>
          )}
      </div>
    </div>
  );
};

export default Event;
