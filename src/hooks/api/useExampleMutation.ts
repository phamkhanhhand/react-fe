import { useMutation, useQuery } from "@tanstack/react-query";
import { exampleApi ,exampleGetApi} from "../../services/example.service"; 
import { ExampleRequest, ExampleResponse } from "../../types/example"; 


export const useExample = () => {
  return useMutation<ExampleResponse, Error, ExampleRequest>({
    mutationFn: exampleApi,

    onMutate: (variables) => {
      console.log("🚀 Sending:", variables);
    },

    onSuccess: (data) => {
      console.log("✅ Success:", data);
    },

    onError: (error) => {
      console.error("❌ Error:", error.message);
    },

    onSettled: () => {
      console.log("📦 Done");
    },
  });
};

  