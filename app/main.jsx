/**
 * Created by Rusak Oleg on 09.02.2016.
 */

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import WeatherApp from './app.jsx';

//todo: link font-awesome through webpack

ReactDOM.render(
    <WeatherApp />,
    document.getElementById('container')
);