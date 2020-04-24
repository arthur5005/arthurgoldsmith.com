import Head from 'next/head'

export default function About() {
  const aboutMeStyle = {
    margin: "30px auto",
    width: "250px", 
    height: "250px",
    borderRadius: "200px",
    overflow: "hidden",
    border: "4px solid white"
  };

  const aboutMeImageStyle = { width:"100%" };
  const clearStyle = { clear: "both" };

  return (
    <div className="page-wrapper">
      <Head>
        <title>About Arthur Goldsmith</title>
        <meta property="og:title" content="About Arthur" key="title"></meta>

        <link rel="icon" type="image/png" href="https://arthurgoldsmith.com/skills-icon.png"></link>
        <link href="/css/arthurgoldsmith-legacy.css" rel="stylesheet" type="text/css"></link>
        <link href="/css/magnific-popup.css" rel="stylesheet" type="text/css"></link>
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" type="text/css"></link>

        <script src="/js/jquery-1.11.1.min.js" type="text/javascript"></script>
        <script src="/js/jquery.magnific-popup.min.js" type="text/javascript"></script>
        <script src="/js/jQuery.scrollTo.min.js" type="text/javascript"></script>
        <script src="/js/arthurgoldsmith.com.js" type="text/javascript"></script>
      </Head>
      <header>
        <div className="wrapper">
          <div className="arthur-goldsmith">
            <h1 className="arthur">Arthur</h1>
            <h1 className="goldsmith">Goldsmith</h1>
          </div>
          <div className="software-developer">
            <h1 className="software-developer">Software Developer</h1>
            <h1 className="with-expertise">Full Stack With (Way Too Much) Experience in UI Component Frameworks</h1>
          </div>
        </div>
      </header>
      <nav>
        <div className="wrapper">
          <ul id="nav-buttons">
            <li className="nav-button" id="about-button">
              <img src="about-icon.png"/>
              <div className="nav-button-text"><h3>About</h3></div>
            </li>
            <li className="nav-button" id="skills-button">
              <img src="skills-icon.png"/>
              <div className="nav-button-text"><h3>Background</h3></div>
            </li>
            <li className="nav-button" id="contact-button">
              <img src="mail-icon.png"/>
              <div className="nav-button-text"><h3>Contact</h3></div>
            </li>
            <div style={clearStyle}></div>
          </ul>
        </div>
      </nav>
      <div className="black">
          <div className="wrapper">
            <section id="about-section">
                <h2>About</h2>
                <div style={aboutMeStyle}><img src="lookatme.jpg" style={aboutMeImageStyle}/></div>
                <p>I am a software developer, with a bachelor CS and a minor economics. I'm a fullstack devleoper, with <em>a ton</em> of experience creating rich user experiences and in the development and use of component frameworks.</p>

                <p>I currently reside in Vancouver BC, Canada. I am fortunate to hold multiple citizenships which allow me to work in Canada, the United States and throughout Europe.</p>

                <p>I am an active member, and for a time, was Vice President of <a href="http://www.gvias.org/">Greater Vancouver Interactive Arts Society (GVIAS)</a>, a not-for-profit society created to promote community-based interactive arts in Greater Vancouver and British Columbia. GVIAS's mission is to encourage interactive and participatory experiences in the spirit of the <a href="https://burningman.org/culture/philosophical-center/10-principles/">10 principles of Burning Man</a>. I now assist in facilitating technology needs surrounding GVIAS and GVIAS's flagship festival event, host to 1600 participants.</p>
            </section>
          </div>
      </div>
      <div className="white">
        <div className="wrapper">
          <section id="skills-section">
            <h2>Background</h2>
        
            <section>
                <h3>I've built using: Angular, React, React-Native, Ember, Node-Express, Rails, CakePHP, Wordpress, Drupal and much more.</h3>

                <p>The breadth of my software development experience is in web based applications and component frameworks. My recent experience working on a monolithic application for the past 5 years has lead me to take an interest in the <em>CQRS</em> and <em>Event Sourcing</em> and will likely make use of the pattern as soon as a I find time and a good application for it; I'm always on the lookout for new ways to make better software.</p>

                <p>You can find a compressed timeline of my work experience on my <a href="https://www.linkedin.com/in/arthur-goldsmith-85243913/" target="_blank">LinkedIn</a></p>
            </section>
            <section>
              <h3>My First Component Framework</h3>
              
              <p>Back in 2009, before Angular, React, Ember, Vue, Svelte... there was ExtJS, SproutCore and, well, jQuery</p>
              
              <p>At one of my first serious posts as a developer we were tasked with creating an embedded web applicaiton to configure high-end imaging sensors for system integrators in factories. We started with HTML and a bit of jQuery but quickly realized we needed something more robust.</p>
              
              <p>We ended up writing our own component framework, somewhat inspired by ExtJS, and compiled using the Google Closure Compiler for file depenency and minification. I'm proud of the work we did, and it taught me invaluable lessons and patterns. It also gave me the opportunity to write my own layout engine, rendering framework, observable class and an early Promise/A+ spec'd promise library (oh the memories).</p>
                      
              <p>An old version of the kitchen sink (from 2013) using the framework we built works to this day! Try it out below!</p>

              <div className="centered"><a className="iframe-link button" href="/goframework/test.html">Launch Demo</a></div>

              <p>Here are some screenshots of the application we built using the our component framework.</p>

              <div className="centered">
                <a className="image-link" href="/login-screen.png">
                  <img src="/login-screen-thumb.png" className="thumb" width="150"/>
                </a>
                <a className="image-link" href="/manage-screen.png">
                  <img src="/manage-screen-thumb.png" className="thumb" width="150"/>
                </a>
                <a className="image-link" href="/scan-screen.png">
                  <img src="/scan-screen-thumb.png" className="thumb" width="150"/>
                </a>
                <a className="image-link" href="/measure-screen.png">
                  <img src="/measure-screen-thumb.png" className="thumb" width="150"/>
                </a>
                <a className="image-link" href="/output-screen.png">
                  <img src="/output-screen-thumb.png" className="thumb" width="150"/>
                </a>
              </div>
            </section>
            <section>
              <h3>Other Thoughts</h3>
              <p>I think I've tried almost every MVC under the sun, and I think I have a reason to hate them all. Postgres &gt; MySQL. Still wondering if there's ever going to be a "killer app" in the blockchain space.  I think <a href="https://ipfs.io/" target="_blank">IPFS</a> is really really cool. Oh, and I actually really liked <a href="https://en.wikipedia.org/wiki/Apache_Wave" target="_blank">Google Wave</a>.</p>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}