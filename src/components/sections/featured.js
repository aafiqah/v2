import React, { useEffect, useRef, useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';
import { Modal } from '@components';

const StyledFeaturedSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  .project-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  margin-top: 50px;

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
  grid-template-rows: repeat(6, 1fr);
  align-items: center;

  @media (max-width: 425px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }

  &:not(:last-of-type) {
    margin-bottom: 70px;

    @media (max-width: 768px) {
      margin-bottom: 30px;
    }

    @media (max-width: 425px) {
      margin-bottom: 20px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 8 / -1;
      text-align: right;

      @media (max-width: 768px) {
        text-align: left;
        grid-row: 5 / -1;
        grid-column: 1 / -1;
        padding: 10px 20px;
      }

      @media (max-width: 425px) {
        text-align: left;
        grid-row: 3 / -1;
        grid-column: 1 / -1;
        padding: 10px 20px;
      }
    }

    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        display: none;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: 0;
        margin-right: 0;
      }
    }

    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 6;
    grid-row: 1 / -1;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
      z-index: 5;

      grid-row: 5 / -1;
      grid-column: 1 / -1;
      padding: 10px 20px;
    }

    @media (max-width: 425px) {
      text-align: left;
      grid-row: 3 / -1;
      grid-column: 1 / -1;
      padding: 10px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;

    @media (max-width: 980px) {
      font-size: var(--fz-xxs);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: var(--fz-heading);

    @media (max-width: 980px) {
      font-size: 26px;
    }

    @media (max-width: 768px) {
      color: var(--white);
      font-size: 26px;
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

    @media (max-width: 980px) {
      font-size: var(--fz-md);
      padding: 15px;
    }

    @media (max-width: 768px) {
      display: none;
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
    margin: 15px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;

      @media (max-width: 980px) {
        font-size: var(--fz-xxs);
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
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

      @media (max-width: 768px) {
        display: none;
      }
    }

    .full-project-view-link {
      ${({ theme }) => theme.mixins.smallButton};

      @media (max-width: 768px) {
        padding: 0.5rem 0.75rem;
        font-size: var(--fz-xxs);
      }
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      max-height: auto;
      opacity: 0.7; // Initial opacity set to 50%
    }

    a {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      vertical-align: middle;

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
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const StyledModalContainer = styled.main`
  padding: 20px;
`;

const StyledModalHeader = styled.header`
  margin-bottom: 1em;

  h1 {
    font-family: var(--font-mono);

    @media (max-width: 768px) {
      font-size: var(--fz-xl);
    }

    @media (max-width: 425px) {
      font-size: var(--fz-lg);
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

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  img {
    margin-bottom: 1em;
  }

  iframe {
    width: 100%;
    height: 450px;
  }

  @media (max-width: 768px) {
    iframe {
      width: 100%;
      height: 300px;
    }
  }

  p {
    line-height: 1.5;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    margin: 5px 0;

    @media (max-width: 768px) {
      font-size: var(--fz-lg);
    }

    @media (max-width: 425) {
      font-size: var(--fz-md);
    }
  }

  ul {
    margin: 5px 0;
  }

  li {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    text-align: justify;

    @media (max-width: 768px) {
      font-size: var(--fz-lg);
    }

    @media (max-width: 425) {
      font-size: var(--fz-md);
    }
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

  div.modal-content-container {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-gap: 25px;

    @media (max-width: 768px) {
      display: block;
    }

    .modal-content-text {
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-width: 980px) {
        font-size: var(--fz-lg);
      }

      @media (max-width: 768px) {
        font-size: var(--fz-xl);
      }

      @media (max-width: 425px) {
        font-size: var(--fz-md);
      }
    }

    .modal-content-img {
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-width: 980px) {
        margin: 50px auto;
        width: 80%;
      }

      @media (max-width: 768px) {
        margin: 40px auto;
        width: 100%;
      }
    }
  }

  div.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 2px;
  }

  div.badge-item {
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
      margin-bottom: 0px;

      @media (max-width: 425px) {
        width: 85%;
        height: auto;
      }
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
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              fulltitle
              date
              title
              slug
              category
              company
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

  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const revealProjectLink = useRef(null);
  const [showMore, setShowMore] = useState(false);

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
    sr.reveal(revealProjectLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 4;
  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const firstSix = featuredProjects.slice(0, GRID_LIMIT);
  const featuredToShow = showMore ? featuredProjects : firstSix;

  return (
    <StyledFeaturedSection id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <Link className="inline-link project-link" to="/list-projects" ref={revealProjectLink}>
        ✨ A collection of projects ✨
      </Link>

      <StyledProjectsGrid>
        {featuredToShow &&
          featuredToShow.map(({ node }, i) => {
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
                <div className="project-content">
                  <div>
                    <p className="project-overline">{category}</p>

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
                        Read More
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

                <div className="project-image">
                  <a href={external}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>

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
    </StyledFeaturedSection>
  );
};

export default Featured;
