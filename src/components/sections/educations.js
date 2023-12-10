import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledEducationsSection = styled.section`
  max-width: 700px;
  position: relative;

  .inner {
    display: flex;
    align-items: flex-start;
    position: relative;

    @media (max-width: 600px) {
      display: block;  
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  display: block;
  position: relative;
  z-index: 3;
  width: max-content;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: scroll;
    margin-bottom: 30px;
    width: calc(100%);
  }
  @media (max-width: 480px) {
    width: calc(100%);
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
      }
      @media (max-width: 480px) {
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
      }
      @media (max-width: 480px) {
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightestpurple);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--light-slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 300px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightestpurple);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--lightpurple);
  }
`;

const StyledHighlight = styled.div`
  diplay: block;
  position: absolute;
  top: 0;
  width: 2px;
  z-index: 10;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    diplay: flex;
    top: auto;
    bottom: 0;
    min-width: 300px;
    height: 3px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * 300px));
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 12px;
  padding-left: 30px;

  @media (max-width: 768px) {
    padding-left: 20px;
  }

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
    text-align: justify;
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .university {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Educations = () => {
  const data = useStaticQuery(graphql`
    query {
      educations: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/educations/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              university
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const educationsData = data.educations.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    <StyledEducationsSection id="educations" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Studied</h2>

      <div className="inner">
        <StyledTabList role="tablist" aria-label="Educations tabs" onKeyDown={e => onKeyDown(e)}>
          {educationsData &&
            educationsData.map(({ node }, i) => {
              const { university } = node.frontmatter;
              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}>
                  <span>{university}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledTabPanels>
          {educationsData &&
            educationsData.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { title, url, university, range } = frontmatter;

              return (
                <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}>
                    <h3>
                      <span>{title}</span>
                      <span className="university">
                        &nbsp;@&nbsp;
                        <a href={url} className="inline-link">
                          {university}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                  </StyledTabPanel>
                </CSSTransition>
              );
            })}
        </StyledTabPanels>
      </div>
    </StyledEducationsSection>
  );
};

export default Educations;
