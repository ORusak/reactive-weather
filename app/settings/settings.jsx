/**
 * Created by Rusak Oleg on 15.02.2016.
 */

import React from 'react';

import css from './../style.styl';
import css_settings from './settings.styl';

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
        let classTabContent = css_settings.setting + (this.props.showTab=='settings' ? '' : " " + css.hide_tab);
        
        return (
            <div className={classTabContent}>
                <div className={css_settings.field}>
                    <label>Поставщик</label>
                    <select>
                        <option>OpenWeatherMap</option>
                    </select>
                </div>
                <div className={css_settings.field}>
                    <label>Ключ</label>
                    <input type="text"/>
                </div>
                <div className={css_settings.field}>
                    <label>Единицы измерения</label>
                    <input type="text"/>
                </div>
                <div className={css_settings.field}>
                    <label>Язык данных</label>
                    <input type="text"/>
                </div>
                <div className={css_settings.field}>
                    <label>Единицы измерения (с примерами, потом  убрать *))</label>
                    <input type="text"/>
                </div>
            </div>
        )
    }
}

export default Settings;