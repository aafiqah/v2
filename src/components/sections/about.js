import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  .inner {
    display: grid;
    grid-template-columns: 3fr 1.5fr;
    grid-gap: 50px;

    @media (max-width: 980px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  height: auto;
  display: flex;
  align-items: center;

  font-size: var(--fz-xxl);
  text-align: justify;

  @media (max-width: 980px) {
    font-size: var(--fz-lg);
  }

  @media (max-width: 768px) {
    font-size: var(--fz-xl);
  }

  @media (max-width: 425px) {
    font-size: var(--fz-md);
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 980px) {
    margin: 50px auto;
    width: 80%;
  }

  @media (max-width: 768px) {
    margin: 40px auto;
    width: 60%;
  }

  .wrapper {
    display: block;
    position: relative;
    border-radius: 50px;

    &:hover,
    &:focus {
      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: 50px;
      mix-blend-mode: multiply;
      transition: var(--transition);
    }
  }
`;

const StyledSkill = styled.div`
  text-align: center;

  h1 {
    text-align: center;
    margin: 60px 0 0;
    font-size: var(--fz-xxl);
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 2px;
  }

  .badge-item {
    margin: 0.5rem;
    display: flex;
    align-items: center;
    border: 1px solid var(--green);
    border-radius: 8px;
    padding: 10px;

    @media (max-width: 425px) {
      display: flex;
      align-items: center;
      border: 1px solid var(--green);
      border-radius: 8px;
      padding: 5px;
      justify-content: center;
    }

    .badge-image {
      width: 100%;
      height: auto;

      @media (max-width: 425px) {
        width: 85%;
        height: auto;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillsWithBadges = [
    {
      badge:
        'https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white',
    },
    {
      badge:
        'https://img.shields.io/badge/Android%20Studio-3DDC84?style=for-the-badge&logo=android&logoColor=white',
    },
    {
      badge:
        'https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white',
    },
    {
      badge:
        'https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white',
    },
    {
      badge:
        'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
    },
    {
      badge:
        'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
    },
    {
      badge:
        'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
    },
    {
      badge:
        'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white',
    },
    {
      badge: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
    },
    {
      badge:
        'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white',
    },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I'm Alessa, armed with a Bachelor’s in Computer Forensics, I made the exciting
              decision to dive into a career as a Mobile Developer. Throughout my university years,
              I embarked on several impactful projects, ranging from desktop to mobile applications.
              I thrive on learning new technologies and channeling my creativity to build incredible
              things.
            </p>
            <p>
              Beyond coding, I enjoy exploring new places, capturing moments through photography,
              and expressing my creativity through video editing.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>

      <StyledSkill>
        <h1>Here are a few technologies I've been working with recently</h1>
        <div className="container">
          {skillsWithBadges.map((skill, i) => (
            <div key={i} className="badge-item">
              <img src={skill.badge} alt={`${skill.name} badge`} className="badge-image" />
            </div>
          ))}
        </div>
      </StyledSkill>
    </StyledAboutSection>
  );
};

export default About;
