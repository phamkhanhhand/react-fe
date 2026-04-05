import { useState } from "react";
import { Button, TextInput, Container, Title, Text } from "@mantine/core";
import { useExample, useExampleGet } from "../../hooks/api/useExample";

export default function ExamplePage() {
    const [name, setName] = useState("");

      const { mutate, data, isPending, isError } = useExampleGet();

    const handleSubmit = () => {
        mutate({ name });
    };

    return (
        <Container size="sm">
            <Title mb="md">Example Page</Title>

            <TextInput
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
            />
 

            <Button mt="md" onClick={handleSubmit} loading={isPending}  >
                Submit
            </Button>
            
      {isError && <Text c="red">Something went wrong</Text>}

      {data && (
        <Text mt="md" c="green">
          Response: {JSON.stringify(data)}
        </Text>
      )}
        </Container>
    );
}