/**
 * Created by Rusak Oleg on 08.03.2016.
 */

import css from './style.styl';

import WeatherApp from './app.jsx';

import Weather from './weather/weather.jsx';
import Settings from './settings/settings.jsx';
import Cities from './cities/cities.jsx';

describe('<WeatherApp />', () => {
    it('renders three <WeatherApp /> child components', () => {
        const wrapper = shallow(<WeatherApp />);
        tShould (wrapper.find(Weather)).be.length(1);
        tShould (wrapper.find(Settings)).be.length(1);
        tShould (wrapper.find(Cities)).be.length(1);
    });

    it('render 3 tab', () => {
        const wrapper = shallow(<WeatherApp />);
        tShould(wrapper.find('.' + css.tab)).be.length(3);
    });
});