import { ChangeEvent, useState } from "react"
import { AddDialogProps } from "../types/types";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { backendURL } from "../constants/constants";
import { Company, Customer } from "../types/types";

const AddDialog = ({ addCustomer }: AddDialogProps) => {

    const [loadingDialog, setLoadingDialog] = useState(false)
    const [open, setOpen] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [customer, setCustomer] = useState<Customer>({
        _id: "",
        firstname: "",
        lastname: "",
        phone: "",
        company: ""
    })

    const handleOpen = async () => {
        setOpen(true);
        try {
            setLoadingDialog(true);
            const response = await fetch(backendURL + "/companies");

            if (!response.ok) {
                throw new Error("Issue fecthing company data!");
            }

            const companiesData = await response.json();
            setCompanies(companiesData);
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoadingDialog(false)
        }
    }

    const handleSelect = (event: SelectChangeEvent<string>) => {
        setCustomer({ ...customer, company: event.target.value });
    }

    const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        addCustomer(customer);
        setOpen(false);
        setCustomer(
            {
                _id: "",
                firstname: "",
                lastname: "",
                phone: "",
                company: ""
            }
        );
    }

    const handleCancel = () => {
        setOpen(false);
        setCustomer(
            {
                _id: "",
                firstname: "",
                lastname: "",
                phone: "",
                company: ""
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
                {
                    loadingDialog ? (
                        <p>Loading Dialog...</p>
                    ) : (
                        <>
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

                                <Select
                                    value={customer.company as string}
                                    sx={{ marginTop: 3 }}
                                    onChange={handleSelect}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>Select a company</MenuItem>
                                    {
                                        companies.map((company, index) => {
                                            return <MenuItem key={index} value={company._id}>{company.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button onClick={handleSave}>Save</Button>
                            </DialogActions>
                        </>
                    )
                }
            </Dialog>
        </>
    )
}

export default AddDialog