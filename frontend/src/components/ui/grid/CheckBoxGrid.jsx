import * as React from 'react';
import { Grid, Checkbox, IconButton, Typography, Box } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxGrid(props) {
    const { list, checked, setChecked } = props;

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const maxItemInContainer = 10;
    const itemHeight = 48;

    return (
        <Grid
            container
            spacing={2}
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                maxHeight: maxItemInContainer * itemHeight,
                overflowY: 'auto',
            }}
        >
            {list.map((value) => {
                const isChecked = checked.includes(value);
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <Grid
                        item
                        xs={12}  // full width per row, adjust as needed (e.g. xs={6} for 2 per row)
                        key={value}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                bgcolor: isChecked ? 'primary.main' : 'transparent',
                                color: isChecked ? 'white' : 'inherit',
                                borderRadius: 1,
                                px: 1,
                                py: 0.5,
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: isChecked ? 'primary.dark' : 'grey.100',
                                },
                            }}
                            onClick={handleToggle(value)}
                            role="checkbox"
                            aria-checked={isChecked}
                            tabIndex={0}
                        >
                            <Checkbox
                                edge="start"
                                checked={isChecked}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                sx={{
                                    color: isChecked ? 'white' : 'inherit',
                                    '&.Mui-checked': {
                                        color: 'white',
                                    },
                                }}
                            />
                            <Typography id={labelId} sx={{ flexGrow: 1 }}>
                                {value}
                            </Typography>
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                sx={{ color: isChecked ? 'white' : 'inherit' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // your comment button action here
                                    alert(`Comments for ${value}`);
                                }}
                            >
                                <CommentIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
}
