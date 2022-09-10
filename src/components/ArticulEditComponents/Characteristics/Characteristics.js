import './Characteristics.scss';
import React, {Component, useState, useEffect} from "react";
import Characteristic from "./Characteristic";
import ApiService from "../../../util/ApiService";

const apiService = new ApiService();

class Characteristics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crit: [],
            id: 0
        }
        this.deleteProp = this.deleteProp.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({crit: nextProps.crit})
    }

    deleteProp (id) {
        let crit = this.state.crit.filter(el => el.id !== id)
        this.setState({crit: crit})
        this.setState({crit: crit})
    }

    addProp = (index, id, value) => {

        let newArray = this.crit.map(el => {
            if (el.id.toString() === id.toString()) {
                return {
                    id: el.id,
                    criteria: el.criteria,
                    value: value
                }
            }
            return el
        })
        this.setProps(newArray)
        if (index !== this.propsArray.length - 1) {
            return
        }
        this.setProps([...this.propsArray, {
            id: Math.floor(100000 + Math.random() * 900000),
            criteria: "",
            value: ""
        }])

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
                                addNewProp={this.addProp}
                                key={index}
                                criteria={prop.crit_val}
                                crit_name={prop.crit_no_id}
                                value={prop.value}
                                crit={this.props.crit}
                                all_countries={this.props.all_countries}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// function Characteristics() {
//     const [propsArray, setProps] = useState([
//         {id: '1', criteria: "Width", value: ""},
//         {id: '2', criteria: "Height", value: ""},
//         {id: '3', criteria: "Length", value: ""},
//         {id: '4', criteria: "Inner Diameter", value: ""},
//         {id: '5', criteria: "Outer Diameter", value: ""},
//         {id: '6', criteria: "", value: ""},
//     ]);
//
//
//     const deleteProp = (id) => {
//         setProps(propsArray => propsArray.filter(el => el.id.toString() !== id.toString()))
//     }
//
//     const addProp = (index, id, value) => {
//         console.log(value)
//         let newArray = propsArray.map(el => {
//             if (el.id.toString() === id.toString()) {
//                 return {
//                     id: el.id,
//                     criteria: el.criteria,
//                     value: value
//                 }
//             }
//             return el
//         })
//         setProps(newArray)
//         if (index !== propsArray.length - 1) {
//             return
//         }
//         setProps([...propsArray, {
//             id: Math.floor(100000 + Math.random() * 900000),
//             criteria: "",
//             value: ""
//         }])
//         // console.log(props)
//     }
//
//
// }


export default Characteristics;
