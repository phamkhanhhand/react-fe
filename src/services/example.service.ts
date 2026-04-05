import { ExampleRequest, ExampleResponse } from "../types/example";

export const exampleApi = async (
  data: ExampleRequest
): Promise<ExampleResponse> => {
  const res = await fetch("http://localhost:3001/flexvalue/add", {
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