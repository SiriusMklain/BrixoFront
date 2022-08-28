import Select from "react-select";
import React from "react";

function Prop(props){
    const {index, id, criteria, value, deleteFunc, addNewProp} = props

    let propsOptions = [
        {value: '1', label: 'Width' },
        {value: '2', label: 'Height' },
        {value: '3', label: 'Length' },
        {value: '4', label: 'Inner Diameter' },
        {value: '5', label: 'Outer Diameter' },
    ]

    return(
        <div className="prop">
            <fieldset className="fg data-block__col data-block__col3">
                <label>Критерий</label>
                <Select
                    classNamePrefix="select"
                    isSearchable={true}
                    name="numsOfRows"
                    options={propsOptions}
                    placeholder={"Не выбрано"}
                />
            </fieldset>
            <fieldset className="fg data-block__col data-block__col3">
                <label>Значение</label>
                <input
                    type="text"
                    onChange={(el)=>addNewProp(index,id,el.target.value)}
                    value={value}
                />
            </fieldset>
            <button
                className="prop__delete"
                onClick={()=> {deleteFunc(id)}}
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.41425 6.00025L11.7072 1.70725C12.0982 1.31625 12.0982 0.68425 11.7072 0.29325C11.3162 -0.09775 10.6842 -0.09775 10.2933 0.29325L6.00025 4.58625L1.70725 0.29325C1.31625 -0.09775 0.68425 -0.09775 0.29325 0.29325C-0.09775 0.68425 -0.09775 1.31625 0.29325 1.70725L4.58625 6.00025L0.29325 10.2933C-0.09775 10.6842 -0.09775 11.3162 0.29325 11.7072C0.48825 11.9022 0.74425 12.0002 1.00025 12.0002C1.25625 12.0002 1.51225 11.9022 1.70725 11.7072L6.00025 7.41425L10.2933 11.7072C10.4882 11.9022 10.7443 12.0002 11.0002 12.0002C11.2562 12.0002 11.5122 11.9022 11.7072 11.7072C12.0982 11.3162 12.0982 10.6842 11.7072 10.2933L7.41425 6.00025Z" fill="#CA003D"/>
                </svg>
                <span>Удалить</span>
            </button>
        </div>
    )
}


export default Prop;