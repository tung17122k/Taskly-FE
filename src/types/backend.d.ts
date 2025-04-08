// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript
export { };
declare global {
    interface IUserData {
        username?: string;
        email: string;
        password: string;
        confirmPassword?: string;
        role?: string
    }
}