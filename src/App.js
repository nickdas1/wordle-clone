import { useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import "./styles.css";
import words from "./words";

function App() {
    const [answer, setAnswer] = useState("HELLO");
    const [guesses, setGuesses] = useState(new Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const randomWord = Math.floor(Math.random() * words.length);
        setAnswer(words[randomWord]);
    }, []);

    useEffect(() => {
        const handleKeypress = (e) => {
            if (isGameOver) return;

            if (e.key >= "a" && e.key <= "z") {
                if (currentGuess.length >= 5) return;
                setCurrentGuess((currentGuess + e.key).toUpperCase());
            }

            if (e.key === "Backspace") {
                setCurrentGuess(currentGuess.slice(0, -1));
                return;
            }

            if (e.key === "Enter") {
                if (currentGuess.length < 5) return;

                const guessesCopy = [...guesses];
                let currentIndex = guesses.findIndex((val) => val === null);
                guessesCopy[currentIndex] = currentGuess;
                setGuesses(guessesCopy);

                const isCorrect = answer === currentGuess;
                if (isCorrect || guesses[guesses.length - 1] !== null)
                    setIsGameOver(true);

                setCurrentGuess("");
            }
        };

        window.addEventListener("keydown", handleKeypress);

        return () => window.removeEventListener("keydown", handleKeypress);
    }, [currentGuess, guesses, answer, isGameOver]);

    return (
        <div className="App">
            <h1>Code-L</h1>
            {guesses.map((guess, idx) => {
                const isCurrentGuess =
                    guesses.findIndex((val) => val === null) === idx;
                return (
                    <div key={idx} className="box-group">
                        <Row
                            guess={isCurrentGuess ? currentGuess : guess || ""}
                            answer={answer}
                            isSubmitted={!isCurrentGuess && guess !== null}
                        />
                    </div>
                );
            })}
            <Keyboard
                answer={answer}
                guesses={guesses}
                currentGuess={currentGuess}
            />
        </div>
    );
}

function Row({ guess, answer, isSubmitted }) {
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

export default App;
