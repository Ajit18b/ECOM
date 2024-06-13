class MerchantApplicationModel {
    id?: number;
    firstName : string;
    lastName: string;
    businessName: string;
    merchantEmail: string;
    merchantPhone: string;
    remark: string
    adminEmail?: string;
    approval?: boolean;

    constructor(firstName:string,lastName:string,businessName:string,merchantEmail:string,merchantPhone:string,remark:string) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.businessName=businessName;
        this.merchantEmail=merchantEmail;
        this.merchantPhone=merchantPhone;
        this.remark=remark;
    }
}

export default MerchantApplicationModel;