import { PublicRequest } from "../hooks/api/axios";
import { ExampleRequest, ExampleResponse } from "../types/example";


const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";



// POST
export const useSaveFlexValueApi = async (data: ExampleRequest): Promise<any> => {
  const { data: res } = await PublicRequest.post<any>("/flex-value/save", data);
  return res;
};

export const useDeleteFlexValueApi = async (data: { flexValueId: number }): Promise<any> => {
  const { data: res } = await PublicRequest.delete<any>(`/flex-value/${data.flexValueId}`);
  return res;
};


// GET
export const GetFlexValue = async (
  pageIndex: number,
  pageSize: number,
  searchValue: string
): Promise<any> => {

  const { data: res } = await PublicRequest.get<any>(`/flex-value?page=${pageIndex + 1}&pageSize=${pageSize}&searchValue=${searchValue}`, {
    params: {   },
  });
  return res;
};
  
// GET
export const GetFlexValueByIdApi = async (
  flexValueId: number): Promise<any> => {

  const { data: res } = await PublicRequest.get<any>(`/flex-value/${flexValueId}`, {
    params: {   },
  });
  return res;
};
