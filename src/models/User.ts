export default interface User{
    id: number
    name: string
    surname?: string
    email: string
    password: string
    course?: string
    accepNotifications: boolean
    role: string
}