export interface IUserSlice {

}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserRegister {
    is_company : boolean,
    data: {
        company_name? : string,
        company_number? : string,
        adresse : string,
        zip_code : string,
        city : string,
        first_name: string,
        last_name: string,
        phone:string,
        email : string,
        password:string,
        password_confirmation:string
    }
}

export interface IAddress {
    street_name: string,
    city: string,
    zip_code: string,
}

export interface IDeliveryAddress {
    name: string
    phone: string
    street_name: string
    city: string
    zip_code: string
}

export interface IUserProfile {
    id: any
    first_name: string
    last_name: string
    email: string
    phone: string
    is_company: boolean
}

export interface IUserGroup {
    id: number
    name: string
    code: string
    description: string
}

export interface IDeliveryDays {
    id: number
    order_day: string
    delivery_day: string
    time: string
}

export interface IUserRegion {
    id: number
    name: string
    description: string
    delivery_days: IDeliveryDays[]
}


export interface IProfile {
    matricule: string
    phone: string
    company: string
    company_number: string
    region: IUserRegion
    user_group: IUserGroup
}

export interface IUser extends IUserProfile {
    profile: IProfile
    address: IAddress
    address_facturation: IDeliveryAddress
}