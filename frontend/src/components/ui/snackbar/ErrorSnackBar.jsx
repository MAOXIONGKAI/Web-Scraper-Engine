import {Alert, Snackbar} from "@mui/material";

export default function ErrorSnackBar({open, setOpen, message,}) {
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Snackbar
                open={open}
                message={message}
                onClose={handleClose}
                severity="error"
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
