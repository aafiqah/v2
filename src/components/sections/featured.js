import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { Modal } from '@components';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
    background-color: var(--lightpurple);
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;
    z-index: 5;
    justify-content: flex-start;
  }

  &:not(:last-of-type) {
    margin-bottom: 70px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        text-align: left;
      }
    }

    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }

    .project-image {
      grid-column: 1 / 8;
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 10px 25px;
      z-index: 5;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 10vw, 38px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--lightpurple);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
    .full-project-view-link {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--darkpurple);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
    }
  }
`;

const StyledModalContainer = styled.main`
  max-width: 1000px;
  padding: 20px;
`;

const StyledModalHeader = styled.header`
  margin-bottom: 1em;

  h1 {
    font-family: var(--font-mono);

    @media (max-width: 768px) {
      font-size: var(--fz-lg);
    }

    @media (max-width: 425px) {
      font-size: var(--fz-sm);
    }
  }

  .modal-subtitle {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 5px;
    margin: 0 20px 5px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: var(--fz-xs);
    }

    @media (max-width: 425px) {
      font-size: var(--fz-xxs);
    }
  }

  .modal-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;

    img {
      border-radius: var(--border-radius);
      max-width: 100%;
      max-height: 100%;
    }

    @media (max-width: 768px) {
      margin: 15px 0 0;
    }
  }

  .modal-tech-title {
    margin: 0 20px 5px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    white-space: nowrap;
    justify-content: center;

    @media (max-width: 768px) {
      margin: 0 10px 5px 0;
      font-size: var(--fz-sm);
    }

    @media (max-width: 425px) {
      font-size: var(--fz-xs);
    }
  }

  .modal-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    justify-content: center;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--green);
        font-size: var(--fz-sm);
      }
    }

    @media (max-width: 425px) {
      margin: 5px 0;

      li {
        margin: 0 5px 0 0;
        color: var(--green);
        font-size: var(--fz-xs);
      }
    }
  }
`;

const StyledModalContent = styled.div`
  margin-bottom: 50px;
  text-align: justify;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
    text-align: center;
    font-family: var(--font-mono);

    @media (max-width: 768px) {
      font-size: var(--fz-xxl);
    }
  }

  p {
    margin-bottom: 1em;
    line-height: 1.5;
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      font-size: var(--fz-md);
    }

    @media (max-width: 425) {
      font-size: var(--fz-sm);
    }
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  img {
    margin-bottom: 1em;
  }

  iframe {
    width: 100%;
    height: 400px;
  }

  @media (max-width: 768px) {
    iframe {
      width: 100%;
      height: 300px;
    }
  }
`;

const StyledModalFooter = styled.footer`
  .modal-tech-title {
    margin: 2em 0 1em;
    text-align: center;
    font-family: var(--font-mono);

    @media (max-width: 768px) {
      font-size: var(--fz-xxl);
    }
  }

  .modal-links {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px;
    color: var(--lightest-slate);
    justify-content: center;
    font-family: var(--font-mono);

    @media (max-width: 768px) {
      justify-content: center;
      margin: 10px;
    }

    a {
      padding: 25px;

      &.external {
        svg {
          width: 32px;
          height: 32px;
          margin: -4px;
        }
      }
      svg {
        width: 32px;
        height: 32px;
      }
    }

    span {
      margin-top: 5px;
      margin-left: 5px;
      font-size: var(--fz-xs);
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              fulltitle
              date
              title
              slug
              category
              cover {
                childImageSharp {
                  gatsbyImageData(width: 1080, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
              tech
              github
              external
              figma
              apk
              exe
              youtube
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Function to open the modal
  const openModal = projectData => {
    setModalData(projectData);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength - 3)}...`; // Append '...' if truncated
    }
    return text;
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const {
              external,
              date,
              fulltitle,
              title,
              tech,
              category,
              github,
              cover,
              android,
              figma,
              apk,
              exe,
              youtube,
            } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-image">
                  <a href={external}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>

                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external}>{fulltitle}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: truncateDescription(html, 200) }} // Adjust the maxLength as needed
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      <button
                        className="full-project-view-link"
                        onClick={() =>
                          openModal({
                            frontmatter,
                            date,
                            fulltitle,
                            title,
                            category,
                            cover,
                            tech,
                            github,
                            apk,
                            youtube,
                            figma,
                            html,
                          })
                        }>
                        More Details
                      </button>

                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                      {android && (
                        <a href={android} aria-label="Google Play Store Link" className="android">
                          <Icon name="PlayStore" />
                        </a>
                      )}
                      {figma && (
                        <a href={figma} aria-label="Figma Link" className="figma">
                          <Icon name="Figma" />
                        </a>
                      )}
                      {apk && (
                        <a href={apk} aria-label="Apk Link" className="apk">
                          <Icon name="Apk" />
                        </a>
                      )}
                      {exe && (
                        <a href={exe} aria-label="Exe Link" className="exe">
                          <Icon name="Exe" />
                        </a>
                      )}
                      {youtube && (
                        <a href={youtube} aria-label="Youtube Link" className="youtube">
                          <Icon name="Youtube" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>

      {isModalOpen && modalData && modalData.frontmatter && (
        <Modal onClose={closeModal}>
          <StyledModalContainer>
            <StyledModalHeader>
              <h1>{modalData.fulltitle}</h1>

              <p className="modal-subtitle">
                <time>
                  {new Date(modalData.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>&nbsp;&mdash;&nbsp;</span>
                {modalData.category}
              </p>

              <div className="modal-image">
                <a
                  href={getImage(modalData.cover).images.fallback.src}
                  target="_blank"
                  rel="noopener noreferrer">
                  <GatsbyImage image={getImage(modalData.cover)} alt={modalData.title} />
                </a>
              </div>

              <ul className="modal-tech-list">
                <p className="modal-tech-title">Technologies:</p>
                {modalData.tech.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </StyledModalHeader>

            <StyledModalContent dangerouslySetInnerHTML={{ __html: modalData.html }} />

            <StyledModalFooter>
              <h1 className="modal-tech-title">Project Links</h1>

              <div className="modal-links">
                {modalData.frontmatter.github && (
                  <a href={modalData.frontmatter.github} aria-label="GitHub Link">
                    <Icon name="GitHub" />
                    <span>GitHub</span>
                  </a>
                )}
                {modalData.frontmatter.figma && (
                  <a href={modalData.frontmatter.figma} aria-label="figma">
                    <Icon name="Figma" />
                    <span>Figma</span>
                  </a>
                )}
                {modalData.frontmatter.apk && (
                  <a href={modalData.frontmatter.apk} aria-label="apk">
                    <Icon name="Apk" />
                    <span>Apk File</span>
                  </a>
                )}
                {modalData.frontmatter.exe && (
                  <a href={modalData.frontmatter.exe} aria-label="exe">
                    <Icon name="Exe" />
                    <span>Exe File</span>
                  </a>
                )}
              </div>
            </StyledModalFooter>
          </StyledModalContainer>
        </Modal>
      )}
    </section>
  );
};

export default Featured;
