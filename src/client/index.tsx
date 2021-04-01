import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import useApollo from './apollo/client';

const entryBlock = document.getElementById('root');
const renderFunction: ReactDOM.Renderer = entryBlock.hasChildNodes()
  ? ReactDOM.hydrate
  : ReactDOM.render;

const [ApolloProvider, client] = useApollo();

renderFunction(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>, entryBlock,
);
