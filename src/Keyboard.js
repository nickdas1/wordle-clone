export default function Keyboard({ answer, guesses }) {
    const handleClick = (key) => {
        let event = new KeyboardEvent("keydown", {
            key,
            bubbles: true,
        });
        document.dispatchEvent(event);
    };

    const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
    const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
    const thirdRow = ["Enter", "z", "x", "c", "v", "b", "n", "m", "Del"];

    return (
        <div className="keyboard-cont">
            <div className="first-row">
                {firstRow.map((key) => {
                    return (
                        <button
                            key={key}
                            className="keyboard-button"
                            onClick={(e) => handleClick(key)}
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
