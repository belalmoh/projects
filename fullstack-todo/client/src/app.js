import React from 'react';
import ReactDOM from 'react-dom';

import TodoContainer from './containers/todo';

const App = () => {
    return (
        <TodoContainer />
    );
}

const app = document.getElementById("app");
ReactDOM.render(<App />, app);

if (module.hot) {
    module.hot.accept();
}