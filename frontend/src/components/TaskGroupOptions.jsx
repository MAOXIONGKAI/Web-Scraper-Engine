import { Box, Typography } from "@mui/material";
import SplitButton from "./ui/SplitButton.jsx";
import { taskGroupMenuOptions } from "../data/menu.js";

export default function TaskGroupOptions({ setValue }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Typography
                variant="body2"
                color="primary"
                sx={{
                    fontSize: "0.75rem",
                    textAlign: "center",
                }}
            >
                Select Task Group
            </Typography>
            <SplitButton setValue={setValue} options={taskGroupMenuOptions} />
        </Box>
    );
}
