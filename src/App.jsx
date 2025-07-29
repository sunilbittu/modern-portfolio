import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import ParticleBackground from './components/ParticleBackground.jsx'
import FloatingTechIcons from './components/FloatingTechIcons.jsx'
import TypewriterText from './components/TypewriterText.jsx'
import profileImage from './assets/profile-image.png'
import projectNewRelic from './assets/project-newrelic.png'
import projectMobile from './assets/project-mobile.png'
import projectDashboard from './assets/project-dashboard.png'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Smartphone, 
  Database, 
  Cloud,
  Award,
  MapPin,
  Phone,
  ChevronDown,
  Menu,
  X,
  MousePointer2,
  Eye,
  Star
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100])
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  // Mouse tracking for interactive effects
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  // Skills data
  const skills = [
    { name: 'React/React Native', level: 95, category: 'Frontend' },
    { name: 'JavaScript/TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'HTML5/CSS3', level: 90, category: 'Frontend' },
    { name: 'MongoDB', level: 80, category: 'Database' },
    { name: 'MySQL', level: 75, category: 'Database' },
    { name: 'Angular', level: 70, category: 'Frontend' },
    { name: 'NextJS', level: 85, category: 'Framework' },
    { name: 'ElasticSearch', level: 70, category: 'Search' },
    { name: 'Azure', level: 75, category: 'Cloud' }
  ]

  // Experience data
  const experiences = [
    {
      company: 'New Relic',
      position: 'Senior Software Engineer',
      duration: 'April 2022 - Present',
      location: 'Hyderabad',
      description: 'Involved in the development of reusable components for the Application Performance Management (APM) platform, significantly enhancing modularity and scalability. Played a key role in optimizing application performance and user experience, leveraging advanced techniques in React and state management using Redux.',
      technologies: ['React', 'Redux', 'TypeScript', 'APM', 'Performance Optimization']
    },
    {
      company: 'Accenture',
      position: 'Application Development Team Lead',
      duration: 'June 2021 - April 2023',
      location: 'Hyderabad',
      description: 'Worked as a FED UI developer for high-profile clients, playing a pivotal role in architecting and implementing scalable and reusable components, leading to enhanced application performance and user engagement. Championed the adoption of modern front-end frameworks and technologies.',
      technologies: ['React', 'Angular', 'JavaScript', 'UI/UX', 'Team Leadership']
    },
    {
      company: 'Shyft Innovations Pvt Ltd',
      position: 'Software Engineer',
      duration: 'February 2020 - May 2021',
      location: 'Remote',
      description: 'Contributed to the development of "Shyft Shipper" and "Shyft Driver" Mobile apps. Involved in end to end development of mobile applications.',
      technologies: ['React Native', 'Mobile Development', 'Full Stack']
    },
    {
      company: 'Cleartrip.com',
      position: 'Software Engineer',
      duration: 'April 2019 - May 2021',
      location: 'Bengaluru',
      description: 'Worked on Cleartrip Hotels modules for Cleartrip mobile application. Led the migration of a major Native script project to React Native, enhancing the application\'s performance and user experience.',
      technologies: ['React Native', 'NativeScript', 'Mobile Apps', 'Hotels Booking']
    },
    {
      company: 'Flyin.com',
      position: 'Software Engineer',
      duration: 'February 2014 - April 2019',
      location: 'Hyderabad',
      description: 'Developed Hotels and Flight+Hotels for the Flyin Mobile application. Developed backend APIs for storing and managing hotel information, and successfully implemented these APIs as a service for clients.',
      technologies: ['Mobile Development', 'Backend APIs', 'Hotel Management', 'Client Services']
    }
  ]

  // Projects data
  const projects = [
    {
      title: 'New Relic APM Platform',
      description: 'Developed reusable React components for Application Performance Management platform, enhancing modularity and scalability for enterprise-level monitoring solutions.',
      image: projectNewRelic,
      technologies: ['React', 'Redux', 'TypeScript', 'D3.js', 'APM'],
      category: 'Enterprise Software',
      featured: true
    },
    {
      title: 'Travel & Hotel Booking Apps',
      description: 'Built comprehensive mobile applications for hotel booking and travel management, including Cleartrip Hotels and Flyin mobile apps with seamless user experience.',
      image: projectMobile,
      technologies: ['React Native', 'Node.js', 'MongoDB', 'REST APIs'],
      category: 'Mobile Development',
      featured: true
    },
    {
      title: 'Enterprise Dashboard Solutions',
      description: 'Created scalable dashboard solutions for high-profile clients at Accenture, focusing on data visualization and real-time analytics with modern UI frameworks.',
      image: projectDashboard,
      technologies: ['Angular', 'React', 'Chart.js', 'Azure', 'UI/UX'],
      category: 'Web Development',
      featured: true
    }
  ]

  // Typewriter texts for hero section
  const typewriterTexts = [
    "Senior Software Engineer",
    "React Native Expert",
    "Full Stack Developer",
    "Mobile App Specialist",
    "Performance Optimizer"
  ]

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const glowEffect = {
    initial: { boxShadow: "0 0 0 rgba(34, 197, 94, 0)" },
    hover: { 
      boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Custom cursor effect */}
      <motion.div
        className="fixed w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50"
        style={{ scaleX: pathLength, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 glass-effect"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-xl gradient-text cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              SB
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-card/95 backdrop-blur-md border-t border-border/50 overflow-hidden"
        >
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate={isMenuOpen ? "animate" : "initial"}
            className="px-4 py-2 space-y-2"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                variants={fadeInUp}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center particle-bg hero-gradient relative">
        <ParticleBackground />
        <FloatingTechIcons />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Sunil Bhuvanapalli
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="text-xl md:text-2xl text-muted-foreground mb-8 h-16 flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <TypewriterText 
                texts={typewriterTexts}
                className="font-semibold"
                speed={100}
                deleteSpeed={50}
                pauseTime={2000}
              />
              <span className="ml-2 text-primary">at New Relic</span>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting Digital Experiences with Code & Creativity. 
              Passionate about building scalable, user-centric applications with modern web technologies.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                variants={glowEffect}
                initial="initial"
                whileHover="hover"
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group"
                  onClick={() => scrollToSection('projects')}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">View My Work</span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('contact')}
                  className="border-primary/50 hover:border-primary hover:bg-primary/10"
                >
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex justify-center space-x-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {[
                { Icon: Github, href: "https://github.com/sunilbhuvanapalli", delay: 0 },
                { Icon: Linkedin, href: "https://linkedin.com/in/sunilbhuvanapalli", delay: 0.1 },
                { Icon: Mail, href: "mailto:pavanksunil@gmail.com", delay: 0.2 }
              ].map(({ Icon, href, delay }, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + delay }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  href={href}
                  target={href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-3 rounded-full hover:bg-primary/10"
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator with enhanced animation */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={floatingAnimation}
          animate="animate"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown className="h-8 w-8 text-primary animate-pulse" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section with enhanced animations */}
      <section id="about" className="py-20 bg-card/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              whileInView={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: "linear-gradient(90deg, #22c55e, #a855f7, #22c55e)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              About Me
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dedicated and skilled Senior Software Engineer with a strong background in mobile app and web development, 
              looking to leverage extensive experience in front-end technologies and cloud services in a challenging and dynamic environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 glass-effect">
                  <div className="flex items-center mb-6">
                    <motion.img
                      src={profileImage}
                      alt="Sunil Bhuvanapalli"
                      className="w-20 h-20 rounded-full mr-6 object-cover"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <h3 className="text-2xl font-bold gradient-text">Professional Journey</h3>
                      <p className="text-muted-foreground">Senior Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    With over 10 years of experience in software development, I've had the privilege of working with 
                    industry leaders like New Relic, Accenture, and Cleartrip. My expertise spans across modern web 
                    technologies, mobile app development, and cloud services.
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    I'm proficient in a variety of programming languages and tools with a commitment to staying current 
                    with emerging technologies. My passion lies in creating scalable, user-centric applications that 
                    make a real impact.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div 
                        className="text-3xl font-bold text-primary mb-2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        10+
                      </motion.div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div 
                        className="text-3xl font-bold text-primary mb-2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        10+
                      </motion.div>
                      <div className="text-sm text-muted-foreground">Projects Completed</div>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { Icon: MapPin, title: "Location", content: "Hyderabad, India" },
                { Icon: Phone, title: "Contact", content: "+91 94912 22848" },
                { 
                  Icon: Award, 
                  title: "Certifications", 
                  content: ["Microsoft Azure Fundamentals", "Power Platform Fundamentals", "Java SE 6 Programmer Certified", "Accenture Technology Architect"]
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(34, 197, 94, 0.1)"
                  }}
                >
                  <Card className="p-6 glass-effect">
                    <div className="flex items-center mb-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.Icon className="h-5 w-5 text-primary mr-3" />
                      </motion.div>
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    {Array.isArray(item.content) ? (
                      <div className="space-y-2">
                        {item.content.map((cert, certIndex) => (
                          <motion.div
                            key={certIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: certIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Badge variant="secondary" className="mr-2 mb-2">{cert}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section with enhanced progress animations */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proficient in a wide range of modern technologies and frameworks
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="space-y-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="outline">{skill.category}</Badge>
                  </motion.div>
                </div>
                <div className="relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                  <div className="w-full h-2 bg-muted rounded-full" />
                  <motion.span 
                    className="absolute right-0 -top-6 text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section with enhanced card animations */}
      <section id="experience" className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A journey through my career milestones and achievements
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.1)"
                }}
              >
                <Card className="p-8 glass-effect hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <motion.h3 
                          className="text-xl font-bold text-primary mb-1"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {exp.position}
                        </motion.h3>
                        <h4 className="text-lg font-semibold mb-2">{exp.company}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="secondary">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section with actual projects */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcase of my recent work and contributions
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden glass-effect hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="flex space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button size="sm" variant="secondary">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                    {project.featured && (
                      <motion.div
                        className="absolute top-4 right-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section with enhanced interactivity */}
      <section id="contact" className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Let's discuss opportunities and collaborations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(34, 197, 94, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 glass-effect">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {[
                    { Icon: Mail, title: "Email", content: "pavanksunil@gmail.com", href: "mailto:pavanksunil@gmail.com" },
                    { Icon: Phone, title: "Phone", content: "+91 94912 22848", href: "tel:+919491222848" },
                    { Icon: Linkedin, title: "LinkedIn", content: "Connect with me", href: "https://linkedin.com/in/sunilbhuvanapalli" }
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <contact.Icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:text-accent transition-colors" />
                      </motion.div>
                      <h3 className="font-semibold mb-2">{contact.title}</h3>
                      <motion.a 
                        href={contact.href}
                        target={contact.href.startsWith('mailto:') || contact.href.startsWith('tel:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {contact.content}
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <motion.footer 
        className="py-8 border-t border-border/50 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.p 
              className="text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              © 2024 Sunil Bhuvanapalli. Crafted with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500 inline-block"
              >
                ❤️
              </motion.span>
              {' '}using React & Framer Motion.
            </motion.p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default App

