import React from 'react';

interface HTML {
  scripts: Array<string>
}

function Html({ children, scripts }: React.PropsWithChildren<HTML>) : JSX.Element {
  return (
    <html
      lang="en" // todo
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>React Starter Pack</title>
      </head>
      <body>
        <div id="root">{children}</div>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {scripts.map((script, index) => <script src={script} key={index} />)}
      </body>
    </html>
  );
}

export default Html;
