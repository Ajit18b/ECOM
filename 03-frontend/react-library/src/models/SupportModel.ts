class SupportModel {
    title: string;
    querry: string;
    id?: number;
    userEmail?: string;
    adminEmail?: string;
    response?: string;
    closed?: boolean;
    constructor(title: string, querry: string) {
        this.title = title;
        this.querry = querry;
    }
}
export default SupportModel;