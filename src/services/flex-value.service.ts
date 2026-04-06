import { PublicRequest } from "../hooks/api/axios";
import { ExampleRequest, ExampleResponse } from "../types/example";


const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";



// POST
export const SaveFlexValue = async (data: ExampleRequest): Promise<any> => {
  const { data: res } = await PublicRequest.post<any>("/flexvalue/save", data);
  return res;
};


// GET
export const GetFlexValue = async (
  pageIndex: number,
  pageSize: number): Promise<any> => {

  const { data: res } = await PublicRequest.get<any>(`/flex-value?page=${pageIndex + 1}&pageSize=${pageSize}`, {
    params: {   },
  });
  return res;
};


export const exampleApi = async (
  data: ExampleRequest
): Promise<ExampleResponse> => {
  const res = await fetch(`${BASE_URL}/flexvalue/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
};

export const exampleGetApi = async (
  data: ExampleRequest
): Promise<ExampleResponse> => {
  const query = new URLSearchParams({
    name: data.name,
  }).toString();

  const res = await fetch(
    `http://localhost:3001/flexvalue?${query}`
  );

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
};