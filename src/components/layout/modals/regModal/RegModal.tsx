import React, {FC} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import RegistrationForm from "../../../pages/auth/regestrationForm/RegistrationForm";
import Button from "@mui/material/Button";

interface RegModalInterface {
    open: boolean;
    onClose: () => void;
}

const RegModal:FC<RegModalInterface> = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby={"form-dialog-title"}
        >
            <DialogTitle
                id={"form-dialog-title"}
                sx={{bgcolor:"#081041", color:"white", pl:3}}>
                Registration
            </DialogTitle>
            <DialogContent
                sx={{bgcolor:"#081041"}}
            >
                <DialogContentText sx={{color:"white", ml:0, mb:2}}>
                    Enter your details. Everything is confidential!
                </DialogContentText>
                <RegistrationForm/>
            </DialogContent>
            <DialogActions sx={{bgcolor:"#081041"}}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        color:"white",
                        mr:1,
                        mb:1,
                        p:1,
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegModal;
