import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { memo, type FC } from "react";
import { Link } from "react-router-dom";
import { FileUpload } from "../FileUpload";

export const KnowledgePage: FC = memo(() => {
    const items = [
        { id: 1, name: "Item 1", description: "説明1" },
        { id: 2, name: "Item 2", description: "説明2" },
        { id: 3, name: "Item 1", description: "説明1" },
        { id: 4, name: "Item 2", description: "説明2" },
    ];

    items;

    return (
        <>
            <p>ナレッジ機能追加ページです</p>
            <button>チャット</button>
            <br />
            <Link to="/">チャット</Link>
            <br />
            <FileUpload />
            <br />
            <Stack spacing={4} align="stretch">
                {items.map((item) => (
                    <Box key={item.id} p={4} shadow="md" borderWidth="1px" borderRadius="md" w="500px">
                        <Heading fontSize="lg">{item.name}</Heading>
                        <Text mt={2}>{item.description}</Text>
                    </Box>
                ))}
            </Stack>
        </>
    );
});
