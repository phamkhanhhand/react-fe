import { AuthRequest } from "../hooks/api/axios";
import { ExampleRequest, ExampleResponse } from "../types/example";


const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";



/*
* Save
*/
export const useSaveFlexValueSetApi = async (data: ExampleRequest): Promise<any> => {
  const { data: res } = await AuthRequest.post<any>("/flex-value-set/save", data);
  return res;
};

/*
* Delete
*/
export const useDeleteFlexValueSetApi = async (data: { flexValueSetId: number }): Promise<any> => {
  const { data: res } = await AuthRequest.delete<any>(`/flex-value-set/${data.flexValueSetId}`);
  return res;
};


/*
* Get paging
*/
export const GetFlexValueSet = async (
  pageIndex: number,
  pageSize: number,
  searchValue: string
): Promise<any> => {

  const { data: res } = await AuthRequest.get<any>(`/flex-value-set?page=${pageIndex + 1}&pageSize=${pageSize}&searchValue=${searchValue}`, {
    params: {   },
  });
  return res;
};
  
/*
* Get by id just master
*/
export const GetFlexValueSetByIdApi = async (
  flexValueSetId: number): Promise<any> => {

  const { data: res } = await AuthRequest.get<any>(`/flex-value-set/${flexValueSetId}`, {
    params: {   },
  });
  return res;
};

/*
* Get by id   master include detail
*/
export const GetByIdWithDetailApi = async (
  flexValueSetId: number): Promise<any> => {

  const { data: res } = await AuthRequest.get<any>(`/flex-value-set/detail/${flexValueSetId}`, {
    params: {   },
  });
  return res;
};
