import { Injectable } from '@angular/core';
import { ApolloLink, gql } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { LoginCredentials, LoginGQL } from './graphql/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apollo: Apollo,
    private loginGQL: LoginGQL
  ) { }

  async login(credentials: LoginCredentials) {
    // this.loginGQL;
  }

  logout() {
  //
  //
  //
    this.apollo.getClient().resetStore();
  }
}
