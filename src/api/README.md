
## API Documentation

The following API functions are available:

## Chat

### `getUsers` - Get all users 

Input - `None`

Output - `Chat[]`

### `postRegistger` - Register a new user

Input - `string` username

Output - `Chat`

### `postRefresh` - Register a new user

Input - `string` userId

Output - `User` | `404` if no user with this id was found

## Chatroom

### `getOpenChatrooms` - Get all chatrooms

Input - `string` userId

Output - `Chatroom[]`

### `postChatroom` - Create (open up) a new chatroom

Input - `string[]` userIds - including you're own!

Output - `Chatroom`

### `postMessage` - Send a message to a chatroom

Input - `string` chatroomId, `string` authorId, `string` text

Output - `Chatroom`



