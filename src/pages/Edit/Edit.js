import MainData from "../../components/ArticulEditComponents/MainData/MainData";
import Props from "../../components/ArticulEditComponents/Props/Props";
import Reference from "../../components/ArticulEditComponents/Reference/Reference";
import Validity from "../../components/ArticulEditComponents/Validity/Validity";
import Docs from "../../components/ArticulEditComponents/Docs/Docs";

function Edit() {
    return (
        <div className="edit-page">
            <div className="container">
                <div className="home-page__title display2">Редактирование артикула</div>

                <MainData/>
                <Props/>
                <Reference/>
                <Validity/>
                <Docs/>
            </div>
        </div>
    );
}


export default Edit;
