import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { EventsGQL, EventsQuery, EventsQueryVariables } from '../../graphql/events';
import { Observable } from 'rxjs';
import { LayoutObserverService } from '../../services/layout-observer/layout-observer.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  events: EventsQuery['events'];
  isLoading = true;
  eventsQueryRef?: QueryRef<EventsQuery, EventsQueryVariables>;

  isHandset$: Observable<boolean> = this.layoutObserver.isHandset$;
  isSmall$: Observable<boolean> = this.layoutObserver.isSmall$;
  isMedium$: Observable<boolean> = this.layoutObserver.isMedium$;
  constructor(
    private layoutObserver: LayoutObserverService,
    private eventsGQL: EventsGQL
  ) {
  }

  ngOnInit(): void {
    this.eventsQueryRef = this.eventsGQL.watch({
      searchParameters: {
        // todo
      }
    }, {pollInterval: 1000 * 60 * 10});
    this.eventsQueryRef
      .valueChanges
      .subscribe(({
        data,
        loading
      }) => {
        this.isLoading = loading;
        if (data.events) {
          this.events = [...data.events, ...data.events];
        }
      }, () => {
        this.events = [];
      });
  }

}
