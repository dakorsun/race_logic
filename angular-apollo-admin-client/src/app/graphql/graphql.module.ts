import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import { ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpClientModule} from '@angular/common/http';
import {setContext} from '@apollo/client/link/context';
import {AUTH_TOKEN_NAME} from '../constants';

const uri = 'http://localhost:3050';
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext((operation, context) => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: token
        }
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  };
}

@NgModule({
  exports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
