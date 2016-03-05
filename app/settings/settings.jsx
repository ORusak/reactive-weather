/**
 * Created by Rusak Oleg on 15.02.2016.
 */

import css from './../style.styl';
import css_settings from './settings.styl';

import {UnitMeasure, Languages} from './../lib/unit-measure';

const DEGREE_CHAR_CODE = 176;
const DEGREE_CHAR = String.fromCharCode(DEGREE_CHAR_CODE);

/**
 * Component display app settings
 * @exports Settings
 * @author Oleg Rusak
 * */
class Settings extends React.Component{
    render (){
        let classTabContent = css.tab_container + (this.props.settings.showTab=='settings' ? '' : " " + css.hide_tab);
        let updateSettings = this.props.updateSettings;
        let currentUnitMeasure = this.props.settings.unit_measure;

        let listUnits = Object.keys(UnitMeasure.type).map((key) => {
            return {name: key, value: key};
        });

        return (
            <div className={classTabContent}>
                <div className={css.field}>
                    <label className={css.field__label}>Data Source</label>
                    <div className={css.field__control}>
                        <input type="radio" id="OpenWeatherMap" name="dataSource" value="OpenWeatherMap"
                               defaultChecked readOnly/>
                        <label htmlFor="OpenWeatherMap">OpenWeatherMap</label>
                    </div>
                </div>
                <div className={css.field}>
                    <label className={css.field__label}>API Key (<a href="http://openweathermap.org/appid">get key</a>)</label>
                    <div className={css.field__control}>
                        <textarea className={css_settings.control__textarea} name="keyApi" defaultValue={this.props.settings.API.openweathermap.key}
                                  onChange={updateSettings}/>
                    </div>
                </div>
                <div className={css.field}>
                    <label className={css.field__label}>Data receive languages</label>
                    <div className={css.field__control}>
                        <SelectElement name="languages" list={Languages} current={this.props.settings.lang}
                                  updateSettings={updateSettings}/>
                    </div>
                </div>
                <div className={css.field}>
                    <label className={css.field__label}>Unit measure</label>
                    <div className={css.field__control}>
                        <RadioElement name="unitMeasure" list={listUnits} current={currentUnitMeasure}
                                  updateSettings={updateSettings}/>
                    </div>
                </div>
                <div className={css.field}>
                    <label className={css.field__label}>Units look like</label>
                    <div className={css.field__control}>
                        <UnitExample unitType={this.props.settings.unit_measure}/>
                    </div>
                </div>
            </div>
        )
    }
}

let UnitExample = (props) => {
    let currentUnitMeasure = props.unitType;
    let measure = UnitMeasure.type[currentUnitMeasure];

    return (
        <div className={css_settings.unit_example}>
            <div>Temperature: {measure.temperature.example+DEGREE_CHAR}{measure.temperature.letter}({measure.temperature.name})</div>
            <div>Wind: {measure.wind_example}{measure.wind}, S(South)</div>
            <div>Pressure: {UnitMeasure.pressure_example}{UnitMeasure.pressure}</div>
            <div>Precipitation: {UnitMeasure.precipitation_example}{UnitMeasure.precipitation}</div>
        </div>
    );
};

/**
 * Stateless component display element collection radio button
 * @exports RadioElement
 * @author Oleg Rusak
 * */
let RadioElement = (props) => {
    let collection = props.list.map (elem => {
        let id = elem.value;
        let name = elem.name;
        return (
            <div key={id}>
                <input type="radio" id={id} name={props.name}
                       value={id} defaultChecked={props.current==id} onChange={props.updateSettings}/>
                <label htmlFor={id}>{name}</label>
            </div>
        );
    });

    return (
        <div>{collection}</div>
    );
};

/**
 * Stateless component display element select
 * @exports SelectElement
 * @author Oleg Rusak
 * */
let SelectElement = (props) => {
    let collection = props.list.map (elem => {
        let id = elem.value;
        let name = elem.name;
        return (
            <option key={id} value={id}>{name}</option>
        );
    });

    return (
        <select className={css_settings.control__select} name={props.name} onChange={props.updateSettings}
                defaultValue={props.current}>{collection}</select>
    );
};

export default Settings;