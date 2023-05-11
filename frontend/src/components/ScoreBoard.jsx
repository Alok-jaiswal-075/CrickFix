import React,{useEffect,useState} from 'react'


const ScoreBoard = () => {

    const Team1 = {
        id: 1,
        score : 0,
        players : [
            {
                id: 'p1',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                balls: 0
            },
            {
                id: 'p2',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                balls:0
            },
            {
                id: 'p5',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                balls:0
            }
        ]
    }

    const Team2 = {
        id: 1,
        score : 0,
        players : [
            {
                id: 'p3',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                balls:0
            },
            {
                id: 'p4',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                balls:0
            },
            {
                id: 'p6',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                balls:0
            }
        ]
    }


    const maxOvers = 3;


    const [team1,setteam1] = useState(Team1)
    const [team2,setteam2] = useState(Team2)
    const [currteam,setcurrteam] = useState(Team1);
    const [player1, setplayer1] = useState(team1.players[0]);
    const [player2, setplayer2] = useState(team1.players[1]);
    const [currplayer, setcurrplayer] = useState(team1.players[0]);
    const [isnb, setisnb] = useState(false);
    const [iswide, setiswide] = useState(false);
    const [totalScore,settotalScore] = useState(0);
    const [player1Score, setplayer1Score] = useState(0);
    const [player2Score, setplayer2Score] = useState(0);
    const [nextIndex, setnextIndex] = useState(3);
    const [currOvers, setCurrOvers] = useState(0);
    const [currBalls,setcurrBalls] = useState(0);
    const [currInning, setcurrInning] = useState(1);
    const [striker, setstriker] = useState(1);


    const handleEndInning = ()=>{

        


        if(currInning==1) setcurrInning(2);
        // else handleSubmit();
    }

    const handleIncreaseBalls = () => {
        if(currBalls==5){
            if(currOvers==maxOvers-1){
                handleEndInning();
            }
            else{
                setcurrBalls(0);
                setCurrOvers(currOvers+1);
                setstriker((striker+1)%2)
            }
        }
    }

    const handleRun = (run) => {
        let temp = 0;
        if(isnb){
            settotalScore(totalScore+run+1);
            setisnb(false);
            temp = 1;
        }
        else{
            settotalScore(totalScore+run);
        }
        if(striker==1) setplayer1({...player1,total_score: player1.total_score+run})
        else setplayer2({...player2,total_score: player2.total_score+run})
        if(run%2) setstriker(striker==1 ? 2 : 1);
        handleIncreaseBalls();
    }

    const handlenb = () => {
        setisnb(!isnb);
    }

    const handlewide = () => {
        settotalScore(totalScore+1);
    }


    // const handleOut = () => {
    //     if(striker==1){
    //         setteam1({...team1,players:})
    //     }
    // }


    return (
        <div className="">
            <div className='container'>
                <div className='row'>
                    <div className='col'></div>
                    <div className='col-10'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Player</th>
                                    <th scope="col">R(B)</th>
                                    <th scope="col">4s</th>
                                    <th scope="col">6s</th>
                                    <th scope="col">SR</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr>
                                    <td>{striker==1 && '*'}</td>
                                    <td>{player1.id}</td>
                                    <td>{player1.total_score}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                </tr>
                                <tr>
                                    <td>{striker==2 && '*'}</td>
                                    <td>{player2.id}</td>
                                    <td>{player2.total_score}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col'></div>
                </div>
            </div>

            <div className="container pt-5">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-10">
                                <div className="row">
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={() => handleRun(0)}>0</button></div>
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={() => handleRun(1)}>1</button></div>
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={() => handleRun(2)}>2</button></div>
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={() => handleRun(3)}>3</button></div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={() => handleRun(4)}>4</button></div>
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={() => handleRun(6)}>6</button></div>
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5">nb</button></div>
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5">wd</button></div>
                                </div>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-outline-info px-4">Wicket</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>


        </div>

        
    )
}

export default ScoreBoard