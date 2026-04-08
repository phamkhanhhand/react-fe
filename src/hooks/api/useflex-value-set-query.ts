import { useMutation, useQuery } from "@tanstack/react-query";
import { exampleApi ,exampleGetApi} from "../../services/example.service"; 
import { ExampleRequest, ExampleResponse } from "../../types/example"; 
import { useEffect } from "react";
import {   FlexValueSet, PagingData,   } from "../../shared/interface"; 
import { GetFlexValueSet, GetFlexValueSetByIdApi } from "../../services/flex-value-set.service";

export const useFlexValueSetQuery = (
  
  page: number,
  rowsPerPage: number,  
  searchValue: string,
  options?: {
  onSuccess?: (data: PagingData<FlexValueSet>) => void;
  onError?: (error: Error) => void;
}) => {
  
  const query = useQuery<PagingData<FlexValueSet>>({
    queryKey: ["flexValueSetList",   page, rowsPerPage, searchValue],
    queryFn: () => GetFlexValueSet(page, rowsPerPage, searchValue),

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
 


export const useGetFlexValueSetById = (
  
  flexValueSetId: number,
  options?: {
  onSuccess?: (data: FlexValueSet) => void;
  onError?: (error: Error) => void;
}) => {
  
  const query = useQuery<FlexValueSet>({
    queryKey: ["flexValueSetid", flexValueSetId],
    queryFn: () => GetFlexValueSetByIdApi(flexValueSetId),
    enabled: !!flexValueSetId, // ❗ chỉ gọi khi có id, tránh lỗi khi id chưa được set
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
   