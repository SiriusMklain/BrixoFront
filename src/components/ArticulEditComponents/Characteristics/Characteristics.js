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
        this.deleteCrit = this.deleteCrit.bind(this);
        this.updateData = this.updateData.bind(this);
        this.createData = this.createData.bind(this);
        this.enterUpdate = this.enterUpdate.bind(this);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({crit: nextProps.crit, art_no: nextProps.art_no})
    }

    deleteCrit(id, index) {
        let crit = this.state.crit.filter(el => el.id !== id)
        this.setState({crit: crit})
        this.deleteData(index)
    }


    deleteData(index) {
        apiService.deleteCrit(this.props.art_no_id, this.state.crit[index])
    }

    setCritName(index, crit_no_id) {

        if (crit_no_id !== null) {
            return {"value": index, "label": crit_no_id.name}
        } else {
            return {"value": index, "label": 'Нет данных'}
        }
    }

    setCritListName(index, crit) {

        return {"value": index, "label": crit}
    }

    setCritNameEn(index, crit_no_id) {
        if (crit_no_id !== null) {
            return {"value": index, "label": crit_no_id.name_en}
        } else {
            return {"value": index, "label": 'Нет данных'}
        }
    }
    setCritListNameEn(index, crit) {

        return {"value": index, "label": crit}
    }

    updateData(old_name, name, old_criteria, criteria) {
        apiService.updateCrit(this.props.art_no_id, old_name.label, name.label, old_criteria, criteria)

    }

    createData(name, criteria) {
        let new_crit = {
            art_no_id: this.props.art_no_id * 1,
            crit_val: criteria,
            id: Math.floor(100000 + Math.random() * 900000),
            crit_no_id: {
                crit_no: 0,
                description: "",
                id: 0,
                name: name.label
            }
        }
        let filter = this.state.crit.filter(item => item.crit_no_id !== null)
        let result = filter.find(item => item.crit_no_id.name === new_crit.crit_no_id.name)
        if (result === undefined) {
            this.setState({crit: [...this.state.crit, new_crit]})
            apiService.createCrit(this.props.art_no_id, name.label, criteria)
        } else {
            this.setState({crit: this.state.crit})
        }
    }

    enterUpdate(e, name, criteria) {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            this.createData(name, criteria)
        }
    }

    render() {
        return (
            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Характеристики</div>
                </div>
                <div className="data-block__content">
                    <div className="data-block__grid props">

                        {(this.state.crit.length === 0) ? this.props.crit_list.map((prop, index) =>
                            <Characteristic
                                index={index}
                                id={prop.id}
                                deleteFunc={this.deleteCrit}
                                updateFunc={this.updateData}
                                addNewProp={this.addProp}
                                key={index}
                                criteria={''}
                                name={this.setCritListName(index, prop.name_ru)}
                                name_en={this.setCritListNameEn(index, prop.name_en)}
                                defaultValue={prop.value}
                                all_crit={this.props.all_crit}
                                all_crit_en={this.props.all_crit_en}
                                all_countries={this.props.all_countries}
                            />
                        ) :
                        this.state.crit.map((prop, index) =>
                            <Characteristic
                                index={index}
                                id={prop.id}
                                deleteFunc={this.deleteCrit}
                                updateFunc={this.updateData}
                                addNewProp={this.addProp}
                                key={index}
                                criteria={prop.crit_val}
                                name={this.setCritName(index, prop.crit_no_id)} z
                                name_en={this.setCritNameEn(index, prop.crit_no_id)}
                                defaultValue={prop.value}
                                all_crit={this.props.all_crit}
                                all_crit_en={this.props.all_crit_en}
                                all_countries={this.props.all_countries}
                            />
                        )}
                        <Characteristic
                            index={-1}
                            id={-1}
                            deleteFunc={this.deleteCrit}
                            // createFunc={this.createData}
                            enterFunc={this.enterUpdate}
                            key={-1}
                            criteria={''}
                            name={''}
                            name_en={''}
                            defaultValue={''}
                            all_crit={this.props.all_crit}
                            all_crit_en={this.props.all_crit_en}
                            all_countries={this.props.all_countries}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Characteristics;
