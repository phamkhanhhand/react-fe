import { AuthRequest } from "../hooks/api/axios";
import { ExampleRequest, ExampleResponse } from "../types/example";


const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";



/*
* Lưu
*/
export const useSaveFlexValueApi = async (data: ExampleRequest): Promise<any> => {
  const { data: res } = await AuthRequest.post<any>("/flex-value/save", data);
  return res;
};

/*
* Xóa
*/
export const useDeleteFlexValueApi = async (data: { flexValueId: number }): Promise<any> => {
  const { data: res } = await AuthRequest.delete<any>(`/flex-value/${data.flexValueId}`);
  return res;
};

  

/*
* Get detail
*/
export const GetFlexValueByIdApi = async (
  flexValueId: number): Promise<any> => {

  const { data: res } = await AuthRequest.get<any>(`/flex-value/${flexValueId}`, {
    params: {   },
  });
  return res;
};


/*
* Paging all
*/
export const GetFlexValue = async (
  pageIndex: number,
  pageSize: number,
  searchValue: string
): Promise<any> => {

  const { data: res } = await AuthRequest.get<any>(`/flex-value?page=${pageIndex + 1}&pageSize=${pageSize}&searchValue=${searchValue}`, {
    params: {   },
  });
  return res;
};



/*
* Get all by set id
*/
export const GetAllFlexValueBySetId = async (
  id: number 
): Promise<any> => {

  const { data: res } = await AuthRequest.get<any>(`/flex-value/set/${id}`, {
    params: {   },
  });
  return res;
};