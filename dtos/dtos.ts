

export interface Employee{
    id: string
    username: string
    password: string
    fname: string
    lname: string
    expenses: string[]
    isManager: boolean
}

export interface Expense{
    id: string
    reason: string
    amount: number // store as a whole number of cents.
    requestedBy: string //employee ID
    requestDate: number // unix epoch time
    approved: boolean
    pending: boolean
    comments?: string[]
}