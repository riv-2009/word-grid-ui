import { useState } from "react";
import {
    Box,
    Input,
    Button,
    Center,
    Text,
    ChakraProvider,
} from "@chakra-ui/react";

const Login = ({
    connection,
    setPlayerCount,
    setUsername,
    setLetters,
}) => {
    const [user, setUser] = useState("");
    const [msg, setMsg] = useState("");
    const handleStartGame = (e) => {
        connection
            .invoke("Numplayers", user)
            .catch((err) => console.error(err.toString()));
        connection.on("NumPlayersCount", (playerCount) => {
            if (playerCount === 1) {
                setMsg("Waiting for player 2.");
            }
            if (playerCount === 2) {
                setPlayerCount(2);
                connection
                    .invoke("GetLetters")
                    .catch((err) => console.error(err.toString()));
            }
        });
        connection.on("SendRandomLetters", (letters) => {
            setLetters(letters);
        });
    };
    return (
        <ChakraProvider>
            <Center>
                {" "}
                <Box pt={50}>
                    <Text
                        bgGradient="linear(to-l,orange.500, orange.200  )"
                        bgClip="text"
                        fontSize="5xl"
                        fontWeight="extrabold"
                    >
                        Nerdle
                    </Text>
                    <Text
                        pt={50}
                        bg="blue.300"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                    >
                        Enter a username
                    </Text>
                    <Input
                        variant="flushed"
                        onChange={(e) => {
                            setUser(e.target.value);
                            setUsername(e.target.value);
                        }}
                    />
                    <Box pt={10}>
                        <Button
                            colorScheme="blue"
                            variant="solid"
                            onClick={handleStartGame}
                            disabled={!user}
                        >
                            start game
                        </Button>
                    </Box>
                    <Text
                        pt={5}
                        bg="red.300"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                    >
                        {msg}
                    </Text>
                </Box>
            </Center>
        </ChakraProvider>
    );
};

export default Login;
