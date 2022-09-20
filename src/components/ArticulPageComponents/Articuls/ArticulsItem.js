import {Component} from "react";
import {Link} from "react-router-dom";

class ArticulItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="table__td">
                        <span className="table__num gray-text">{this.props.num}</span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <div className="table__check check">
                            <input type="checkbox"/>
                            <label></label>
                        </div>
                        <span><a href={"/edit/?id=" + this.props.id}>{this.props.art_no} </a></span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <span>{this.props.errors}</span>
                    </div>
                </td>
            </tr>
        );
    }
}


export default ArticulItem;
