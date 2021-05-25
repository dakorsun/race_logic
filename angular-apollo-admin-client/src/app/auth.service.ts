import { Injectable } from '@angular/core';
import { ApolloLink, gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { AuthorizedUser, LoginCredentials, LoginGQL } from './graphql/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authorizedUser: AuthorizedUser | null = null;

  constructor(
    private apollo: Apollo,
    private loginGQL: LoginGQL
  ) { }

  async doLogin(credentials: LoginCredentials) {
    // this.loginGQL;
  }

  doLogout() {
  //
  //
  //
    this.authorizedUser = null;
    this.apollo.getClient().resetStore();
  }
}
