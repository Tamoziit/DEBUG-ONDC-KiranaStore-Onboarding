export interface SignupRequestBody {
    name: string;
    mobileNo: string;
    password: string;
    age: number;
    gender: string;
    aadharNo: string;
}

export interface LoginRequestBody {
    mobileNo: string;
    password: string;
}

export interface LogoutParams {
    
}