export interface Customer {
    id: number,
    firstname: string,
    lastname: string,
    phone: string
}

export interface AddDialogProps {
    addCustomer: (customer: Customer) => Promise<void>
}

export interface EditDialogProps {
    existingCustomer: Customer,
    editCustomer: (customer: Customer) => Promise<void>
}
