import { Component, OnInit } from '@angular/core';
import { Event, EventByIdGQL, EventByIdQuery, EventByIdQueryVariables } from '../../graphql/events';
import { ActivatedRoute } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { LayoutObserverService } from '../../services/layout-observer/layout-observer.service';
import { Observable } from 'rxjs';
import { EventRoutes, IChildRouteDescriptor } from '../../routes/routes';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  eventId: string;
  eventsQueryRef?: QueryRef<EventByIdQuery, EventByIdQueryVariables>;
  eventCoreData: Pick<Event, 'id' | 'name' | 'dateFrom' | 'dateTo' | 'createdAt' | 'updatedAt'>;
  isLoading = true;
  isHandset$: Observable<boolean> = this.layoutObserver.isHandset$;
  eventLinks: IChildRouteDescriptor[] = EventRoutes;

  constructor(
    private layoutObserver: LayoutObserverService,
    private eventGQL: EventByIdGQL,
    private route: ActivatedRoute
) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
    });
    this.eventsQueryRef = this.eventGQL.watch({id: this.eventId});
    this.eventsQueryRef
      .valueChanges
      .subscribe(({data, loading}) => {
        this.isLoading = loading;
        if (data.eventById) {
          this.eventCoreData = data.eventById;
        }
      }, () => {

      });
  }


}
