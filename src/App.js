import { useEffect, useState } from "react";
import "./styles.css";
import { validWords, validAnswers } from "./words";
import Intro from "./Intro";
import Keyboard from "./Keyboard";
import Navbar from "./Navbar";
import Notification from "./Notification";
import Row from "./Row";

function App() {
    const [answer, setAnswer] = useState("REACT");
    const [guesses, setGuesses] = useState(new Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [streak, setStreak] = useState(0);

    const newGame = () => {
        const randomWord = Math.floor(Math.random() * validAnswers.length);
        setAnswer(validAnswers[randomWord].toUpperCase());
        setGuesses(new Array(6).fill(null));
        setCurrentGuess("");
        setIsGameOver(false);
        document
            .querySelectorAll(".keyboard-button")
            .forEach((el) => (el.className = "keyboard-button"));
    };

    useEffect(() => {
        newGame();
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
                e.preventDefault();
                if (currentGuess.length < 5) {
                    setIsOpen(true);
                    setMessage("Not enough letters");
                    return;
                }

                if (
                    validWords.findIndex(
                        (word) => word === currentGuess.toLowerCase()
                    ) === -1
                ) {
                    setIsOpen(true);
                    setMessage("Not in word list");
                    return;
                }

                const guessesCopy = [...guesses];
                let currentIndex = guesses.findIndex((val) => val === null);
                guessesCopy[currentIndex] = currentGuess;
                setGuesses(guessesCopy);

                const isCorrect = answer === currentGuess;
                if (isCorrect) {
                    setIsGameOver(true);
                    setIsOpen(true);
                    setMessage("You win!");
                    setStreak(streak + 1);
                }

                if (!isCorrect && guessesCopy[5] !== null) {
                    setIsGameOver(true);
                    setIsOpen(true);
                    setMessage(answer);
                    setStreak(0);
                }

                for (let i = 0; i < 5; i++) {
                    let className = "";
                    if (currentGuess[i] === answer[i]) {
                        className = "correct";
                    } else if (answer.includes(currentGuess[i])) {
                        className = "contains";
                    } else {
                        className = "incorrect";
                    }
                    shadeKeyboard(currentGuess[i], className);
                }

                setCurrentGuess("");
            }
        };

        window.addEventListener("keydown", handleKeypress);

        return () => window.removeEventListener("keydown", handleKeypress);
    }, [currentGuess, guesses, answer, isGameOver, streak]);

    const shadeKeyboard = (key, className) => {
        for (let el of document.querySelectorAll(".keyboard-button")) {
            if (el.textContent.toUpperCase() === key) {
                if (el.classList.contains("correct")) return;
                el.classList.add(className);
            }
        }
    };

    return (
        <div className="App">
            <Navbar newGame={newGame} streak={streak} />
            <Intro />
            <Notification
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                message={message}
            />
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
            <Keyboard />
        </div>
    );
}

export default App;
