import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

const Content = ({ children }: { children?: ReactNode }) => {
    return <Container maxW="1200px">{children}</Container>;
};

export default Content;
