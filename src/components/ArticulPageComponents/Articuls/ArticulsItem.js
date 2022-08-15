function ArticulItem(props) {
    const { num, id, reason } = props

    return (
        <tr>
            <td>
                <div className="table__td">
                    <span className="table__num gray-text">{num}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <div className="table__check check">
                        <input type="checkbox"/>
                        <label></label>
                    </div>
                    <span>{id}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{reason}</span>
                </div>
            </td>
        </tr>
    );
}


export default ArticulItem;
