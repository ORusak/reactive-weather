/**
 * Component display element collection radio button
 * @exports RadioElement
 * @author Oleg Rusak
 * */
class RadioElement extends React.Component {
    render (){
        let collection = this.props.list.map(elem => {
            let id = elem.value;
            let name = elem.name;
            return (
                <div key={id}>
                    <input type="radio" id={id} name={this.props.name} value={id} defaultChecked={this.props.current==id}
                           onChange={this.props.updateSettings} />
                    <label htmlFor={id}>{name}</label>
                </div>
            );
        });

        return (
            <div>{collection}</div>
        );
    }
}

export default RadioElement;