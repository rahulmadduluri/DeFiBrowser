import styled from "styled-components";
import white_marble from '../public/white_marble.png';

const Container = styled.div`
    width: 523px;
    min-height: 571px;
    background: linear-gradient(123.63deg, #F7F9FA 2.32%, #EBECED 104.78%);
    background-blend-mode: multiply, normal;
    box-shadow: 0px 100px 70px -70px rgba(169, 180, 203, 0.25), -3px -3px 0px #FFFFFF, 0px 3px 0px rgba(214, 218, 223, 0.45), inset 0px -20px 20px rgba(255, 255, 255, 0.2);
    filter: blur(0.5px);
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
      opacity: 0.10;
      border-radius: 36px;
    }
}

`

const Slab = () => {
    return <Container/>
}

export default Slab;