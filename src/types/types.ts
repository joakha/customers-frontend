export type Company = {
    _id: string,
    name: string,
    address: string
}

export type Customer = {
    _id: string,
    firstname: string,
    lastname: string,
    phone: string
    company: string | Company
}

export type AddDialogProps = {
    addCustomer: (customer: Customer) => Promise<void>
}

export type EditDialogProps = {
    existingCustomer: Customer,
    editCustomer: (customer: Customer) => Promise<void>
}
