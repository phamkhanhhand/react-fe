import { useMutation, useQuery } from "@tanstack/react-query";
import { exampleApi ,exampleGetApi} from "../../services/example.service"; 
import { ExampleRequest, ExampleResponse } from "../../types/example"; 
import { useEffect } from "react";

export const useExampleGet = (options?: {
  onSuccess?: (data: ExampleResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const query = useQuery<ExampleResponse>({
    queryKey: ["exampleGet", "John"],
    queryFn: () => exampleGetApi({ name: "John" }),

    enabled: false, // ❗ không auto call
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

 export const useExampleGet1 = (onSuccess?: (data: ExampleResponse) => void) => {
  const query = useQuery<ExampleResponse>({
    queryKey: ["exampleGet", "John"],
    queryFn: () => exampleGetApi({ name: "John" }),
  });

  useEffect(() => {
    if (query.isSuccess && onSuccess) {
      onSuccess(query.data);
    }
  }, [query.isSuccess]);

  return query;
};