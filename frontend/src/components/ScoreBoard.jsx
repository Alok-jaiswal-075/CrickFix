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
                fours:0,
                sixes:0,
                balls: 0
            },
            {
                id: 'p2',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                fours:0,
                sixes:0,
                balls:0
            },
            {
                id: 'p5',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                fours:0,
                sixes:0,
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
                fours:0,
                sixes:0,
                balls:0
            },
            {
                id: 'p4',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                fours:0,
                sixes:0,
                balls:0
            },
            {
                id: 'p6',
                half_centuries : 0,
                centuries : 0,
                total_score : 0,
                fours:0,
                sixes:0,
                balls:0
            }
        ]
    }


    const maxOvers = 10;
    const maxWickets = Team1.players.length


    const [team1,setteam1] = useState(Team1)
    const [team2,setteam2] = useState(Team2)
    const [currteam,setcurrteam] = useState(1);
    const [player1, setplayer1] = useState(team1.players[0]);
    const [player2, setplayer2] = useState(team1.players[1]);
    const [currplayer, setcurrplayer] = useState(team1.players[0]);
    const [isnb, setisnb] = useState(false);
    const [iswide, setiswide] = useState(false);
    const [totalScore,settotalScore] = useState(0);
    const [player1Score, setplayer1Score] = useState(0);
    const [player2Score, setplayer2Score] = useState(0);
    const [nextIndex, setnextIndex] = useState(2);
    const [currOvers, setCurrOvers] = useState(0);
    const [currBalls,setcurrBalls] = useState(0);
    const [currInning, setcurrInning] = useState(1);
    const [striker, setstriker] = useState(1);
    const [wickets, setwickets] = useState(0);


    const handleEndInning = ()=>{

        


        if(currInning==1){
            setcurrInning(2);
        }
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
                setstriker(striker === 1 ? 2 : 1)
            }
        }
        else{
            setcurrBalls(currBalls+1)
        }
    }

    const handleRun = (run) => {
        if(isnb){
            settotalScore(totalScore+run+1);
        }
        else{
            settotalScore(totalScore+run);
            handleIncreaseBalls();
        }

        if(striker===1){
            setplayer1((state) => {
                const updatedRun = state.total_score + run
                const updatedBall = state.balls + !isnb
                let four = state.fours
                if (run === 4) {
                  four = four + 1
                }
                let six = state.sixes
                if (run === 6) {
                  six = six + 1
                }
                return {
                  ...state,
                  total_score: updatedRun,
                  balls: updatedBall,
                  fours: four,
                  sixes: six,
                }
              })
        }
        else{
            setplayer2((state) => {
                const updatedRun = state.total_score + run
                const updatedBall = state.balls + !isnb
                let four = state.fours
                if (run === 4) {
                  four = four + 1
                }
                let six = state.sixes
                if (run === 6) {
                  six = six + 1
                }
                return {
                  ...state,
                  total_score: updatedRun,
                  balls: updatedBall,
                  fours: four,
                  sixes: six,
                }
              })
        }


        if(run%2) setstriker(striker === 1 ? 2 : 1);
        if(isnb){
            setisnb(false);
        }
        
    }

    const handlenb = () => {
        setisnb(!isnb);
    }

    const handlewide = () => {
        settotalScore(totalScore+1);
    }


    const handleOut = () => {
        if(currteam==1){
            const oldPlayers = team1.players;
            if(striker===1){
                team1.players = oldPlayers.map((oldPlayer) => {
                    if (oldPlayer.id === player1.id) {
                      return { ...oldPlayer, 
                            total_score : player1.total_score,
                            fours:player1.fours,
                            sixes:player1.sixes,
                            balls:player1.balls

                            };
                    } else {
                      return oldPlayer;
                    }
                  });
                  setteam1(team1)
                //   console.log(team1);
            }
            else{
                team1.players = oldPlayers.map((oldPlayer) => {
                    if (oldPlayer.id === player2.id) {
                      return { ...oldPlayer, 
                            total_score : player2.total_score,
                            fours:player2.fours,
                            sixes:player2.sixes,
                            balls:player2.balls

                            };
                    } else {
                      return oldPlayer;
                    }
                  });


                setteam1(team1)
            }

            setwickets(wickets+1);
            if(wickets===maxWickets-2){
                handleEndInning();
            }
            else{
                if(striker===1){
                    setplayer1(team1.players[nextIndex]);
                }
                else{
                    setplayer2(team1.players[nextIndex]);
                }
                    
                setnextIndex(nextIndex+1);
            }

            
        }


        else{
            const oldPlayers = team2.players;
            if(striker==1){
                team2.players = oldPlayers.map((oldPlayer) => {
                    if (oldPlayer.id === player1.id) {
                      return { ...oldPlayer, 
                            total_score : player1.total_score,
                            fours:player1.fours,
                            sixes:player1.sixes,
                            balls:player1.balls

                            };
                    } else {
                      return oldPlayer;
                    }
                  });

                setteam2(team2)
            }
            else{
                team2.players = oldPlayers.map((oldPlayer) => {
                    if (oldPlayer.id === player2.id) {
                      return { ...oldPlayer, 
                            total_score : player2.total_score,
                            fours:player2.fours,
                            sixes:player2.sixes,
                            balls:player2.balls

                            };
                    } else {
                      return oldPlayer;
                    }
                  });

                setteam2(team2)
            }

            setwickets(wickets+1);
            if(wickets===maxWickets-2){
                handleEndInning();
            }
            else{
                if(striker===1){
                    setplayer1(team2.players[nextIndex]);
                }
                else{
                    setplayer2(team2.players[nextIndex]);
                }
                    
                setnextIndex(nextIndex+1);
            }


        }

        
    }


    return (
        <div className="">
            <div className='container'>
                <div className='row'>
                    <div className='col'></div>
                    <div className='col-10'>

                        <hr className="border border-primary border-3 opacity-75"></hr>
                        <h4>{totalScore} ({currOvers}.{currBalls})/{wickets}</h4>
                        <hr className="border border-primary border-3 opacity-75"></hr>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th scope="col">Player</th>
                                    <th scope="col">R(B)</th>
                                    <th scope="col">4s</th>
                                    <th scope="col">6s</th>
                                    {/* <th scope="col">SR</th> */}
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                <tr>
                                    <td>{striker==1 && '*'}</td>
                                    <td>{player1.id}</td>
                                    <td>{player1.total_score}({player1.balls})</td>
                                    <td>{player1.fours}</td>
                                    <td>{player1.sixes}</td>
                                    {/* <td>{player1.balls!=0 ? player1.total_score/player1.balls : 0}</td> */}
                                </tr>
                                <tr>
                                    <td>{striker==2 && '*'}</td>
                                    <td>{player2.id}</td>
                                    <td>{player2.total_score}({player2.balls})</td>
                                    <td>{player2.fours}</td>
                                    <td>{player2.sixes}</td>
                                    {/* <td>{player2.balls!=0 ? player2.total_score/player2.balls : 0}</td> */}
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
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={handlenb}>nb</button></div>
                                    <div className="col"><button type="button" className="btn btn-outline-info px-5" onClick={handlewide}>wd</button></div>
                                </div>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-outline-info px-4" onClick={handleOut}>Wicket</button>
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