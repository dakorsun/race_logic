import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { IRouteDescriptor, routes } from '../../routes/routes';
import { LayoutObserverService } from '../../services/layout-observer/layout-observer.service';


export interface Link {
  address: string;
  title: string;
  newPage?: boolean;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  links: Link[];
  isUserLogged: boolean = !!this.authService.authorizedUser;
  nickname?: string;

  isHandset$: Observable<boolean> = this.layoutObserver.isHandset$;


  constructor(
    private layoutObserver: LayoutObserverService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      this.isUserLogged = isAuthenticated;
      this.nickname = this.authService.authorizedUser?.nickname;
      this.mapNavLinks(isAuthenticated);
    });
  }

  mapNavLinks(isAuthenticated: boolean) {
    this.links = routes.reduce((result: Link[], route: IRouteDescriptor) => {
      if (route.navLink) {
        if (route.authGuard && isAuthenticated) {
        result.push({
          address: route.path,
          title: route.title || route.path,
          newPage: !!route.blank
        });
        } else if (route.authSieve && !isAuthenticated) {
        result.push({
          address: route.path,
          title: route.title || route.path,
          newPage: !!route.blank
        });
        }
      }
      return result;
    }, [] as Link[]);
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
