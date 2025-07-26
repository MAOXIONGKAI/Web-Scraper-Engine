import CheckboxList from "./ui/list/CheckboxList.jsx";
import {Box, Typography} from "@mui/material";
import CheckboxGrid from "./ui/grid/CheckBoxGrid.jsx";


export default function TaskMenu({tasks, checked, setChecked, listView}) {
    const taskNames = tasks.map((task) => `${task.name}`);
    const taskMenuUI = listView
        ? <CheckboxList list={taskNames} checked={checked} setChecked={setChecked} />
        : <CheckboxGrid list={taskNames} checked={checked} setChecked={setChecked} />;
    
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}>
                {tasks.length > 0 && <>
                    <Typography variant="h6">
                        {`${checked.length}/${tasks.length} task(s) selected`}
                    </Typography>
                    {taskMenuUI}
                </>
                }
            </Box>
        </>
    )
}
