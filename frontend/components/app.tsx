import React from 'react';
import Header from 'components/header';
import Authenticate from 'components/authenticate';
import Panel from 'components/panel';
import Inbox from 'components/inbox';
import Message from 'components/message';

const App = () => (
  <div>
    <Header>
      <Authenticate />
    </Header>
    <main className="main">
      <Panel />
      <Inbox>
        <Message user="Michael Fortini" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in orci non lectus pretium iaculis. Etiam vitae lacus elit. Maecenas vitae accumsan magna. Duis tempor leo sit amet elit imperdiet, dignissim tristique ligula pellentesque." time="5 minutes ago" />
        <Message user="Christian Ryan Macarse" text="Nam eget lectus a magna consequat molestie sit amet nec est." time="Just now" />
      </Inbox>
    </main>
  </div>
);

export default App;
