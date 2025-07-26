import {Box, Button, Input} from "@mui/material";
import TaskGroupOptions from "../TaskGroupOptions.jsx";
import TaskMenu from "../TaskMenu.jsx";
import {useState} from "react";
import {taskGroupMenuOptions} from "../../data/menu.js";
import ErrorSnackBar from "../ui/snackbar/ErrorSnackBar.jsx";
import ButtonGroup from "@mui/material/ButtonGroup";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function TaskDashboard({loading, setLoading}) {
    const [taskGroupName, setTaskGroupName] = useState(taskGroupMenuOptions[0]);
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [checked, setChecked] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [listView, setListView] = useState(true);

    const getTasks = async () => {
        const requestURL = `${backendURL}/api/load-tasks`;
        const requestConfig = {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({taskGroupName}),
        }

        setLoading(true);
        await fetch(requestURL, requestConfig)
            .then(res => res.json())
            .then(data => setTasks(data.tasks ?? []))
            .catch(err => {
                console.log(err.message);
                setErrorMessage(err.message);
                setOpenErrorMessage(true);
            })
            .finally(() => setLoading(false));
    }

    const selectAllTasks = () => {
        const allTaskNames = tasks.map(task => task.name);
        setChecked(allTaskNames);
    }

    const clearAllTasks = () => {
        setChecked([]);
    }

    const executeTasks = async () => {
        const requestURL = `${backendURL}/api/execute-tasks`;
        const requestConfig = {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                input: input,
                choices: checked
            }),
        }
        setLoading(true);
        await fetch(requestURL, requestConfig)
            .catch(err => {
                console.log(err.message);
                setErrorMessage(err.message);
                setOpenErrorMessage(true);
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <Box sx={{display: 'flex', width: "100%", gap: "5vw", justifyContent: "center",}}>
                <TaskGroupOptions setValue={setTaskGroupName}/>
                <Button
                    variant="contained"
                    loading={loading}
                    onClick={getTasks}
                >Load Tasks
                </Button>
            </Box>
            <Input
                label="Input"
                name="input"
                sx={{
                    '& input': {
                        textAlign: 'center',
                    }
                }}
                placeholder="Input any common input or query you need to inject to each task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Box sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <ButtonGroup>
                <Button
                    variant="outlined"
                    loading={loading}
                    onClick={clearAllTasks}
                >
                    Clear All
                </Button>
                <Button
                    variant="contained"
                    loading={loading}
                    onClick={selectAllTasks}
                >
                    Select All
                </Button>
                </ButtonGroup>
                <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}>
                    <Button
                        variant="contained"
                        loading={loading}
                        sx={{

                        }}
                        onClick={executeTasks}
                    >
                        Execute
                    </Button>
                </Box>
                <ButtonGroup>
                    <Button
                        variant="outlined"
                        loading={loading}
                        onClick={() => setListView(true)}
                    >
                        List
                    </Button>
                    <Button
                        variant="contained"
                        loading={loading}
                        onClick={() => setListView(false)}
                    >
                        Grid
                    </Button>
                </ButtonGroup>
            </Box>
            <Box sx={{display: 'flex', width: "100%"}}>
                {tasks && <TaskMenu
                    tasks={tasks}
                    checked={checked}
                    setChecked={setChecked}
                    listView={listView}
                />}
            </Box>
            <ErrorSnackBar
                open={openErrorMessage}
                setOpen={setOpenErrorMessage}
                message={errorMessage}
            />
        </>
    )
}