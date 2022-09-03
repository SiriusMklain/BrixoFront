import {Component} from "react";
import MainData from "../../ArticulEditComponents/MainData/MainData";

class MatchingItem extends Component {
    constructor(props) {
        super(props);
        const {num, id, brand, art_no, gtin, countries } = props
        this.num = num
        this.id = id
        this.art_no = art_no
        this.brand = brand
        this.gtin = gtin
        this.countries = countries
        this.state = {
            id: this.id
        }

    }

    goToEdit = () => {
        window.location.href='/edit/?id=' + this.id
    }

    render() {
        return (

        <tr onClick={this.goToEdit}>
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
                    <span>{this.art_no}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{this.brand}</span>
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
