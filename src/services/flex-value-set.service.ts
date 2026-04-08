import { PublicRequest } from "../hooks/api/axios";
import { ExampleRequest, ExampleResponse } from "../types/example";


const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";



// POST
export const useSaveFlexValueSetApi = async (data: ExampleRequest): Promise<any> => {
  const { data: res } = await PublicRequest.post<any>("/flex-value-set/save", data);
  return res;
};

export const useDeleteFlexValueSetApi = async (data: { flexValueSetId: number }): Promise<any> => {
  const { data: res } = await PublicRequest.delete<any>(`/flex-value-set/${data.flexValueSetId}`);
  return res;
};


// GET
export const GetFlexValueSet = async (
  pageIndex: number,
  pageSize: number): Promise<any> => {

  const { data: res } = await PublicRequest.get<any>(`/flex-value-set?page=${pageIndex + 1}&pageSize=${pageSize}`, {
    params: {   },
  });
  return res;
};
  
// GET
export const GetFlexValueSetByIdApi = async (
  flexValueSetId: number): Promise<any> => {

  const { data: res } = await PublicRequest.get<any>(`/flex-value-set/${flexValueSetId}`, {
    params: {   },
  });
  return res;
};
