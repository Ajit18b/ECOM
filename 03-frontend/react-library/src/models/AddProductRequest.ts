class AddProductRequest {
    title: string;
    seller: string;
    description: string;
    quantity: number;
    category: string;
    merchantEmail?:string;
    img?: string;
    constructor(title:string,seller:string,description:string, quantity:number,category:string){
        this.title=title;
        this.seller=seller;
        this.description=description;
        this.quantity=quantity;
        this.category=category;
        //this.merchantEmail=merchantEmail;
    }
}
export default AddProductRequest;