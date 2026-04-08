import { useMutation, useQuery } from "@tanstack/react-query"; 
import { ExampleRequest, ExampleResponse } from "../../types/example"; 
import { useSaveFlexValueSetApi } from "../../services/flex-value-set.service";


export const useSaveFlexValueSetMutation = () => {
  // return useMutation<ExampleResponse, Error, ExampleRequest>({
  return useMutation<any, Error, any>({
    mutationFn: useSaveFlexValueSetApi, // ❗ function call API

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

  