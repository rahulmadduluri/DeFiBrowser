import Head from 'next/head'

import { useRouter } from 'next/router'
import styled from 'styled-components';

import CTAButton from '../components/CTAButton';
import black_marble from '../public/black_marble.png';
import pillar_base from '../public/pillar_base.png';
import pillar_top from '../public/pillar_top.png';
import pillar_arrow from '../public/pillar_arrow.png';
import favicon from '../public/favicon.ico';


const Hero = styled.main`
  background: ${props => props.theme.mainBg};
  width: 100%;
  min-height: 65vh;
`;

const HeaderContainer = styled.div`
  height: 96px;
  width: 50%;
  min-width: 900px;
  max-width: ${props => props.theme.designWidth};
  margin: auto;
`;

const MarbleText = styled.text`
  font-family: ${props => props.theme.accentFont};
  background: url(${black_marble.src}) 50% 0 no-repeat;
  background-clip: text;
  // For some reason styled-components doesn't include this vendor prefix
  -webkit-background-clip: text;
  color: transparent;
  background-size: cover;
`;

const Wordmark = styled(MarbleText)`
  position: relative;
  top: 50%;
  font-size: 24px;
  line-height: 30px;
  font-weight: bold;
`;

const HeroInner = styled.div`
  width: 50%;
  min-width: 900px;
  height: calc(65vh - 96px);
  /* background-color: red; */
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeroTextContainer = styled.div`
  width: 50%;
`;

const HeroText = styled(MarbleText)`
  width: 50%;
  top: 48px; 
  font-weight: bold;
  font-size: 72px;
  font-size: 3.75vw;
  line-height: 10vh;
  position: relative;
  text-shadow: 0px 50px 75px rgba(255, 255, 255);
`;

const HeroExplainerText = styled.div`
  font-family: 'Inter';
  position: relative;
  top: 60px;
  font-family: Inter;
  font-style: normal;
  font-weight: 200;
  font-size: 24px;
  line-height: 29px;
  color: ${props => props.theme.defaultTextColor};
`

const HeroButton = styled.div`
  top: 84px;
  position: relative;
`

const HeroGraphicContainer = styled.div`
  /* background-color: purple; */
  width: 35%;
  height: 100%;
  position: relative;
`;

const PillarContainer = styled.div`
  position: absolute;
  bottom: calc(-20%);
  left: 0px;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 90px 75px rgba(0, 0, 0, 0.075));
  /* background-color: aqua; */
`;

const PillarBase = styled.img`
  position: absolute;
  bottom: -10px;
  left: 0;
  height: calc(100% - 48px);
  max-width: 100%;
  /* background-color: #d0ff00; */
`;

const PillarTop = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 100%;
  height: calc(100% - 48px);
  //background-color: #ff0095;
`;

const PillarArrow = styled.img`
  position: absolute;
  bottom: 40px;
  left: 0;
  max-width: 100%;
  height: calc(100% - 48px);
  z-index: 1;
  filter: drop-shadow(0px 10px 24px rgba(30, 173, 27, 0.2)) drop-shadow(0px 50px 20px rgba(0, 0, 0, 0.15));
  /* background-color: #ff0095; */
`;


const Explainer = styled.div`
  background: ${props => props.theme.explainerBg};
  width: 100%;
  height: 750px;
  z-index: 1;
  position: relative;
`;


const Home = () => {

  const router = useRouter();

  const handleCTAClick = (e: any) => {
    e.preventDefault()
    router.push('onboarding');
  };
      
  return (
    <>
      <Head>
        <title>Marble Finance</title>
        <meta name="description" content="SimpleYields helps you get yields as easily as possible." />
        <link rel="icon" href={favicon.src}/>
      </Head>
      <Hero>
        <HeaderContainer>
          <Wordmark>
            Marble Finance
          </Wordmark>
        </HeaderContainer>
        <HeroInner >
          <HeroTextContainer>
            <HeroText>Grow your money.</HeroText>
            <HeroExplainerText>Beat inflation by depositing your cryptocurrency. Earn up to 20% APY.</HeroExplainerText>
            <HeroButton>
              <CTAButton onClick={handleCTAClick} />
            </HeroButton>
          </HeroTextContainer>
          <HeroGraphicContainer>
            <PillarContainer>
              <PillarArrow src={pillar_arrow.src}/>
              <PillarTop src={pillar_top.src}/>
              <PillarBase src={pillar_base.src} />
            </PillarContainer>
          </HeroGraphicContainer>
        </HeroInner>
      </Hero>
      <Explainer>

      </Explainer>
    </>
  );
};

export default Home;
