import styled from "styled-components";
import { motion } from "framer-motion"
import { ReactNode } from "react";
import white_marble from '../public/white_marble.png';

const Container = styled(motion.div)`
    min-width: 523px;
    min-height: 571px;
    max-height: 571px;
    margin-right: 120px;
`;

const MarbleSlab = styled.div`
    min-width: 523px;
    min-height: 571px;
    position: relative;
    top: 0px;
    left: 0px;
    background: linear-gradient(123.63deg, #F7F9FA 2.32%, #EBECED 104.78%);
    background-blend-mode: multiply, normal;
    box-shadow: 0px 100px 70px -70px rgba(169, 180, 203, 0.25), -3px -3px 0px #FFFFFF, 0px 3px 0px rgba(214, 218, 223, 0.45), inset 0px -20px 20px rgba(255, 255, 255, 0.2);
    border-radius: 36px;

    ::before {    
      content: "";
      background-image: url(${white_marble.src});
      background-size: cover;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.075;
      border-radius: 36px;
    }
`

type SlabProps = {
    offset: number;
    enabled: boolean;
    children: ReactNode;
}
const Slab = ({offset, enabled, children}: SlabProps) => {
    return (
        <Container 
            initial={{opacity: enabled ? 1 : 0}}
            animate={{ x: offset, opacity: enabled ? 1 : 0 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
        >
            <MarbleSlab>
                {children}
            </MarbleSlab>
        </Container>
    )
}

export default Slab;