import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { CommonUser, LoginCredentials, LoginGQL, MeGQL, MeQuery, MeQueryVariables } from '../../graphql/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { AUTH_TOKEN_NAME, AUTH_USER_ID } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId?: string;
  private _isAuthorized = new BehaviorSubject<boolean>(false);
  authorizedUser?: Pick<CommonUser, 'id' | 'role' | 'nickname'> = undefined;
  meQueryRef?: QueryRef<MeQuery, MeQueryVariables> = undefined;
  isLoading = true;

  constructor(
    private apollo: Apollo,
    private loginGQL: LoginGQL,
    private meGQL: MeGQL,
  ) { }

  init() {
    this.meQueryRef = this.meGQL.watch();
    this.meQueryRef
      .valueChanges
      .subscribe(({data, loading, error}) => {
        this.isLoading = loading;
        if (error) {
          this.logout();
        } else if (data.me) {
          this.authorizedUser = data.me;
          this.saveUserData(data.me.id);
        }});
  }

  get isAuthenticated(): Observable<any> {
      return this._isAuthorized.asObservable();
  }

  setLocalData(id: string, token: string) {
    localStorage.setItem(AUTH_USER_ID, id);
    localStorage.setItem(AUTH_TOKEN_NAME, token);
  }

  saveUserData(id: string) {
    this.setUserId(id);
  }

  doLogin(credentials: LoginCredentials) {
    this.loginGQL.mutate({credentials})
      .subscribe(({data, errors}) => {
        if (data?.login && !errors) {
          this.setLocalData(data.login.id, data.login.token);
          this.saveUserData(data.login.id);
        }
        this.meQueryRef?.refetch();
      }) ;
  }

  setUserId(id: string) {
    this.userId = id;
    this._isAuthorized.next(true);
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    localStorage.removeItem(AUTH_USER_ID);
    this._isAuthorized.next(false);
    this.userId = undefined;
  }
}
