import { Container, ContainerProps } from '@chakra-ui/react';

const Content = ({ children, ...props }: ContainerProps) => {
    return (
        <Container maxW="1200px" {...props}>
            {children}
        </Container>
    );
};

export default Content;
