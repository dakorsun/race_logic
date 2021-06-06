import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayoutObserverService {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait
  ])
    .pipe(
      map(result => {
        console.log('service handset result: ', result);
        return result.matches;
      }),
      shareReplay()
    );
  isSmall$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Small,
    Breakpoints.XSmall,
  ])
    .pipe(
      map(result => {
        console.log('service small+xsmall result: ', result);
        return result.matches;
      }),
      shareReplay()
    );
  isMedium$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Medium,
  ])
    .pipe(
      map(result => {
        console.log('service medium result: ', result);
        return result.matches;
      }),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }


}
