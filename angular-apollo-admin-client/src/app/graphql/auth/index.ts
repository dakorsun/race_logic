import {gql} from 'apollo-angular';
import {Injectable} from '@angular/core';
import * as Apollo from 'apollo-angular';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** String matching 'Bearer token_string' format */
  Authorization_token: any;
  /** Object with "from" and "to" keys with values matching format "yyyy-mm-dd. "from" date must be earlier than or equal to "to" */
  DateRange_search_criteria: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthorizedUser = {
  id: Scalars['ID'];
  token: Scalars['Authorization_token'];
};

export type CommonUser = {
  id: Scalars['ID'];
  nickname: Scalars['String'];
  role: Scalars['String'];
};

export type CreateEventInput = {
  dateFrom: Scalars['DateTime'];
  dateTo: Scalars['DateTime'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Event = {
  createdAt: Scalars['DateTime'];
  dateFrom: Scalars['DateTime'];
  dateTo: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type FindEventsInput = {
  date?: Maybe<Scalars['DateRange_search_criteria']>;
  limit?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  q?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Float']>;
};

export type LoginCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  createEvent: Event;
  createUser: User;
  deleteEvent: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: AuthorizedUser;
  updateEvent: Event;
  updateUser: User;
};

export type MutationCreateEventArgs = {
  data: CreateEventInput;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationLoginArgs = {
  credentials: LoginCredentials;
};

export type MutationUpdateEventArgs = {
  data: UpdateEventInput;
  id: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String'];
};

export type Query = {
  eventById: Event;
  events: Array<Event>;
  me?: Maybe<CommonUser>;
  userById: User;
};

export type QueryEventByIdArgs = {
  id: Scalars['String'];
};

export type QueryEventsArgs = {
  parameters: FindEventsInput;
};

export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type UpdateEventInput = {
  dateFrom: Scalars['DateTime'];
  dateTo: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type User = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LoginMutationVariables = Exact<{
  credentials: LoginCredentials;
}>;

export type LoginMutation = { login: Pick<AuthorizedUser, 'id' | 'token'> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;

export type MeQuery = { me?: Maybe<Pick<CommonUser, 'id' | 'role' | 'nickname'>> };

export const LoginDocument = gql`
  mutation login($credentials: LoginCredentials!) {
    login(credentials: $credentials) {
      id
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
  document = LoginDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const MeDocument = gql`
  query me {
    me {
      id
      role
      nickname
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MeGQL extends Apollo.Query<MeQuery, MeQueryVariables> {
  document = MeDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
