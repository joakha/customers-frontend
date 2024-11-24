export type Customer = {
    _id: string,
    firstname: string,
    lastname: string,
    phone: string
}

export type AddDialogProps = {
    addCustomer: (customer: Customer) => Promise<void>
}

export type EditDialogProps = {
    existingCustomer: Customer,
    editCustomer: (customer: Customer) => Promise<void>
}
