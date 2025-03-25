import './Monster.css';
import ProgressBar from "../ProgressBar/ProgressBar";
import { useSelector } from 'react-redux';

function Monster() {

  const monster = useSelector((state) => state.fight.monster);

  return (
    <>
    <section>
    <div className="container">
      <div className="row justify-content-center">
        <div className="card-monstre col-sm-10">
          <div id="monsterCard">
            <div className="text-center">
              <div className="row">
                <div className="col-sm-6 offset-sm-3">
                  {/* <span
                    className="badge badge-danger"
                    id="degatSpanMonster"
                  ></span> */}
                  <p>{monster.name}</p>
                  <img
                    className="img-fluid"
                    src="http://res.publicdomainfiles.com/pdf_view/67/13925387417373.png"
                    alt="monster"
                  />
                  </div>

                  {/* <div id="comboOnMonster" className="col-sm-6"></div> */}
                </div>
              </div>
              <ProgressBar
                pv={monster.pv}
                pvMax={monster.pvMax}
                bgType="bg-danger"
                faType="fa-heart"
                barName=" : pv"
              />
            </div>
         </div>
         </div>
      </div>
    </section>
    </>
  );
}

export default Monster;
