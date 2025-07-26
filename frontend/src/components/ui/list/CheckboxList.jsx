import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxList(props) {
    const {list, checked, setChecked} = props;

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
        <List sx={{
            width: '100%',
            bgcolor: 'background.paper',
            maxHeight: maxItemInContainer * itemHeight,
            overflowY: 'auto',
        }}>
            {list.map((value, index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                sx={{
                                    color: checked.includes(value) ? 'white' : 'inherit',
                                }}
                            >
                                <CommentIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton
                            role={undefined}
                            onClick={handleToggle(value)}
                            dense
                            sx={{
                                bgcolor: checked.includes(value) ? 'primary.dark' : 'white',
                                color: checked.includes(value) ? 'white' : 'inherit',
                                '&:hover': {
                                    bgcolor: checked.includes(value) ? 'primary.main' : 'grey.100',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.includes(value)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    sx={{
                                        color: checked.includes(value) ? 'white' : 'inherit',
                                        '&.Mui-checked': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${index + 1}. ${value}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
