import { useMutation } from "@tanstack/react-query";
import { exampleApi ,exampleGetApi} from "../../services/example.service";

export const useExample = () => {
  return useMutation({
    mutationFn: exampleApi,
  });
};

export const useExampleGet = () => {
     
  return useMutation({
    mutationFn: exampleGetApi,
  });   
};