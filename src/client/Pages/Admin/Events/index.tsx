import React from 'react';
import { RowElement } from '../../../App/Components/LayoutElements';
import CreateEvent from '../../../App/Components/Admin/CreateEvent';
import EventsList from '../../../App/Components/Admin/EventsList';
// import SearchPanel from '../../../App/Components/Admin/SearchPanel';

function AdminEventsPage(): JSX.Element {
  return (
    <section className="admin events">
      <RowElement className="create-event" column>
        <CreateEvent />
      </RowElement>
      {/* <RowElement className="search-bar"> */}
      {/*  <SearchPanel /> */}
      {/* </RowElement> */}
      <RowElement className="events-list" column>
        <EventsList />
      </RowElement>
    </section>
  );
}
export default AdminEventsPage;
