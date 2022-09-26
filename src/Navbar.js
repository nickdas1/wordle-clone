import { AppBar, Box, Typography, Toolbar, MenuItem } from "@mui/material";

export default function Navbar({ newGame, streak }) {
    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <AppBar position="static" sx={{ backgroundColor: "#121213" }}>
                <Toolbar>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            ml: 2,
                            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                        }}
                    >
                        Codele
                    </Typography>
                    {streak !== 0 && (
                        <MenuItem sx={{ flexGrow: 1 }}>
                            <Typography textAlign="center">
                                🔥 {streak}
                            </Typography>
                        </MenuItem>
                    )}
                    <button className="new-game" onClick={newGame}>
                        New Game
                    </button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
