class ReviewModel {
    id: number;
    userEmail: string;
    date: string;
    rating: number;
    product_id: number;
    reviewDescription?: string;

    constructor(id: number,userEmail: string)
}