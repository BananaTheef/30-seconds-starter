import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import MenuTagList from './MenuTagList';
import Search from "./Search";

const Shell = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      file(relativePath: {eq: "30s-icon.png"}) {
        id
        childImageSharp {
          original {
            src
          }
        }
      }
      snippetDataJson(meta: {type: {eq: "snippetListingArray"}}) {
        data {
          title
          id
          attributes {
            tags
          }
        }
      }
    }
  `);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const tags = data.snippetDataJson.data.reduce((acc, snippet) => {
    if (!snippet.attributes || !snippet.attributes.tags)
      return acc;
    const primaryTag = snippet.attributes.tags[0];
    if (!acc.includes(primaryTag))
      acc.push(primaryTag);
    return acc;
  }, []);

  return (
    <>
      <a href="https://github.com/30-seconds" className="github-corner" aria-label="View source on Github">
        <svg width="56" height="56" viewBox="0 0 250 250" style={{ fill: '#009688', color: '#fff', position: 'fixed', top: '0', border: '0', right: '0', zIndex: '1000' }} aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px'}} className="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
        </svg>
      </a>
      <button className={menuOpen ? "menu-button toggled" : "menu-button"} onClick={() => setMenuOpen(!menuOpen)}></button>
      <header>
        <h1 className="logo">
          <Link to="/">
            <img src={data.file.childImageSharp.original.src} alt="logo" />
            <span id="title">&nbsp;{data.site.siteMetadata.title}</span>
            <small>{data.site.siteMetadata.description}</small>
          </Link>
        </h1>
      </header>
      <div className="container card-container">
        <Search menuOpen={menuOpen} setSearchQuery={setSearchQuery}/>
        <nav className={menuOpen ? "col-nav" : ""}>
          {
            tags.map(tag => ((
              <MenuTagList tagName={tag} snippets={data.snippetDataJson.data} searchQuery={searchQuery} />
            )))
          }
        </nav>
        <main className="col-centered">
          <span id="top"><br /><br /></span>
          {children}
        </main>
        <footer className="col-full-width container">
          <div className="col-centered">
            <p style={{display: 'inline-block'}}>
              <strong>30 seconds starter</strong> is licensed under the <a href="https://github.com/30-seconds/30-seconds-starter/blob/master/LICENSE">CC0-1.0</a> license.<br />Logos made by <a href="https://github.com/Chalarangelo">Angelos Chalaris</a> and ribbon made by <a href="https://github.com/tholman/github-corners">Tim Holman</a> are licensed under the <a href="https://opensource.org/licenses/MIT">MIT</a> license.
            </p>
            <br />
            <p style={{display: 'inline-block'}}>
              <a href="./about">About</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="./contributing">Contributing</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="./archive">Archive</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="./glossary">Glossary</a>
            </p>
        </div>
      </footer>
      {/* eslint-disable-next-line */}
      <a className="scroll-to-top" href="#top" aria-label="Scroll to top"></a>
      </div>
    </>
  );
};

export default Shell;
