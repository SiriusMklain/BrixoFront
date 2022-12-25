import React, {Component} from "react";

class ValiditySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
        }
        this.changeType = this.changeType.bind(this)
    }

    componentDidMount() {
        this.setState({type: this.props.type})
    }

    changeType(e) {
        this.props.funcSearchType(e.target.lastChild.data)
    }

    render() {
        return (
            <tr
            >
                <td
                    style={{borderTop: 0, width: 160, cursor: "pointer", color: "blue"}}
                    onClick={this.changeType}
                >
                    <div className="table__td">
                        <u>{this.props.type.type_name}</u>

                    </div>
                </td>
                <td style={{borderTop: 0, width: 190}}>
                    <div className="table__td">
                        <span>{this.props.type.type_engine}</span>

                    </div>
                </td>
                <td style={{borderTop: 0, width: 100}}>
                    <div className="table__td">
                        <span>{this.props.type.type_ls_ls}</span>

                    </div>
                </td>
                <td style={{borderTop: 0}}>
                    <div className="table__td">
                        <span>{this.props.type.type_year}</span>

                    </div>
                </td>

            </tr>
        );
    }
}


export default ValiditySearch;
