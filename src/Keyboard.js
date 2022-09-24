export default function Keyboard({ answer, guesses }) {
    const handleClick = (key) => {
        let event = new KeyboardEvent("keydown", {
            key,
            bubbles: true,
        });
        document.dispatchEvent(event);
    };

    console.log(answer)

    const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
    const thirdRow = ["Enter", "z", "x", "c", "v", "b", "n", "m", "Del"];

    const shadeKeyboardd = (key) => {
        let className = "";

        const includedInAnswer = answer.includes(key.toUpperCase());

        const previousGuessIdx = guesses.findIndex(guess => guess === null) - 1;
        const previousGuess = guesses[previousGuessIdx];
        const inPreviousGuess = previousGuess && previousGuess.includes(key.toUpperCase());

        if (includedInAnswer && inPreviousGuess) {
            className = " contains";
        }

        let inCorrectSpot;

        for (let i = 0; i < 5; i++) {
            if (previousGuess && previousGuess[i] === answer[i] && answer[i] === key.toUpperCase()) {
                inCorrectSpot = true;
            }
        }

        if (includedInAnswer && inPreviousGuess && inCorrectSpot) {
            className = " correct";
        }

        return className;
    }

    const shadeKeyboard = (key) => {
        let className = "";

        for (let el of document.querySelectorAll(".keyboard-button")) {
            const letter = el.textContent.toUpperCase();

            if (letter === "R") {
                console.log('el: ', el)
            }
            if (el.classList.contains("correct")) {
                console.log("KLJDFGKLJDFGKLJFDG")
                return;
            };
            
            const includedInAnswer = answer.includes(key.toUpperCase());

            const previousGuessIdx = guesses.findIndex(guess => guess === null) - 1;
            const previousGuess = guesses[previousGuessIdx];
            const inPreviousGuess = previousGuess && previousGuess.includes(key.toUpperCase());
    
            if (includedInAnswer && inPreviousGuess) {
                className = "contains";
            }
    
            let inCorrectSpot;
    
            for (let i = 0; i < 5; i++) {
                if (previousGuess && previousGuess[i] === answer[i] && answer[i] === key.toUpperCase()) {
                    inCorrectSpot = true;
                }
            }
    
            if (includedInAnswer && inPreviousGuess && inCorrectSpot) {
                className = "correct";
            }
        }


        return className;
    }

    return (
        <div className="keyboard-cont">
            <div className="first-row">
                {firstRow.map((key) => {

                    let className = shadeKeyboard(key);

                    return (
                        <button
                            key={key}
                            className={"keyboard-button " + className}
                            onClick={() => handleClick(key)}
                        >
                            {key}
                        </button>
                    );
                })}
            </div>
            <div className="second-row">
                {secondRow.map((key) => (
                    <button
                        key={key}
                        className="keyboard-button"
                        onClick={() => handleClick(key)}
                    >
                        {key}
                    </button>
                ))}
            </div>
            <div className="third-row">
                {thirdRow.map((key) => (
                    <button
                        key={key}
                        className="keyboard-button"
                        onClick={() =>
                            handleClick(key === "Del" ? "Backspace" : key)
                        }
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>
    );
}
