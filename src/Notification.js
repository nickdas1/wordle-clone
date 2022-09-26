import { Snackbar, SnackbarContent } from "@mui/material";

export default function Notification({ isOpen, setIsOpen, message }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isOpen}
            autoHideDuration={1500}
            onClose={() => setIsOpen(false)}
        >
            <SnackbarContent
                message={message}
                sx={{
                    backgroundColor: "white",
                    color: "black",
                    justifyContent: "center",
                    fontWeight: "bold",
                }}
            />
        </Snackbar>
    );
}
