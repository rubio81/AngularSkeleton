import { LoginObject } from "./login-object.model";
import { supportsScrollBehavior } from "@angular/cdk/platform";

export class ResetPasswordObject extends LoginObject {    
    public newPassword: string;
    public confirmNewPassword: string;

    constructor(object: any){
        console.log('constructor: ' + JSON.stringify(object));
        super(new LoginObject({username: object.username, password: object.password}));
        //this.oldPassword = (object.oldPassword) ? object.oldPassword : null;
        this.newPassword = (object.newPassword) ? object.newPassword : null;
        this.confirmNewPassword = (object.confirmNewPassword) ? object.confirmNewPassword : null;
    }
}
