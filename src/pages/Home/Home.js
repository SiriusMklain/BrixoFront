import Articuls from "../../components/ArticulPageComponents/Articuls/Articuls";
import MatchingNumbers from "../../components/ArticulPageComponents/MatchingNumbers/MatchingNumbers";

function Home() {
    return (
        <div className="home-page">
            <div className="container">
                <div className="home-page__title display2">Список и поиск артикулов</div>
                <Articuls/>
                <MatchingNumbers/>

            </div>
        </div>
    );
}


export default Home;
