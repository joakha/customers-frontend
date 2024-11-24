import { useState } from "react"
import { AddDialogProps } from "../types/types";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AddDialog = ({ addCustomer }: AddDialogProps) => {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        id: 0,
        firstname: "",
        lastname: "",
        phone: ""
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        addCustomer(customer);
        setOpen(false);
        setCustomer(
            {
                id: 0,
                firstname: "",
                lastname: "",
                phone: ""
            }
        );
    }

    const handleCancel = () => {
        setOpen(false);
        setCustomer(
            {
                id: 0,
                firstname: "",
                lastname: "",
                phone: ""
            }
        );
    }

    return (

        <>
            <Button
                variant="contained"
                style={{ backgroundColor: "rgb(0, 204, 153)" }}
                onClick={handleOpen}
            >
                Add a Customer
            </Button>

            <Dialog open={open}>
                <DialogTitle>Add a new Customer</DialogTitle>

                <DialogContent>
                    <TextField
                        label="First Name"
                        name="firstname"
                        value={customer.firstname}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="Last Name"
                        name="lastname"
                        value={customer.lastname}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>

                    <TextField
                        label="Phone"
                        name="phone"
                        value={customer.phone}
                        margin="dense"
                        onChange={handleTextFieldChange}
                        variant="standard"
                        fullWidth>
                    </TextField>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddDialog