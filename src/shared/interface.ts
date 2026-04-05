
export interface PagingData<T> {
    data: T[];
    meta:{

    total: number;
    page: number;
    pageSize: number; 
        "totalPages": number
    }
}

export interface FlexValue {
    flex_value: string;
    flex_value_name: string;
    flex_value_set_name: string;
    id: number;

}




export interface FlexValue {
    flexValue: string;
    flexValueName: string;
    flex_value_set_name: string;
    id: number;

}