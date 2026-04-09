
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
    flexValueId: number;
    flexValue: string;
    flexValueName: string;
    flexValueSetName: string;  
    description: string; 
}
 

export interface FlexValueSet {
    flexValueSetId: number;
    // flex_value_set_id: number;
    flexValueSetCode: string;
    // flex_value_set_name: string;
    // flex_value_set_code: string;
    flexValueSetName: string;  
    description: string; 
}