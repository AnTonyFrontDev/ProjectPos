export interface IOrderColumns {
    id: number;
    client: {
        f_name: string;
        f_surname: string;
        l_surname: string;
    };
    descriptioN_JOB: string;
    statuS_ORDER: string;
}