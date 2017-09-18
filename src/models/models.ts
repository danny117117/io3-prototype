/* ------------------------------ */
export class SerializationHelper {
    static toInstance<T>(obj: T, json: string): T {
        var jsonObj = JSON.parse(json);
        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }
        return obj;
    }
}
/* ------------------------------ */


// Login
/* ------------------------------ */
export class Params_Authenticate
{
    USER_NAME: string;
    PASSWORD: string;
}

export class User{
    Is_Authentic: boolean;
    SESSION_ID: boolean;
}
/* ------------------------------ */

// Register
/* ------------------------------ */
export class RegisterInfo
{
    WEB_USER_ID : string;
    POLICY_NBR: string;
    EXPIRY_DATE: string;
    PIN: number;
    EMAIL: string;
    MOBILE: string;
    PRODUCT_CODE: string;
}

export class Params_GetSignup
{

}

export class Codes
{
    Tbl_Name: string;
    Code: string;
    Eng_Full: string;
}
/* ------------------------------ */


/* Portfolio */
/* ------------------------------ */
export class Polcom
{
    Pol_serno: number;
    PolicyType: string;
    PolicyNo: string;
    ProductName: string;
    HolderName: string;
    Tabs: string;
}
/* ------------------------------ */

/* ------------------------------ */
export class Params_Acquire_PNS_Token
{
    input: string;
}
/* ------------------------------ */
