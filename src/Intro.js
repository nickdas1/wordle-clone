import { useState } from "react";
import { Box } from "@mui/system";
import { Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function Intro() {
    const [open, setOpen] = useState(true);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -70%)",
        width: "20rem",
        height: "40%",
        bgcolor: "black",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        color: "white",
        borderRadius: "10px"
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            disableAutoFocus
        >
            <Box sx={style}>
                <Close sx={{ float: "right", cursor: "pointer" }} onClick={() => setOpen(false)} />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Welcome to Codele!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Codele is a take on the popular game Wordle, where all of
                    the answers are programming-related terms.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Guess a valid 5 letter word and hit enter to see how close
                    your guess is to the answer.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Click the New Game button to reset the game with a new
                    answer. See how many answers you can get in a row!
                </Typography>
            </Box>
        </Modal>
    );
}
