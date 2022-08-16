import './Props.scss';
import React, {useState} from "react";
import Prop from "./Prop";

function Props() {
    const [propsArray, setProps] = useState([
        {id: '1', criteria: "Width", value: ""},
        {id: '2', criteria: "Height", value: ""},
        {id: '3', criteria: "Length", value: ""},
        {id: '4', criteria: "Inner Diameter", value: ""},
        {id: '5', criteria: "Outer Diameter", value: ""},
        {id: '6', criteria: "", value: ""},
    ]);


    const deleteProp = (id)=> {
        setProps(propsArray=>propsArray.filter(el => el.id.toString() !== id.toString()))
    }

    const addProp = (index,id,value)=> {
        console.log(value)
        let newArray = propsArray.map(el=> {
            if(el.id.toString() === id.toString()){
                return {
                    id: el.id,
                    criteria: el.criteria,
                    value: value
                }
            }
            return el
        })
        setProps(newArray)
        if(index !== propsArray.length-1){
           return
        }
        setProps([...propsArray, {
            id: Math.floor(100000+Math.random() * 900000),
            criteria: "",
            value: ""
        }])
        // console.log(props)
    }

    return (
        <div className="data-block">
            <div className="data-block__head">
                <div className="data-block__title">Характеристики </div>
            </div>
            <div className="data-block__content">
                <div className="data-block__grid props">
                    {propsArray.map((prop,index) =>
                        <Prop
                            index={index}
                            id={prop.id}
                            deleteFunc={deleteProp}
                            addNewProp={addProp}
                            key={index}
                            criteria={prop.criteria}
                            value={prop.value}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}


export default Props;
