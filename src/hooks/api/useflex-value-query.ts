import { useMutation, useQuery } from "@tanstack/react-query";
import { exampleApi ,exampleGetApi} from "../../services/example.service"; 
import { ExampleRequest, ExampleResponse } from "../../types/example"; 
import { useEffect } from "react";
import { FlexValue, PagingData,   } from "../../shared/interface";
import { GetFlexValue } from "../../services/flex-value.service"; 

export const useFlexValueQuery = (
  
  page: number,
  rowsPerPage: number,  
  options?: {
  onSuccess?: (data: PagingData<FlexValue>) => void;
  onError?: (error: Error) => void;
}) => {
  
  const query = useQuery<PagingData<FlexValue>>({
    queryKey: ["flexValue",   page, rowsPerPage],
    queryFn: () => GetFlexValue(page, rowsPerPage),

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
 