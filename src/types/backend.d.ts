// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript
export { };
declare global {
    interface IUserData {
        _id?: string;
        username?: string;
        email: string;
        password: string;
        confirmPassword?: string;
        role?: string
    }
    interface ICategoryData {
        _id?: string;
        name: string;
    }
}