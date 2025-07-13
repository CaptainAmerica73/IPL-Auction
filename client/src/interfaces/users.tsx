export interface User {
    _id: string;
    userName: string;
    role: "user" | "admin";
    isAuthenticated: boolean;
    auction: string | null;
    teamName: string;
}

export interface Users {
    users: User[];
    totalUsers: number;
    isLoading: boolean;
    error: string | null;
}
