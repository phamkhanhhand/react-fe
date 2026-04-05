import { useEffect, useState } from "react";
import { Button, TextInput, Container, Title, Text } from "@mantine/core";
import { useExample } from "../../hooks/api/useExampleMutation";
import { useExampleGet } from "../../hooks/api/useExampleQuery";

export default function ExamplePage() {
    const [name, setName] = useState("");

    const { mutate, data, isPending, isError } = useExample();


    const { data: dataGet, refetch, isSuccess, isError: isError1, error } = useExampleGet();

    useEffect(() => {
        if (isSuccess) {
            console.log("🔥 success:", dataGet);
        }
    }, [isSuccess, dataGet]);

    useEffect(() => {
        if (isError) {
            console.log("💥 error:", error?.message);
        }
    }, [isError, error]);



    const handleSubmit = () => {

        refetch(); // ✅ gọi API tại đây
        // mutate({ name });
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