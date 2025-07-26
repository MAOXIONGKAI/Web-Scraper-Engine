import {useState} from 'react'
import './App.css'
import {Box} from "@mui/material"
import Title from './components/app/Title.jsx'
import TaskDashboard from "./components/app/TaskDashboard.jsx";

function App() {
    const [loading, setLoading] = useState(false);

    return (<>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                margin: "auto",
                width: "100%",
                gap: "5vh",
            }}>
                <Title/>
                <TaskDashboard loading={loading} setLoading={setLoading} />
            </Box>
        </>)
}

export default App
