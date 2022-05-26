//needs to keep track of whether it's an X or an O
const Square = ({ id, player, newState }) => {
    const [color, setColor] = React.useState('green');
    const [status, setStatus] = React.useState(null); //whether its an X or O
    const XorO = ["O", "X"];

    return (
        <button 
        onClick={e => {
            let nextplayer = newState(id);
            setStatus(nextplayer);
        }}
        >
             <h1>{XorO[status]}</h1> 
        </button>
    );
};

//board needs to keep track of who has clicked on what 
//also whose turn it is to play next
//communicate both of these things down to the square
const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [state, setState] = React.useState(Array(9).fill(null));
    
    let nextPlayer = 'O';
    if (player == 1) nextPlayer = 'X';
    else nextPlayer = 'O';

    let status = `Next Player: Player ${nextPlayer}`;
    let winner = checkWinner(state);
    let winningPlayer;

    if(winner != null) {
        if (state == 1) winningPlayer = 'O';
        else winningPlayer = 'X';
        status = `Player ${winningPlayer} wins!`;
    } 

    const newState = idOfSquare => {
        let thePlayer = player;
        state[idOfSquare] = player; //player is present player
        setState(state); //state is array of 0 or 1 or null
        let nextplayer = (player + 1) % 2;
        setPlayer(nextplayer);
        return thePlayer;
    }

    function renderSquare(i) {
        return <Square id={i} player={player} newState={newState}></Square>
    }
    return (
        <div className="game-board">
            <div className="grid-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="grid-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="grid-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div id="info">
                <h1> {status} </h1>
            </div>
        </div>
    );
};

// ======================

ReactDOM.render(<Board />, document.getElementById("root"));

/*console.log(`state ${JSON.stringify(state)}`);
        status = `Player ${nextplayer}`; */