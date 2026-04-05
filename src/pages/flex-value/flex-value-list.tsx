import { useEffect, useState } from "react";
import { Button, TextInput, Container, Title, Text, Table, TableTr } from "@mantine/core";
import { useExample } from "../../hooks/api/useExampleMutation";
import { useFlexValueQuery } from "../../hooks/api/useflex-value-query";
import { FlexValue } from "../../shared/interface";

export default function FlexValuePage() {

    const { data: dataRepo, isLoading, isError, error, refetch } = useFlexValueQuery();

    useEffect(() => {
    refetch(); // bây giờ mới gọi
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message}</div>;



    return (
        <Container size="sm">
            <Title mb="md">Danh sách giá trị danh mục</Title>

            <Table>
                <Table.Thead>

                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Name</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {dataRepo?.data?.map((item: FlexValue
                    ) => (
                        <Table.Tr key={item.id}>
                            <Table.Td>{item.flexValue}</Table.Td>
                            <Table.Td>{item.flexValueName}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

        </Container>
    );
}