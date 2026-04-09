import { useMutation, useQuery } from "@tanstack/react-query";
import { exampleApi ,exampleGetApi} from "../../services/example.service"; 
import { ExampleRequest, ExampleResponse } from "../../types/example"; 
import { useEffect } from "react";
import { FlexValue, PagingData,   } from "../../shared/interface";
import { GetFlexValue, GetFlexValueByIdApi } from "../../services/flex-value.service"; 

export const useFlexValueQuery = (
  
  page: number,
  rowsPerPage: number,  
  searchValue: string,
  options?: {
  onSuccess?: (data: PagingData<FlexValue>) => void;
  onError?: (error: Error) => void;
}) => {
  
  const query = useQuery<PagingData<FlexValue>>({
    queryKey: ["flexValue",   page, rowsPerPage, searchValue],
    queryFn: () => GetFlexValue(page, rowsPerPage, searchValue),

    // enabled: false, // ❗ không auto call
  });

  useEffect(() => {
    if (query.isSuccess && options?.onSuccess) {
      options.onSuccess(query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (query.isError && options?.onError) {
      options.onError(query.error as Error);
    }
  }, [query.isError, query.error]);

  return query;
};
 
 export const useGetFlexValueById = (
   
   flexValueId: number,
   options?: {
   onSuccess?: (data: FlexValue) => void;
   onError?: (error: Error) => void;
 }) => {
   
   const query = useQuery<FlexValue>({
     queryKey: ["flexValueid", flexValueId],
     queryFn: () => GetFlexValueByIdApi(flexValueId),
     enabled: !!flexValueId, // ❗ chỉ gọi khi có id, tránh lỗi khi id chưa được set
     // enabled: false, // ❗ không auto call
   });
 
   useEffect(() => {
     if (query.isSuccess && options?.onSuccess) {
       options.onSuccess(query.data);
     }
   }, [query.isSuccess, query.data]);
 
   useEffect(() => {
     if (query.isError && options?.onError) {
       options.onError(query.error as Error);
     }
   }, [query.isError, query.error]);
 
   return query;
 };
    