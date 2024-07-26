import { useParams } from 'react-router-dom';
import {View} from '../ViewS/AccountsReceivable'
import Detail from "../ViewS/AccountsReceivable/ViewDetail";
const PayableAccounts = () => {
    const { accountId } = useParams<{ accountId?: string }>();

    const numericId = accountId ? Number(accountId) : undefined;
    const isValidId = !isNaN(numericId as number);

    return (
        <div>Cuentas Por Cobrar
        {isValidId ? <Detail/> : <View/>}
        </div>
    );
};

export default PayableAccounts;