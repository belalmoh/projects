enum AccountsType {
    normal = 1,
    facebook,
    twitter,
    gmail
}

interface IOAuthSocial{

}

interface IAccounts {
    signin(username: string, password: string): Accounts;
    signout(): void;
}

class Accounts {
    static lastId: number;

    private userName: string;
    private password: string;
    private nickName: string;
    private accountType: AccountsType;

    constructor(){

    }

    signout(){

    }
}