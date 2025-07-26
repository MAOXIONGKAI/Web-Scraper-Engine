import {Box, Typography} from "@mui/material";

export default function Title() {
    return (
        <Box gap="2.5rem">
            <Typography variant="h1" color="primary">
                Web Scraper Engine
            </Typography>
            <Typography variant="h3" color="textSecondary" fontWeight={200}>
                Execute Web Scraping Tasks in Batch
            </Typography>
        </Box>
    )
}