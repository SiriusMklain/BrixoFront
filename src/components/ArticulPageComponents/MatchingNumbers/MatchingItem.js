import {Component} from "react";
// import {useNavigate} from "react-router-dom";


class MatchingItem extends Component {
    constructor(props) {
        super(props);
        const {num, id, brand, oem, gtin, countries } = props
        this.num = num
        this.id = id
        this.brand = brand
        this.oem = oem
        this.gtin = gtin
        this.countries = countries
        this.state = {}
        // this.navigate = this.useNavigate();
    }

    goToEdit() {
        this.navigate("/edit");
    }

    render() {
        return (
        <tr onClick={()=>this.goToEdit()}>
            <td>
                <div className="table__td">
                    <span className="table__num gray-text">{this.num}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <div className="table__check check">
                        <input type="checkbox"/>
                        <label></label>
                    </div>
                    <span>{this.id}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{this.brand}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{this.oem}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{this.gtin}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{this.countries}</span>
                </div>
            </td>
        </tr>
    );
    }
}

export default MatchingItem;
