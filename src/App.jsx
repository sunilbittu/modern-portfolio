import { useEffect, useId, useState } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import profileImage from './assets/profile-image.png'
import projectNewRelic from './assets/project-newrelic.avif'
import './App.css'

const navItems = [
  ['work', 'Selected work'],
  ['case-files', 'Case files'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
]

const projects = [
  {
    number: '01',
    title: 'Dispatch to doorstep',
    client: 'Shyft',
    period: '2020 - 2021',
    visual: 'shyft',
    summary:
      'A point-to-point logistics system built in a startup environment, connecting the people booking deliveries with the drivers completing them.',
    details: ['Major startup contribution', 'React Native', 'End-to-end delivery'],
    href: '#shyft-case',
  },
  {
    number: '02',
    title: 'Hotels, managed at scale',
    client: 'Cleartrip + Flyin',
    period: '2014 - 2021',
    visual: 'hotel',
    summary:
      'A complete hotel CMS and supporting APIs for storing, managing and serving hotel information into customer-facing travel products.',
    details: ['Complete CMS ownership', 'Hotel data APIs', 'Travel platforms'],
    href: '#hotel-cms-case',
  },
  {
    number: '03',
    title: 'APM, made legible',
    client: 'New Relic',
    period: '2022 - now',
    image: projectNewRelic,
    alt: 'New Relic application performance monitoring interface',
    summary:
      'Reusable React systems for a dense observability product, shaped around faster diagnosis and consistent interaction at enterprise scale.',
    details: ['React + TypeScript', 'Redux architecture', 'Performance systems'],
  },
]

const caseStudies = [
  {
    id: 'shyft-case',
    index: 'CASE 01 / LOGISTICS',
    title: 'Shyft connected both sides of a delivery.',
    lead:
      'At an early-stage startup, I was a major contributor to a point-to-point logistics system spanning the shipper and driver experience.',
    visual: 'shyft',
    facts: [
      ['Product', 'Point-to-point delivery system'],
      ['Surfaces', 'Shyft Shipper + Shyft Driver'],
      ['Environment', 'Early-stage startup'],
      ['Contribution', 'Major, end-to-end'],
    ],
    sections: [
      {
        title: 'The product problem',
        body:
          'A delivery is one transaction experienced by two different people. The shipper needs a clear way to initiate and understand the job. The driver needs a focused product for carrying it through. Those surfaces must stay coherent as one operational system.',
      },
      {
        title: 'My contribution',
        body:
          'I contributed across the end-to-end development of both mobile products, working beyond an isolated feature area. In a startup setting, that meant helping turn the operating model into software and carrying implementation through to usable product flows.',
      },
      {
        title: 'What this demonstrates',
        body:
          'Product ownership under ambiguity, React Native delivery, coordination across connected user journeys, and the ability to move between interface detail and the wider system.',
      },
    ],
    flow: ['Delivery request', 'Shipper experience', 'Shared operation', 'Driver execution'],
  },
  {
    id: 'hotel-cms-case',
    index: 'CASE 02 / TRAVEL',
    title: 'The hotel experience started behind the scenes.',
    lead:
      'For Cleartrip and Flyin, I built the complete hotel content management system and the supporting services used to manage hotel information.',
    visual: 'hotel',
    facts: [
      ['Product', 'Hotel content management system'],
      ['Companies', 'Cleartrip + Flyin'],
      ['Connected work', 'Mobile hotel experiences'],
      ['Contribution', 'Complete system build'],
    ],
    sections: [
      {
        title: 'The product problem',
        body:
          'Customer-facing hotel journeys are only as dependable as the operational data behind them. Hotel information needed a dedicated system where teams could store and manage it consistently before it reached booking experiences.',
      },
      {
        title: 'My contribution',
        body:
          'I built the complete hotel CMS and developed backend APIs for storing and managing hotel information. I also worked on hotel modules for the Cleartrip and Flyin mobile products, connecting operational tooling with the customer experience it supported.',
      },
      {
        title: 'What this demonstrates',
        body:
          'Full-stack ownership, data-backed product thinking, long-lived travel-domain experience, and the ability to build internal operational software as carefully as customer-facing applications.',
      },
    ],
    flow: ['Hotel information', 'CMS operations', 'Backend APIs', 'Mobile booking experience'],
  },
]

const roles = [
  {
    years: '2022 - now',
    company: 'New Relic',
    role: 'Senior Software Engineer',
    note: 'Building reusable APM experiences and improving performance across a complex observability platform.',
  },
  {
    years: '2021 - 2023',
    company: 'Accenture',
    role: 'Application Development Team Lead',
    note: 'Led front-end architecture and component strategy for enterprise client products.',
  },
  {
    years: '2020 - 2021',
    company: 'Shyft Innovations',
    role: 'Software Engineer',
    note: 'Major contributor to a point-to-point delivery system, building Shyft Shipper and Shyft Driver end to end.',
  },
  {
    years: '2014 - 2021',
    company: 'Cleartrip + Flyin',
    role: 'Software Engineer',
    note: 'Built a complete hotel CMS, supporting APIs and mobile hotel experiences across two travel platforms.',
  },
]

const strengths = [
  ['Product engineering', 'Translate complicated product requirements into interfaces people can understand quickly.'],
  ['Front-end systems', 'Build durable React and React Native foundations that teams can extend with confidence.'],
  ['Performance', 'Treat speed, rendering behavior and interaction quality as core product features.'],
  ['Technical leadership', 'Create alignment through clear architecture, pragmatic decisions and hands-on delivery.'],
]

function Arrow({ direction = 'out' }) {
  return (
    <svg aria-hidden="true" className="arrow" viewBox="0 0 20 20">
      {direction === 'down' ? (
        <path d="M10 3v12m0 0 5-5m-5 5-5-5" />
      ) : (
        <path d="M5 15 15 5m0 0H7m8 0v8" />
      )}
    </svg>
  )
}

function Mark() {
  return (
    <svg aria-hidden="true" className="mark" viewBox="0 0 38 38">
      <path d="M5 6h19l9 9v17H14l-9-9z" />
      <path d="m12 23 6-12 7 12M14.5 19h8" />
    </svg>
  )
}

function SystemDiagram({ type, compact = false }) {
  const titleId = useId()

  if (type === 'hotel') {
    return (
      <svg
        className={`system-diagram hotel-diagram ${compact ? 'is-compact' : ''}`}
        viewBox="0 0 1200 760"
        role="img"
        aria-labelledby={titleId}
      >
        <title id={titleId}>Hotel CMS system scope diagram</title>
        <rect className="diagram-surface" x="28" y="28" width="1144" height="704" rx="0" />
        <text className="diagram-label" x="66" y="82">HOTEL INFORMATION SYSTEM / OPERATIONAL VIEW</text>
        <text className="diagram-ref" x="1090" y="82">02</text>

        <path className="diagram-route" d="M250 184H600V570H950" />
        <circle className="diagram-node" cx="250" cy="184" r="10" />
        <circle className="diagram-node" cx="600" cy="378" r="10" />
        <circle className="diagram-node" cx="950" cy="570" r="10" />

        <g transform="translate(68 132)">
          <text className="diagram-kicker" x="0" y="0">OPERATIONS</text>
          <text className="diagram-title" x="0" y="45">HOTEL CMS</text>
          <rect className="diagram-block" x="0" y="76" width="365" height="278" />
          <text className="diagram-key" x="28" y="122">HOTEL IDENTITY</text>
          <text className="diagram-value" x="225" y="122">STRUCTURED</text>
          <path className="diagram-rule" d="M28 146H337" />
          <text className="diagram-key" x="28" y="183">LOCATION</text>
          <text className="diagram-value" x="225" y="183">MANAGED</text>
          <path className="diagram-rule" d="M28 207H337" />
          <text className="diagram-key" x="28" y="244">CONTENT</text>
          <text className="diagram-value" x="225" y="244">VALIDATED</text>
          <path className="diagram-rule" d="M28 268H337" />
          <text className="diagram-key" x="28" y="305">MEDIA + DETAILS</text>
          <text className="diagram-value" x="225" y="305">PUBLISHED</text>
        </g>

        <g transform="translate(504 315)">
          <text className="diagram-kicker" x="0" y="0">SERVICE LAYER</text>
          <text className="diagram-title" x="0" y="45">HOTEL APIs</text>
          <rect className="diagram-data" x="0" y="78" width="196" height="44" />
          <rect className="diagram-data" x="0" y="134" width="242" height="44" />
          <rect className="diagram-data" x="0" y="190" width="164" height="44" />
        </g>

        <g transform="translate(840 506)">
          <text className="diagram-kicker" x="0" y="0">CUSTOMER PRODUCTS</text>
          <text className="diagram-title" x="0" y="45">CLEARTRIP</text>
          <text className="diagram-title diagram-title-secondary" x="0" y="90">FLYIN</text>
          <text className="diagram-note" x="0" y="140">MOBILE HOTEL EXPERIENCES</text>
        </g>
      </svg>
    )
  }

  return (
    <svg
      className={`system-diagram shyft-diagram ${compact ? 'is-compact' : ''}`}
      viewBox="0 0 1200 760"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>Shyft point-to-point delivery system scope diagram</title>
      <rect className="diagram-surface" x="28" y="28" width="1144" height="704" rx="0" />
      <text className="diagram-label" x="66" y="82">SHYFT / POINT-TO-POINT DELIVERY SYSTEM</text>
      <text className="diagram-ref" x="1090" y="82">01</text>

      <path className="diagram-route diagram-route-main" d="M142 526C252 526 270 216 432 216S600 546 762 546 936 224 1063 224" />
      <path className="diagram-route diagram-route-ghost" d="M142 570C294 570 310 304 452 304S610 626 790 626 902 312 1063 312" />

      <g transform="translate(106 470)">
        <circle className="diagram-node-large" cx="36" cy="56" r="36" />
        <circle className="diagram-node-core" cx="36" cy="56" r="9" />
        <text className="diagram-kicker" x="0" y="124">POINT A</text>
        <text className="diagram-title" x="0" y="167">REQUEST</text>
      </g>

      <g transform="translate(356 132)">
        <text className="diagram-kicker" x="0" y="0">PRODUCT 01</text>
        <text className="diagram-title" x="0" y="47">SHIPPER</text>
        <rect className="diagram-block" x="0" y="82" width="240" height="166" />
        <path className="diagram-rule" d="M26 124H214M26 160H180M26 196H202" />
        <text className="diagram-note" x="26" y="230">DELIVERY-SIDE FLOW</text>
      </g>

      <g transform="translate(617 442)">
        <text className="diagram-kicker" x="0" y="0">SHARED OPERATION</text>
        <text className="diagram-title" x="0" y="47">DELIVERY CORE</text>
        <rect className="diagram-data" x="0" y="80" width="170" height="42" />
        <rect className="diagram-data" x="182" y="80" width="108" height="42" />
      </g>

      <g transform="translate(842 138)">
        <text className="diagram-kicker" x="0" y="0">PRODUCT 02</text>
        <text className="diagram-title" x="0" y="47">DRIVER</text>
        <rect className="diagram-block" x="0" y="82" width="218" height="166" />
        <path className="diagram-rule" d="M26 124H192M26 160H152M26 196H178" />
        <text className="diagram-note" x="26" y="230">EXECUTION-SIDE FLOW</text>
      </g>

      <g transform="translate(1027 168)">
        <circle className="diagram-node-large" cx="36" cy="56" r="36" />
        <circle className="diagram-node-core" cx="36" cy="56" r="9" />
        <text className="diagram-kicker" x="-4" y="124">POINT B</text>
      </g>
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 28 })

  useEffect(() => {
    const closeOnWide = () => {
      if (window.innerWidth >= 820) setMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('resize', closeOnWide)
    window.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      window.removeEventListener('resize', closeOnWide)
      window.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    setMenuOpen(false)
  }

  const selected = projects[activeProject]

  const handleProjectKeyDown = (event, index) => {
    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % projects.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + projects.length) % projects.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = projects.length - 1
    if (nextIndex !== index) {
      event.preventDefault()
      setActiveProject(nextIndex)
      document.getElementById(`project-tab-${nextIndex}`)?.focus()
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <button className="brand" onClick={() => goTo('top')} aria-label="Go to top">
          <Mark />
          <span>
            Sunil
            <small>software engineer</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
        </nav>

        <a className="availability" href="mailto:pavanksunil@gmail.com">
          Start a conversation <Arrow />
        </a>

        <button
          className="menu-trigger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`menu-glyph ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" />
        </button>

        <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map(([id, label], index) => (
            <button key={id} onClick={() => goTo(id)}>
              <span>0{index + 1}</span>
              {label}
            </button>
          ))}
          <a href="mailto:pavanksunil@gmail.com">pavanksunil@gmail.com</a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="hero-intro">
              Senior software engineer in Hyderabad. I build complete product systems, from startup logistics and hotel operations to enterprise observability.
            </p>
            <h1>
              I make complex
              <span>software feel clear.</span>
            </h1>
          </div>

          <div className="hero-record" aria-label="Professional summary">
            <div className="portrait-wrap">
              <img src={profileImage} alt="Sunil Bhuvanapalli" />
              <span className="portrait-cut" aria-hidden="true" />
            </div>
            <dl>
              <div>
                <dt>Current</dt>
                <dd>New Relic</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>10+ years</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Product systems, web + mobile</dd>
              </div>
            </dl>
          </div>

          <button className="hero-scroll" onClick={() => goTo('work')}>
            See selected work <Arrow direction="down" />
          </button>

          <Motion.div
            className="hero-artifact"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="artifact-index">FIELD NOTE / SHYFT</span>
            <SystemDiagram type="shyft" compact />
            <p>A point-to-point delivery system built across both sides of the journey.</p>
          </Motion.div>
        </section>

        <section className="proof-strip" aria-label="Career highlights">
          <p><span>Built</span> point-to-point logistics at startup speed</p>
          <p><span>Owned</span> a complete hotel CMS and supporting APIs</p>
          <p><span>Now</span> shaping enterprise APM experiences at New Relic</p>
        </section>

        <section className="work" id="work">
          <div className="section-lead">
            <h2>Selected work</h2>
            <p>Three operating environments: an early startup, global travel products and enterprise observability. The common thread is complete product thinking.</p>
          </div>

          <div className="project-selector" role="tablist" aria-label="Selected projects">
            {projects.map((project, index) => (
              <button
                key={project.number}
                role="tab"
                aria-selected={activeProject === index}
                aria-controls="project-panel"
                id={`project-tab-${index}`}
                tabIndex={activeProject === index ? 0 : -1}
                onClick={() => setActiveProject(index)}
                onKeyDown={(event) => handleProjectKeyDown(event, index)}
              >
                <span>{project.number}</span>
                {project.client}
              </button>
            ))}
          </div>

          <div
            className="project-stage"
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${activeProject}`}
          >
            <div className="project-image">
              {selected.visual ? (
                <SystemDiagram type={selected.visual} />
              ) : (
                <img src={selected.image} alt={selected.alt} />
              )}
              <span>{selected.period}</span>
            </div>
            <article key={selected.number}>
              <div className="project-heading">
                <h3>{selected.title}</h3>
                <p>{selected.client}</p>
              </div>
              <div className="project-summary">
                <p>{selected.summary}</p>
                <ul>
                  {selected.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                {selected.href && (
                  <a className="project-case-link" href={selected.href}>
                    Read the case file <Arrow direction="down" />
                  </a>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="case-files" id="case-files">
          <div className="case-files-intro">
            <p>Selected case files</p>
            <h2>Proof of ownership, not a gallery of screens.</h2>
          </div>

          {caseStudies.map((study) => (
            <article className="case-file" id={study.id} key={study.id}>
              <header>
                <p>{study.index}</p>
                <h3>{study.title}</h3>
                <p className="case-lead">{study.lead}</p>
              </header>

              <div className="case-visual">
                <SystemDiagram type={study.visual} />
                <dl>
                  {study.facts.map(([term, value]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="case-narrative">
                {study.sections.map((section, index) => (
                  <section key={section.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h4>{section.title}</h4>
                    <p>{section.body}</p>
                  </section>
                ))}
              </div>

              <div className="system-flow" aria-label={`${study.title} system scope`}>
                {study.flow.map((step, index) => (
                  <div key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                    {index < study.flow.length - 1 && <b aria-hidden="true">→</b>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="experience" id="experience">
          <div className="experience-title">
            <h2>A decade of shipping, learning and leading.</h2>
            <p>2014 - today</p>
          </div>
          <div className="roles">
            {roles.map((item) => (
              <article key={`${item.company}-${item.years}`}>
                <p className="role-years">{item.years}</p>
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                </div>
                <p className="role-note">{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="practice" id="practice">
          <div className="practice-statement">
            <span>How I work</span>
            <p>Good engineering is a design practice. It makes the next decision easier for the user and the next change safer for the team.</p>
          </div>
          <div className="strength-list">
            {strengths.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="tool-line">
            <p>Working set</p>
            <div>React · React Native · TypeScript · Node.js · Redux · Next.js · Azure · MongoDB · MySQL · Elasticsearch</div>
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="contact-side">Hyderabad, India · IST</p>
          <div>
            <h2>Building something operationally complex?</h2>
            <a href="mailto:pavanksunil@gmail.com">
              Start a conversation <Arrow />
            </a>
          </div>
          <div className="contact-links">
            <a href="https://github.com/sunilbhuvanapalli" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href="https://linkedin.com/in/sunilbhuvanapalli" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <p>Sunil Bhuvanapalli</p>
          <p>Senior Software Engineer</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
        <div className="footer-mark" aria-hidden="true">SUNIL</div>
      </footer>
    </div>
  )
}

export default App
