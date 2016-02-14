/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';
import Parametr from './parametr-info.jsx';

class DetailInfo extends React.Component {
    constructor (props){
        super (props);

        this.state = {
        };
    }

    componentDidMount (){

    }

    //todo: Current UV Index
    //http://openweathermap.org/api_uv
    render (){
        return (
            <div className={css.detail}>
                <Parametr name="Pressure" value={this.props.detail.main.pressure}/>
                <Parametr name="Humidity" value={this.props.detail.main.humidity}/>
                <Parametr name="Visibility" value={this.props.detail.visibility}/>
                <Parametr name="Wind" value={this.props.detail.wind.speed}/>
                <Parametr name="Clouds" value={this.props.detail.clouds.all}/>
                <Parametr name="Sunrise" value={this.props.detail.sys.sunrise}/>
                <Parametr name="Sunset" value={this.props.detail.sys.sunset}/>
            </div>
        )
    }
}

DetailInfo.defaultProps = {
    detail: {
    }
};

export default DetailInfo;