import { IPreOrderKeys } from "@/shared/interfaces/Preorder/IPreOrderKeys";
import { Order } from "../components/order/Order"
import { IPreOrder } from "@/shared/interfaces/Preorder/IPreOrder";

const AddOrder = (props: {preOrderKeys : IPreOrderKeys[], idPreOrder : number})=>{

    return(
        <div>
            <Order preorderKeys={props.preOrderKeys}/>
        </div>
    )
}

export default AddOrder;