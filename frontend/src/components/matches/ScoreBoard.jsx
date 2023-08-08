import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const ScoreBoard = () => {

    const params = useParams()
    const {matchId} = params



    const [team1,setteam1] = useState({})
    const [team2,setteam2] = useState({})
    const [maxOvers,setmaxOvers] = useState(2)
    const [maxWickets,setmaxWickets] = useState(4)
    const [currteam,setcurrteam] = useState(1);
    const [player1, setplayer1] = useState({});
    const [player2, setplayer2] = useState({});
    const [isnb, setisnb] = useState(false);
    const [totalScore,settotalScore] = useState(0);
    const [nextIndex, setnextIndex] = useState(2);
    const [currOvers, setCurrOvers] = useState(0);
    const [currBalls,setcurrBalls] = useState(0);
    const [currInning, setcurrInning] = useState(1);
    const [striker, setstriker] = useState(1);
    const [wickets, setwickets] = useState(0);



    const fetchMatchDetails = async () => {
        // console.log('hello')
        const res = await fetch('/api/matches/scoreboard/'+matchId, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
  
        const data = await res.json();
        // console.log(data)
        if(data && res.status === 200){
            setteam1(data.team1)
            setteam2(data.team2)
            setmaxOvers(data.overs)
            setmaxWickets(data.wickets)
            if(data.team1) setplayersdata(data.team1)
        }
    }

    const setplayersdata = (team) => {
         setplayer1(team.players[0])
         setplayer2(team.players[1])
        // console.log(player1)
        // console.log(player2)
    }

    useEffect(() => {
        fetchMatchDetails()
    }, []);

    // const Team1 = {
    //     id: 1,
    //     score : 0,
    //     players : [
    //         {
    //             id: 'p1',
    //             half_centuries : 0,
    //             centuries : 0,
    //             total_score : 0,
    //             fours:0,
    //             sixes:0,
    //             balls: 0
    //         },
    //         {
    //             id: 'p2',
    //             half_centuries : 0,
    //             centuries : 0,
    //             total_score : 0,
    //             fours:0,
    //             sixes:0,
    //             balls:0
    //         },
    //         {
    //             id: 'p5',
    //             half_centuries : 0,
    //             centuries : 0,
    //             total_score : 0,
    //             fours:0,
    //             sixes:0,
    //             balls:0
    //         }
    //     ]
    // }

    // const Team2 = {
    //     id: 2,
    //     score : 0,
    //     players : [
    //         {
    //             id: 'p3',
    //             half_centuries : 0,
    //             centuries : 0,
    //             total_score : 0,
    //             fours:0,
    //             sixes:0,
    //             balls:0
    //         },
    //         {
    //             id: 'p4',
    //             half_centuries : 0,
    //             centuries : 0,
    //             total_score : 0,
    //             fours:0,
    //             sixes:0,
    //             balls:0
    //         },
    //         {
    //             id: 'p6',
    //             half_centuries : 0,
    //             centuries : 0,
    //             total_score : 0,
    //             fours:0,
    //             sixes:0,
    //             balls:0
    //         }
    //     ]
    // }





    const handleEndInning = ()=>{
        if(currInning===1){
            window.alert('Inning 1 completed')
            updateTeam(team1,player1,1)
            updateTeam(team1,player2,1)
            setcurrInning(2);
            setcurrteam(2);
            setplayer1(team2.players[0]);
            setplayer2(team2.players[1]);
            setCurrOvers(0);
            setcurrBalls(0);
            setwickets(0);
            setstriker(1);
            setnextIndex(2);
            settotalScore(0);
            setisnb(false);
        }
        else{
            updateTeam(team2,player1,2);
            updateTeam(team2,player2,2);
            window.alert('match ended')
        }
    }

    const handleIncreaseBalls = () => {
        if(currBalls===5){
            if(currOvers===maxOvers-1){
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
        if(currteam===1){
            if(striker===1){
                updateTeam(team1,player1,1)
                
            }
            else{
                updateTeam(team1,player2,1)
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
            if(striker===1){
                updateTeam(team2,player1,2)
            }
            else{
                updateTeam(team2,player2,2)
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


    const updateTeam = (team, player, teamNum) => {
        const oldPlayers = team.players
        team.players = oldPlayers.map((oldPlayer) => {
            if (oldPlayer._id === player._id) {
              return { ...oldPlayer, 
                    total_score : player.total_score,
                    fours:player.fours,
                    sixes:player.sixes,
                    balls:player.balls

                    };
            } else {
              return oldPlayer;
            }
          });

        teamNum === 1 ? setteam1(team) : setteam2(team);
    }







    const btnStyle = "border text-col-bg-dark hover:text-col-text border-col-btn bg-col-btn px-10 py-2 sm:px-20 sm:py-2 sm:text-lg text-sm font-bold rounded hover:bg-transparent transition duration-300 ease-in-out"

    return (
        

        <div className="grid grid-cols-12 my-4 sm:my-8">


            <div className="my-4 sm:my-5 col-start-2 col-span-10 flex items-center justify-center sm:text-4xl text-xl font-heading tracking-wider text-col-btn">
                <h1>SCOREBOARD</h1>
            </div>

            <div className="my-4 sm:my-5 col-start-2 col-span-10">
                <hr className='my-5'/>
                <div className="px-10 sm:px-20 flex place-content-between sm:text-2xl text-md">
                    <p >{totalScore} ({currOvers}.{currBalls}) / {wickets}</p>
                    <p >Inning : {currInning}</p>
                </div>
                <hr className='my-5'/>
            </div>





            <div className="my-5 sm:my-10 col-start-1 col-span-full sm:col-start-2 sm:col-span-10">

                <table class="min-w-full text-center font-light sm:text-lg text-sm">
                    <thead
                        class="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                        <tr>
                            <th scope="col" className='py-5 px-5'></th>
                            <th scope="col" className='py-5 px-5'>Player</th>
                            <th scope="col" className='py-5 px-5'>R(B)</th>
                            <th scope="col" className='py-5 px-5'>4s</th>
                            <th scope="col" className='py-5 px-5'>6s</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b dark:border-neutral-500">
                            <td className="font-medium px-3">{striker===1 && <img src='../../../img/cricket-player.png' className='w-6 h-6'/>}</td>
                            <td className='py-5 px-5'>{player1.fname} {player1.lname}</td>
                            <td className='py-5 px-5'>{player1.total_score}({player1.balls})</td>
                            <td className='py-5 px-5'>{player1.fours}</td>
                            <td className='py-5 px-5'>{player1.sixes}</td>
                        </tr>
                        <tr class="border-b dark:border-neutral-500">
                            <td className="font-medium px-3">{striker===2 && <img src='../../../img/cricket-player.png' className='w-6 h-6'/>}</td>
                            <td className='py-5 px-5'>{player2.fname} {player2.lname}</td>
                            <td className='py-5 px-5'>{player2.total_score}({player2.balls})</td>
                            <td className='py-5 px-5'>{player2.fours}</td>
                            <td className='py-5 px-5'>{player2.sixes}</td>
                        </tr>
                    </tbody>
                </table>










                
            </div>

            <div className="my-5 sm:my-10 col-start-1 col-span-full sm:col-start-3 sm:col-span-8">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex gap-4 sm:gap-8 flex-wrap justify-center items-center">
                        <button type="button" className={btnStyle} onClick={() => handleRun(0)}>0</button>
                        <button type="button" className={btnStyle} onClick={() => handleRun(1)}>1</button>
                        <button type="button" className={btnStyle} onClick={() => handleRun(2)}>2</button>
                        <button type="button" className={btnStyle} onClick={() => handleRun(3)}>3</button>
                        <button type="button" className={btnStyle} onClick={() => handleRun(4)}>4</button>
                        <button type="button" className={btnStyle} onClick={() => handleRun(6)}>6</button>
                        <button type="button" className={btnStyle} onClick={handlenb}>nb</button>
                        <button type="button" className={btnStyle} onClick={handlewide}>wd</button>
                        <button type="button" className={btnStyle} onClick={handleOut}>Wicket</button>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>

        </div>
    )
}

export default ScoreBoard