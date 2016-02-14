/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';

class CityInfo extends React.Component {
    constructor (props){
        super (props);

        this.state = {
        };
    }

    componentDidMount (){

    }

    render (){
        let cityInfo = `${this.props.name} (${this.props.country})`;
        return (
            <h1 className={css.city} title={this.props.id}>{cityInfo}</h1>
        )
    }
}

CityInfo.defaultProps = {
    country: "City unknown"
};

export default CityInfo;