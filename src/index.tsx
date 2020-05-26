import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './style.scss';

const app = document.getElementById('app');

const App = () => (
    <div>Hello World!</div>
);

ReactDOM.render(<App/>, app);