import { Heading, Text } from "@chakra-ui/react";

const Timer = ({ timer, setTimer }) => {
    const decrementTimer = () => {
        setTimer(timer - 1);
    };
    if (timer !== -1) setTimeout(decrementTimer, 1000);

    return (
        <>
            <Heading size="lg">
                <Text bg="red" bgClip="text">
                    {timer}
                </Text>
            </Heading>
        </>
    );
};

export default Timer;
