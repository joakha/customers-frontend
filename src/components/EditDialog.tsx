import { useState } from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { EditDialogProps } from "../types/types";

const EditDialog = ({ existingCustomer, editCustomer }: EditDialogProps) => {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(existingCustomer)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        editCustomer(customer);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
        setCustomer(
            {
                id: existingCustomer.id,
                firstname: existingCustomer.firstname,
                lastname: existingCustomer.lastname,
                phone: existingCustomer.phone
            }
        );
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
            >
                Edit
            </Button>

            <Dialog open={open}>
                <DialogTitle>Edit Customer Information</DialogTitle>

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

export default EditDialog