class HistoryModel {
    id:number;
    userEmail:string;
    checkoutDate:string;
    orderDate:string;
    title:string;
    seller:string;
    description:string;
    img:string;

    constructor(id:number,userEmail:string,checkoutDate:string,orderDate:string,title:string,seller:string,description:string,img:string){
        this.id=id;
        this.userEmail=userEmail;
        this.checkoutDate=checkoutDate;
        this.orderDate=orderDate;
        this.title=title;
        this.seller=seller;
        this.description=description;
        this.img=img;
    }

}
export default HistoryModel;