export default function Row({ guess, answer, isSubmitted }) {
    const tiles = [];

    for (let i = 0; i < 5; i++) {
        let className = "tile ";

        if (isSubmitted) {
            if (guess[i] === answer[i]) {
                className += "correct";
            } else if (answer.includes(guess[i])) {
                className += "contains";
            } else {
                className += "incorrect";
            }
        }

        tiles.push(
            <div
                key={`tile${i}`}
                className={className}
                style={isSubmitted ? { border: "2px solid transparent" } : {}}
            >
                {guess[i]}
            </div>
        );
    }

    return tiles.map((tile) => tile);
}