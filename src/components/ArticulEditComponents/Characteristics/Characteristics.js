import './Characteristics.scss';
import React, {Component} from "react";
import Characteristic from "./Characteristic";


class Characteristics extends Component {
    constructor(props) {
        super(props);
        const {id, setProps} = props  //index, propsArray,deleteProp, setProps
        this.id = id
        this.setProps = setProps
        this.propsArray = this.props.crit

    }

    deleteProp = (id) => {
        this.setProps(propsArray => propsArray.filter(el => el.id.toString() !== id.toString()))
    }

    addProp = (index, id, value) => {
        console.log(value)
        let newArray = this.propsArray.map(el => {
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

                        {this.props.crit.map((prop, index) =>
                            <Characteristic
                                index={index}
                                id={prop.id}
                                deleteFunc={this.deleteProp}
                                addNewProp={this.addProp}
                                key={index}
                                criteria={prop.crit_val}
                                crit_name ={prop.crit_no_id}
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
