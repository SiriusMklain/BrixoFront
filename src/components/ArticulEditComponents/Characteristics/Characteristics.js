import './Characteristics.scss';
import React, {Component} from "react";
import Characteristic from "./Characteristic";
import ApiService from "../../../util/ApiService";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const apiService = new ApiService();

class Characteristics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crit: [],
            art_no: '',
            id: 0,
            index: '',
            showModal: false
        }
        this.deleteCrit = this.deleteCrit.bind(this);
        this.updateData = this.updateData.bind(this);
        this.createData = this.createData.bind(this);
        this.enterUpdate = this.enterUpdate.bind(this);
        this.updateCritMany = this.updateCritMany.bind(this);

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({crit: nextProps.crit, art_no: nextProps.art_no})
    }

    deleteCrit() {
        let id = this.state.id
        let index = this.state.index
        let crit = this.state.crit.filter(el => el.id !== id)
        this.setState({crit: crit})
        this.deleteData(index)
    }


    deleteData(index) {
        apiService.deleteCrit(this.props.art_no_id, this.state.crit[index]).then(()=> {
            this.close()
        })
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

    updateData(criteria, old_name, name, old_criteria) {
        apiService.updateCrit(this.props.art_no_id, criteria, old_name.label, name.label, old_criteria)
    }

    updateCritMany(crit_no, len, criteria, index) {
        let crit = []
        this.props.crit_list.forEach(function (item, i) {
            if(index === i){
                crit.push({
                "crit_no": item.crit_no,
                "crit_val": criteria
            })
            }else {
                crit.push({
                "crit_no": item.crit_no,
                "crit_val": "-"
            })
            }
        });
                apiService.updateCritMany(this.props.art_no_id, crit).then(()=>{
                    window.location.reload ()
                })
    }

    createData(name, name_en, criteria) {
        let new_crit = {
            art_no_id: this.props.art_no_id * 1,
            crit_val: criteria,
            id: Math.floor(100000 + Math.random() * 900000),
            crit_no_id: {
                crit_no: 0,
                description: "",
                id: 0,
                name: name.label,
                name_en: name_en.label
            }
        }
        let filter = this.state.crit.filter(item => item.crit_no_id !== null)
        let result = filter.find(item => item.crit_no_id.name === new_crit.crit_no_id.name)
        if (result === undefined) {
            this.setState({crit: [...this.state.crit, new_crit]})
            apiService.createCrit(this.props.art_no_id, name.label, name_en.label, criteria)
        } else {
            this.setState({crit: this.state.crit})
        }
    }

    enterUpdate(e, name, name_en, criteria) {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            this.createData(name, name_en, criteria)
        }
    }

    close() {
        this.setState({showModal: false});
    }

    open(id, index) {
        this.setState({showModal: true, index: index, id: id});
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
                                    deleteFunc={this.open}
                                    updateFunc={(criteria) => this.updateCritMany(prop.crit_no, this.props.crit_list.length, criteria, index)}
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
                                    deleteFunc={this.open}
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
                            deleteFunc={this.open}
                            updateFunc={() => {}}
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

                <>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы уверены, что хотите удалить?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.close}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.deleteCrit}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>
                </>

            </div>
        );
    }
}


export default Characteristics;
