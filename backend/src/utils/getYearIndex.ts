import { User } from "../types/types";

const getYearIndex = (user: User): number => {
    if (!user || !user.createdAt) {
        throw new Error("User data is missing or invalid");
    }

    const currentYear = new Date().getFullYear();
    const accountCreationYear = new Date(user.createdAt).getFullYear();

    return currentYear - accountCreationYear;
};

export default getYearIndex;