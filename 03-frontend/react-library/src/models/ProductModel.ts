class ProductModel{
    id: number;
    title: string;
    seller?: string;
    description?: string;
    quantity?: number;
    quantityAvailable?: number;
    category?: string;
    merchantEmail?:string;
    img?: string;

    constructor(
        id:number,
        title:string,
        seller:string,
        description:string,
        quantity:number,
        quantityAvailable:number,
        category:string,
        merchantEmail:string,
        img:string
    ){
        this.id=id;
        this.title=title;
        this.seller=seller;
        this.description=description;
        this.quantity=quantity;
        this.quantityAvailable=quantityAvailable;
        this.category=category;
        this.merchantEmail=merchantEmail;
        this.img=img;
    }
}

export default ProductModel;