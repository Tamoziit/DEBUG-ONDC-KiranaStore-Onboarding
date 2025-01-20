export interface SignupInputs {
    name: string;
    mobileNo: string;
    password: string;
    age: number | null;
    gender: string;
    aadharNo: string;
}

export interface SignupParams {
    name: string;
    mobileNo: string;
    password: string;
    age: number | null;
    gender: string;
    aadharNo: string;
}

export interface LoginParams {
    mobileNo: string;
    password: string;
}

export interface AuthUser {
    _id: string;
    name: string;
    mobileNo: string;
    age: number;
    gender: "M" | "F" | "O";
    token: string;
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface Warehouse {
    _id: string;
    code: string;
    contactNo: string;
    address: string;
    registeredStores: string[];
    inventoryCost: number;
    income: number;
}