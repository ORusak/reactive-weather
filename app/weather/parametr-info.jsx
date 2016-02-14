/**
 * Created by Rusak Oleg on 09.02.2016.
 */

import React from 'react';

import css from './../style.styl';

class Parametr extends React.Component {
    constructor (props){
        super (props);

        this.state = {
        };
    }

    componentDidMount (){

    }

    render (){
        return (
            <div className={css.parametr}>
                <div>{this.props.name}</div>
                <div>{this.props.value}</div>
            </div>
        )
    }
}

Parametr.defaultProps = {
    value: '-'
}

export default Parametr;