import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import './app/styles/index.sass'
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from './app/store/createStore';
import "bootstrap/dist/css/bootstrap.css";
import { Router } from 'react-router-dom';
import history from './app/utils/history';
import 'antd/dist/antd.css';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
const store = createStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('app')
);
