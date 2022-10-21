import {Component} from "react";

class ArticulItem extends Component {

    render() {
        return (
            <tr>
                <td>
                    <div className="table__td">
                        <span className="table__num gray-text">{this.props.num}</span>
                    </div>
                </td>
                <td>
                    <a href={'/edit/?id=' + this.props.id}>
                        <div className="table__td">
                            <span>{this.props.art_no}</span>
                        </div>
                    </a>

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
