# Slack Messenger Project #

[![Staging Website](https://img.shields.io/website?label=Staging&url=https://fbzhjzwipk.herokuapp.com/)](https://fbzhjzwipk.herokuapp.com/)
[![Documentation](https://img.shields.io/badge/Read-Documentation-green)](https://docs.google.com/document/d/1-bZ1B2zxUaglfIZTu-lmOQZIX9BGpJKoBpFvX8IszTM/edit?usp=sharing)
[![XO](https://img.shields.io/badge/Powered%20by-XtendOPS%20DEV%20Team-blue)](http://dev-wiki.xtendops.com/)

A modular messaging with slack integration project

## Configurations ##

```bash
NODE_ENV=
SLACK_TOKEN=
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
```

## Development ##

Run development:

```bash
npm run hot
```

Build Production:

```bash
npm run prod
```

## Resources ##

* Slack RTM API: https://api.slack.com/rtm
* Websocket: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
* Postman collection: https://www.getpostman.com/collections/a2e825d3d3c60d33437a
* Slack OAuth Authentication: https://api.slack.com/docs/sign-in-with-slack
* Slack OAuth Scopes: https://api.slack.com/scopes
* Slack Legacy OAuth: https://api.slack.com/legacy/oauth
* Slack Legacy OAuth Scopes: https://api.slack.com/legacy/oauth-scopes
* Slack Available APIs: https://api.slack.com/methods
* https://medium.com/free-code-camp/how-to-build-a-chat-application-using-react-redux-redux-saga-and-web-sockets-47423e4bc21a
* https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/

Used Slack API(https://api.slack.com/methods):

* oauth/authorize - To get autorization code to be used in oauth.access
* oauth.access - To get a token to be used for authentication
* rtm.connect - Initialize Websocket Connection
* users.profile.get - Fetch Identity of the authenticated user
* users.info - Fetch identity of user via id
* users.conversations - Fetch all conversations history of the user
* users.lists - Fetch all users in the channel to be used to identify(users.conversation limit itself on ids only. This is where it'll be matched)
* conversations.history - Fetch Conversation with a particular user or channel
* chat.postMessage - Send a Message

---

If you have any concerns and questions, please contact the development team

Read our Developer Guidelines [here](https://docs.google.com/document/d/1CrRmbC_h1-Mj3hAIxGKVUUoG6kRUFgR4s2Ivn-LIo9A/edit)
