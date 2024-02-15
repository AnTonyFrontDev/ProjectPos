import { IOrderPost, Product } from "@/shared/interfaces/order/IOrderPost";

export default class OrderDtoAdd implements IOrderPost{
    id: number = 0;
    user: number = 0;
    date: string = "";
    fkClient: number;
    fkUser: number;
    checked: boolean;
    fkPreOrder: number;
    descriptionJob: string;
    products: Product[] = [];

}