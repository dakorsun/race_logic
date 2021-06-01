import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { environment } from '../../environments/environment';

export const routes: IRouteDescriptor[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    authGuard: true,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    authSieve: true
  },
  // {
  //   path: 'secret-login',
  //   component: LoginPageComponent,
  //   authGuard: true
  // },
];

export interface IRouteDescriptor extends Route {
  path: string;
  authGuard?: boolean;
  authSieve?: boolean;
  component: Type<any>;
}

@Injectable({
  providedIn: 'root'
})
class AdminAuthGuard implements CanActivate {
  _canActivate = new BehaviorSubject<boolean>(true);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      const isRedirecting = !isAuthenticated;
      if (isRedirecting) {
        this.router.navigateByUrl(environment.routing.UNAUTHORIZED_REDIRECT_URL);
      }
      this._canActivate.next(!isRedirecting);
    });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this._canActivate.asObservable();
  }
}

@Injectable({
  providedIn: 'root'
})
class AdminAuthSieve implements CanActivate {
  _canActivate = new BehaviorSubject<boolean>(true);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      const isRedirecting = isAuthenticated;
      if (isRedirecting) {
        this.router.navigateByUrl(environment.routing.AUTHORIZED_REDIRECT_URL);
      }
      this._canActivate.next(!isRedirecting);
    });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this._canActivate.asObservable();
  }
}

export const routesMapped = routes.map( (desc: IRouteDescriptor) => {
  const result: Route = {
    path: desc.path,
    component: desc.component,
    canActivate: [],
  };
  if (desc.authSieve) {
    result.canActivate?.push(AdminAuthSieve);
  }
  if (desc.authGuard) {
    result.canActivate?.push(AdminAuthGuard);
  }
  return result;
});

