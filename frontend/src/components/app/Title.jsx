import {Box, Typography} from "@mui/material";

export default function Title() {
    return (
        <Box gap="1vh">
            <Typography variant="h1">
                Web Scraper Engine
            </Typography>
            <Typography variant="h2" color="textSecondary">
                Execute Web Scraping Tasks in Batch
            </Typography>
        </Box>
    )
}