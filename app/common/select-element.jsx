/**
 * Component display element select
 * @exports SelectElement
 * @author Oleg Rusak
 * */
class SelectElement extends React.Component {
    render (){
        let collection = this.props.list.map (elem => {
            let id = elem.value;
            let name = elem.name;
            return (
                <option key={id} value={id}>{name}</option>
            );
        });

        return (
            <select className={this.props.className} name={this.props.name} onChange={this.props.updateSettings}
                    defaultValue={this.props.current} >{collection}</select>
        );
    }
}

export default SelectElement;