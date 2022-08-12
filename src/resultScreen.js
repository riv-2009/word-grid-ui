import { useState, useEffect } from "react";
import TwoPlayerScreen from "./twoPlayerScreen";
import { Center, Text, ChakraProvider } from "@chakra-ui/react";

const ResultScreen = ({ Words, username, connection }) => {
    const [score, setScore] = useState(0);
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);
    const [winner, setWinner] = useState("");
    const [player1Words, setPlayer1Words] = useState([]);
    const [player2Words, setPlayer2Words] = useState([]);
    
    useEffect(() => {
        getScore();
    }, [Words]);

    useEffect(() => {
        connection
            .invoke("NerdleWinner", username, score, Words)
            .catch((err) => console.error(err.toString()));
    }, [score]);

    useEffect(() => {
        connection.on(
            "SendNerdleWinner",
            (winner, p1, p2, p1Score, p2Score, p1Words, p2Words) => {
                setWinner(winner);
                setPlayer1(p1);
                setPlayer2(p2);
                setP1Score(p1Score);
                setP2Score(p2Score);
                if (p1Words != null) {
                    setPlayer1Words(p1Words);
                }
                if (p2Words != null) {
                    setPlayer2Words(p2Words);
                }
            }
        );
    },[player2Words]);

    const getScore = () => {
        {
            let pts = 0;
            for (let i in Words) {
                switch (Words[i].length) {
                    case 3:
                        pts = pts + 1;
                        setScore(pts);
                        break;
                    case 4:
                        pts = pts + 2;
                        setScore(pts);
                        break;
                    case 5:
                        pts = pts + 4;
                        setScore(pts);
                        break;
                    case 6:
                        pts = pts + 6;
                        setScore(pts);
                        break;
                    case 7:
                        pts = pts + 8;
                        setScore(pts);
                        break;
                    case 8:
                        pts = pts + 10;
                        setScore(pts);
                        break;
                    default:
                        pts = pts + 15;
                        setScore(pts);
                        break;
                }
            }
        }
    };
    return (
        <ChakraProvider>
            <Center m={50}>
                <Text
                    bgGradient="linear(to-l,orange.500, orange.200  )"
                    bgClip="text"
                    fontSize="5xl"
                    fontWeight="extrabold"
                >
                    {winner.toUpperCase()}
                </Text>
            </Center>
            <TwoPlayerScreen
                username={player1}
                score={p1Score}
                Words={player1Words}
            ></TwoPlayerScreen>
            <TwoPlayerScreen
                username={player2}
                score={p2Score}
                Words={player2Words}
            ></TwoPlayerScreen>
        </ChakraProvider>
    );
};
export default ResultScreen;
