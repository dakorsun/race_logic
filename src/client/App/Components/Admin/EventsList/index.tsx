import React
// , { useEffect, useState }
, { useEffect, useState } from 'react';
import { useGetEventsQuery } from '../../../../apollo/queries/event';
import Event from './Event';
import { EventData } from './dataTypes';

function EventsList(): JSX.Element {
  const { data } = useGetEventsQuery();
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    if (data?.events) {
      setEventsList(data.events as EventData[]);
    }
  }, [data]);

  return (
    <>
      <div className="heading">Events List</div>
      <div className="container">
        {eventsList.map((event: any) => <Event data={event} />)}
      </div>
    </>
  );
}

export default EventsList;
