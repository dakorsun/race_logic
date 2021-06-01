import {Injectable} from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import {CommonUser, LoginCredentials, LoginGQL, MeGQL, MeQuery, MeQueryVariables} from '../../graphql/auth';
import {BehaviorSubject, Observable, Subscription, throwError} from 'rxjs';
import {AUTH_TOKEN_NAME, AUTH_USER_ID} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId?: string;
  private _isAuthorized = new BehaviorSubject<boolean>(false);
  authorizedUser?: Pick<CommonUser, 'id' | 'role' | 'nickname'> = undefined;
  meQueryRef?: QueryRef<MeQuery, MeQueryVariables> = undefined;
  isLoading = true;
  loginError = new BehaviorSubject<string | null>(null);

  constructor(
    private apollo: Apollo,
    private loginGQL: LoginGQL,
    private meGQL: MeGQL,
  ) {
  }

  init() {

    const userId = localStorage.getItem(AUTH_USER_ID);
    if (userId) {
      this.setUserId(userId);
    }
    this.meQueryRef = this.meGQL.watch(
      {}, {pollInterval: 1000 * 60 * 10}
    );
    this.meQueryRef
      .valueChanges
      .subscribe(({
        data,
        loading,
        error
      }) => {
        try {

          this.isLoading = loading;
          // console.log('data.me: ', data.me);
          if (error) {
            this.logout();
          } else if (data.me) {
            this.authorizedUser = data.me;
            this.saveUserData(data.me.id);
          } else {
            this.logout();
          }

        } catch (e) {
          console.log('e: ', e);
        }
      });
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

  doLogin(credentials: LoginCredentials): Subscription | void {
    return this.loginGQL.mutate({credentials})
      .subscribe(({
        data,
      }) => {
        if (data?.login) {
          this.setLocalData(data.login.id, data.login.token);
          this.saveUserData(data.login.id);
          this.loginError.next(null);
          this.meQueryRef?.refetch();
        }
      }, (error) => {
        if (error) {
          console.log('error: ', error);
          this.loginError.next(error.toString());
        }
      });
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
