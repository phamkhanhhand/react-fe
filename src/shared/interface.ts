import { ENTITY_STATE } from "./enum";

export interface PagingData<T> {
    data: T[];
    meta:{

    total: number;
    page: number;
    pageSize: number; 
        "totalPages": number
    }
}

export interface BaseUiEntity{
    entityState?: ENTITY_STATE;
    isEditing?:boolean;
    uiid?: string;
}

export interface FlexValue extends BaseUiEntity{
    flexValueId?: number;
    flexValue?: String;
    flexValueName?: String;
    flexValueSetName?: String;  
    description?: String; 
}
 

export interface FlexValueSet {
    flexValueSetId?: number; 
    flexValueSetCode?: String; 
    flexValueSetName?: String;  
    description?: String; 
    detail?:FlexValue[];
    listDelete?:number[];
}