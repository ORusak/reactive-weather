/**
 * Created by Rusak Oleg on 15.02.2016.
 */

import React from 'react';

import css from './../style.styl';
import css_settings from './settings.styl';

import UnitMeasure from './../lib/unit-measure';

const DEGREE_CHAR_CODE = 176;
const DEGREE_CHAR = String.fromCharCode(DEGREE_CHAR_CODE);

class Settings extends React.Component{
    constructor (props){
        super (props);


        /*
        * English - en, Russian - ru, Italian - it, Spanish - es (or sp), Ukrainian - uk (or ua),
        * German - de, Portuguese - pt, Romanian - ro, Polish - pl, Finnish - fi, Dutch - nl,
        * French - fr, Bulgarian - bg, Swedish - sv (or se), Chinese Traditional - zh_tw,
        * Chinese Simplified - zh (or zh_cn), Turkish - tr, Croatian - hr, Catalan - ca */
    }

    componentDidMount (){

    }

    render (){
        let classTabContent = css.tab_container + (this.props.settings.showTab=='settings' ? '' : " " + css.hide_tab);

        let currentUnitMeasure = this.props.settings.unit_measure;
        let measure = Object.keys(UnitMeasure.type).map ((unitTypeId) => {
            let unitType = UnitMeasure.type [unitTypeId];
            let checked = currentUnitMeasure==unitTypeId ? "defaultChecked":'';
            return (
                <div key={unitTypeId}>
                    <input type="radio" id={unitTypeId} name="unitMeasure" ref="unitMeasure"
                           value={unitTypeId} checked={checked} onChange={this.props.updateUnitSettings}/>
                    <label htmlFor={unitTypeId}>{unitTypeId}</label>
                </div>
            );
        });

        return (
            <div className={classTabContent}>
                <div className={css.field}>
                    <label>Data Source</label>
                    <div>
                        <input type="radio" id="OpenWeatherMap" name="dataSource" ref="dataSource" value="OpenWeatherMap"
                               defaultChecked readOnly/>
                        <label htmlFor="OpenWeatherMap">OpenWeatherMap</label>
                    </div>
                </div>
                <div className={css.field}>
                    <label>API Key (<a href="http://openweathermap.org/appid">get key</a>)</label>
                    <div>
                        <textarea ref="keyApi" defaultValue={this.props.settings.API.openweathermap.key}/>
                    </div>
                </div>
                <div className={css.field}>
                    <label>Data receive languages</label>
                    <div>
                        <input type="radio" id="OpenWeatherMap" name="dataSource" ref="dataSource" value="OpenWeatherMap"
                               defaultChecked readOnly/>
                        <label htmlFor="OpenWeatherMap">OpenWeatherMap</label>
                    </div>
                </div>
                <div className={css.field}>
                    <label>Unit measure</label>
                    {measure}
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
}

export default Settings;