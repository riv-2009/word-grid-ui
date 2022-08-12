import {
    Box,
    Center,
    Text,
    ListItem,
    UnorderedList,
    ChakraProvider,
} from "@chakra-ui/react";

const TwoPlayerScreen = ({username, score, Words }) => {
    return (
        <ChakraProvider>
            <Box>
                <Center mt="10">
                    <Text
                        bg="blue.300"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                    >
                        {username} found
                    </Text>
                </Center>
                <Center>
                    <Box width="25%">
                        <Center
                            border="2px"
                            borderColor="orange.200"
                            bg="orange.50"
                            borderRadius="lg"
                        >
                            <UnorderedList m={4}>
                                {Words.map((word, index) => (
                                    <ListItem
                                        fontSize="lg"
                                        fontWeight="bold"
                                        key={word}
                                        id={index + 1}
                                    >
                                        <Text bg="blue.200" bgClip="text">
                                            {word}
                                        </Text>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Center>
                    </Box>
                </Center>
            </Box>
            <Center>
                <Text fontWeight="bold" fontSize="lg" m={10}>
                    {username} scored <span className="text-warning">{score} </span>
                    pts
                </Text>
            </Center>
        </ChakraProvider>
    );
};
export default TwoPlayerScreen;
