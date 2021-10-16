import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import rootSaga from "./sagas";
import combinedReducers from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension"; 

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
<React.StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
</React.StrictMode>, 
document.getElementById('root')
);
reportWebVitals();