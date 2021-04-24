# React App / WebSockets Example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Try it

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Advanced Configuration

This projects connects by default to the web socket address `wss://www.cryptofacilities.com/ws/v1`.
If another websocket needs to be used, just modify the `env.` or `env.development` file

```
REACT_APP_ORDER_BOOK_SOCKET_URL=NEW_URL
```

###
