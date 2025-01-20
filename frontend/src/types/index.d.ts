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

export interface StoreRegistrationParams {
    name: string;
    gstNo: string;
    address: string;
    contactNo: string;
    warehouseId: string;
    inventory: InventoryParams[];
}

export interface InventoryParams {
    item: string;
    url: string;
    quantity: number | null;
    costPerItem: number | null;
    mrp: number | null;
}

export interface StoreProps {
    _id: string;
    name: string;
    gstNo: string;
    address: string;
    contactNo: string;
    warehouseId: string;
    warehouseCode: string;
    inventory: InventoryParams[];
    incomePerMonth: number[];
    incomePerYear: number[];
}