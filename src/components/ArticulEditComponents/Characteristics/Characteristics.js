import './Characteristics.scss';
import React, {Component} from "react";
import Characteristic from "./Characteristic";
import ApiService from "../../../util/ApiService";

const apiService = new ApiService();

class Characteristics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crit: [],
            art_no: '',
            id: 0
        }
        this.deleteProp = this.deleteProp.bind(this);
        this.updateData = this.updateData.bind(this);
        this.createProp = this.createProp.bind(this);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({crit: nextProps.crit, art_no: nextProps.art_no})
    }

    deleteProp(id, index) {
        let crit = this.state.crit.filter(el => el.id !== id)
        this.setState({crit: crit})
        this.deleteCrit(index)
    }


    deleteCrit(index) {
        apiService.deleteCrit(this.props.art_no_id, this.state.crit[index])
        window.location.reload(false)

    }

    setCritName(index, crit_no_id) {

        if (crit_no_id !== null) {
            return {"value": index, "label": crit_no_id.name}
        } else {
            return {"value": index, "label": 'Нет данных'}
        }
    }

    updateData(old_name, name, old_criteria, criteria) {
        apiService.updateCrit(this.props.art_no_id, old_name.label, name.label, old_criteria, criteria)
        window.location.reload()
    }

    createProp(name, criteria) {
        apiService.createCrit(this.props.art_no_id, name.label, criteria)
        window.location.reload()
    }

    render() {

        return (
            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Характеристики</div>
                </div>
                <div className="data-block__content">
                    <div className="data-block__grid props">

                        {this.state.crit.map((prop, index) =>
                            <Characteristic
                                index={index}
                                id={prop.id}
                                deleteFunc={this.deleteProp}
                                updateFunc={this.updateData}
                                addNewProp={this.addProp}
                                key={index}
                                criteria={prop.crit_val}
                                name={this.setCritName(index, prop.crit_no_id)}
                                value={prop.value}
                                all_crit={this.props.all_crit}
                                all_countries={this.props.all_countries}
                            />
                        )}
                        <Characteristic
                            index={-1}
                            id={-1}
                            deleteFunc={this.deleteProp}
                            createFunc={this.createProp}
                            key={-1}
                            criteria={''}
                            name={''}
                            value={''}
                            all_crit={this.props.all_crit}
                            all_countries={this.props.all_countries}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Characteristics;
