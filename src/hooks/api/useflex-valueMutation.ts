import { useMutation, useQuery } from "@tanstack/react-query"; 
import { ExampleRequest, ExampleResponse } from "../../types/example"; 
import { useDeleteFlexValueApi, useSaveFlexValueApi } from "../../services/flex-value.service";


export const useSaveFlexValueMutation = () => {
  // return useMutation<ExampleResponse, Error, ExampleRequest>({
  return useMutation<any, Error, any>({
    mutationFn: useSaveFlexValueApi, // ❗ function call API

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


export const useDeleteFlexValueMutation = () => {
  // return useMutation<ExampleResponse, Error, ExampleRequest>({
  return useMutation<any, Error, any>({
    mutationFn: useDeleteFlexValueApi, // ❗ function call API

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

  