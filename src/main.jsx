// ============ MAIN COMPONENT MODULE  ============ //

import React from 'react';
import ReactDOM from 'react-dom/client';

import { UserProvider } from './components/providers/UserProvider';
import App from './components/App';
import './main.css';


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>,
)
