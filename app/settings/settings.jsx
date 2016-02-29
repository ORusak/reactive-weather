/**
 * Created by Rusak Oleg on 15.02.2016.
 */

import React from 'react';

import css from './../style.styl';
import css_settings from './settings.styl';

import {UnitMeasure, Languages} from './../lib/unit-measure';

const DEGREE_CHAR_CODE = 176;
const DEGREE_CHAR = String.fromCharCode(DEGREE_CHAR_CODE);

class Settings extends React.Component{
    constructor (props){
        super (props);
    }

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
                    <label>Data Source</label>
                    <div>
                        <input type="radio" id="OpenWeatherMap" name="dataSource" value="OpenWeatherMap"
                               defaultChecked readOnly/>
                        <label htmlFor="OpenWeatherMap">OpenWeatherMap</label>
                    </div>
                </div>
                <div className={css.field}>
                    <label>API Key (<a href="http://openweathermap.org/appid">get key</a>)</label>
                    <div>
                        <textarea name="keyApi" defaultValue={this.props.settings.API.openweathermap.key}
                                  onChange={updateSettings}/>
                    </div>
                </div>
                <div className={css.field}>
                    <label>Data receive languages</label>
                    <SelectElement name="languages" list={Languages} current={this.props.settings.lang}
                                  updateSettings={updateSettings}/>
                </div>
                <div className={css.field}>
                    <label>Unit measure</label>
                    <RadioElement name="unitMeasure" list={listUnits} current={currentUnitMeasure}
                                  updateSettings={updateSettings}/>
                </div>
                <UnitExample unitType={this.props.settings.unit_measure}/>
            </div>
        )
    }
}

let UnitExample = (props) => {
    let currentUnitMeasure = props.unitType;
    let measure = UnitMeasure.type[currentUnitMeasure];

    return (
        <div className={css_settings.unit_example}>
            <label>Look like</label>
            <div>Temperature: {measure.temperature.example+DEGREE_CHAR}{measure.temperature.letter}({measure.temperature.name})</div>
            <div>Wind: {measure.wind_example}{measure.wind}, S(South)</div>
            <div>Pressure: {UnitMeasure.pressure_example}{UnitMeasure.pressure}</div>
            <div>Precipitation: {UnitMeasure.precipitation_example}{UnitMeasure.precipitation}</div>
        </div>
    );
};

let RadioElement = (props) => {
    let collection = props.list.map (elem => {
        let id = elem.value;
        let name = elem.name;
        return (
            <div key={id}>
                <input type="radio" id={id} name={props.name}
                       value={id} checked={props.current==id} onChange={props.updateSettings}/>
                <label htmlFor={id}>{name}</label>
            </div>
        );
    });

    return (
        <div>{collection}</div>
    );
};

let SelectElement = (props) => {
    let collection = props.list.map (elem => {
        let id = elem.value;
        let name = elem.name;
        return (
            <option key={id} value={id}>{name}</option>
        );
    });

    return (
        <div>
            <select name={props.name} onChange={props.updateSettings} defaultValue={props.current}>{collection}</select>
        </div>
    );
};

export default Settings;