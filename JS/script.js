// Enhanced Portfolio Script with Comprehensive Testing and Scrolling Animations

// Global variables
let isInitialized = false
const scrollAnimationTl = null

// Declare variables before using them
let AOS
let gsap
let ScrollTrigger
let bootstrap

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfolio script loading...")

  try {
    // Initialize all components with comprehensive error handling
    initializePortfolio()
    console.log("✅ Portfolio initialized successfully!")
  } catch (error) {
    console.error("❌ Error during initialization:", error)
    // Continue with basic functionality even if some features fail
    initBasicFunctionality()
  }

    // Check if we came back from form submission
  if (window.location.search.includes("success=true")) {
    // Show success message
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      showSuccessMessage()
    }

    // Clean up the URL
    window.history.replaceState({}, document.title, window.location.pathname)
  }
})

// Main initialization function
function initializePortfolio() {
  if (isInitialized) {
    console.log("⚠️ Portfolio already initialized")
    return
  }

  console.log("🔧 Initializing portfolio components...")

  // Core functionality
  initSmoothScrolling()
  initNavigation()
  initTypingEffect()
  initParallaxEffects()
  initContactForm()
  initBackToTop()
  initHeaderScroll()

  // Enhanced features
  initScrollAnimations()
  initSkillsSection()
  initCertificationsSection()

  // Initialize AOS if available
  if (typeof AOS !== "undefined") {
    initAOS()
  } else {
    console.warn("⚠️ AOS library not loaded, using fallback animations")
    initFallbackAnimations()
  }

  // Initialize GSAP if available
  if (typeof gsap !== "undefined") {
    initGSAPAnimations()
  } else {
    console.warn("⚠️ GSAP library not loaded, using CSS animations")
  }

  // Prevent zoom on mobile
  preventZoom()

  // Mark as initialized
  isInitialized = true

  // Test all functions
  setTimeout(() => {
    testAllFunctions()
  }, 1000)
}

// Enhanced Smooth Scrolling with GSAP
function initSmoothScrolling() {
  console.log("🔧 Initializing smooth scrolling...")

  const smoothScrollLinks = document.querySelectorAll(".smooth-scroll")

  if (!smoothScrollLinks.length) {
    console.warn("⚠️ No smooth scroll links found")
    return
  }

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const header = document.querySelector(".header")
        const headerHeight = header ? header.offsetHeight : 70
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight

        // Use GSAP if available, otherwise use native smooth scroll
        if (typeof gsap !== "undefined") {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: targetPosition,
            ease: "power2.out",
          })
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }

        // Close mobile menu if open
        const offcanvas = bootstrap?.Offcanvas?.getInstance(document.getElementById("mobileNavOffcanvas"))
        if (offcanvas) {
          offcanvas.hide()
        }

        // Update active navigation
        updateActiveNavigation(targetId)
      }
    })
  })

  console.log("✅ Smooth scrolling initialized")
}

// Enhanced Navigation with Active State Management
function initNavigation() {
  console.log("🔧 Initializing navigation...")

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .mobile-nav-link")
  const sections = document.querySelectorAll("section[id]")

  if (!navLinks.length || !sections.length) {
    console.warn("⚠️ Navigation elements not found")
    return
  }

  // Handle navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href && href.startsWith("#")) {
        updateActiveNavigation(href)
      }
    })
  })

  // Update active navigation on scroll
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -80% 0px",
    threshold: 0,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id
        updateActiveNavigation(id)
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })

  console.log("✅ Navigation initialized")
}

// Update Active Navigation State
function updateActiveNavigation(targetId) {
  const allNavLinks = document.querySelectorAll(".navbar-nav .nav-link, .mobile-nav-link")

  allNavLinks.forEach((link) => {
    link.classList.remove("active")
    link.removeAttribute("aria-current")

    if (link.getAttribute("href") === targetId) {
      link.classList.add("active")
      link.setAttribute("aria-current", "page")
    }
  })
}

// Enhanced Typing Effect
function initTypingEffect() {
  console.log("🔧 Initializing typing effect...")

  const typingElement = document.querySelector(".typing-text")
  if (!typingElement) {
    console.warn("⚠️ Typing element not found")
    return
  }

  const texts = ["Full Stack Developer", "Web Designer", "Frontend Developer", "Problem Solver", "UI/UX Enthusiast"]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeText() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500
    }

    setTimeout(typeText, typeSpeed)
  }

  typeText()
  console.log("✅ Typing effect initialized")
}

// Enhanced Parallax Effects
function initParallaxEffects() {
  console.log("🔧 Initializing parallax effects...")

  const parallaxElements = document.querySelectorAll(".parallax-element")

  if (!parallaxElements.length) {
    console.warn("⚠️ Parallax elements not found")
    return
  }

  function updateParallax() {
    const scrolled = window.pageYOffset

    parallaxElements.forEach((element, index) => {
      const speed = Number.parseFloat(element.dataset.speed) || 0.5
      const yPos = scrolled * speed

      switch (index) {
        case 0:
          element.style.transform = `translateY(${yPos}px)`
          break
        case 1:
          element.style.transform = `translateY(${yPos}px) translateX(${yPos * 0.2}px)`
          break
        case 2:
          element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`
          break
        case 3:
          element.style.transform = `translateY(${yPos}px) translateX(${-yPos * 0.1}px)`
          break
        case 4:
          element.style.transform = `translateY(${yPos}px) scale(${1 + scrolled * 0.0001})`
          break
        default:
          element.style.transform = `translateY(${yPos}px)`
      }
    })
  }

  let ticking = false
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
      setTimeout(() => {
        ticking = false
      }, 16)
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true })
  updateParallax()

  console.log("✅ Parallax effects initialized")
}

// Enhanced Scroll Animations with GSAP
function initScrollAnimations() {
  console.log("🔧 Initializing scroll animations...")

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)

    // Skills section scroll animations
    initSkillsScrollAnimations()

    // Certifications section scroll animations
    initCertificationsScrollAnimations()

    // General scroll animations
    initGeneralScrollAnimations()

    console.log("✅ GSAP scroll animations initialized")
  } else {
    console.warn("⚠️ GSAP/ScrollTrigger not available, using fallback animations")
    initFallbackScrollAnimations()
  }
}

// Skills Section Scroll Animations
function initSkillsScrollAnimations() {
  const skillIslands = document.querySelectorAll(".skill-island")

  skillIslands.forEach((island, index) => {
    const hexagons = island.querySelectorAll(".hexagon-skill")

    // Island entrance animation
    gsap.fromTo(
      island,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: island,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Hexagon stagger animation
    hexagons.forEach((hexagon, hexIndex) => {
      const staggerDelay = Number.parseFloat(hexagon.dataset.scrollStagger) || hexIndex * 0.1

      gsap.fromTo(
        hexagon,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          delay: staggerDelay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: hexagon,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  })
}

// Certifications Section Scroll Animations
function initCertificationsScrollAnimations() {
  const certificateCards = document.querySelectorAll(".certificate-card")

  certificateCards.forEach((card, index) => {
    const staggerDelay = Number.parseFloat(card.closest("[data-scroll-stagger]")?.dataset.scrollStagger) || index * 0.1

    gsap.fromTo(
      card,
      {
        y: 50,
        opacity: 0,
        rotationY: -15,
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        delay: staggerDelay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

// General Scroll Animations
function initGeneralScrollAnimations() {
  // Portfolio items
  const portfolioItems = document.querySelectorAll(".portfolio-item")
  portfolioItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Contact items
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

// Fallback Scroll Animations (without GSAP)
function initFallbackScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-scroll-trigger], [data-scroll-stagger]")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target
          const stagger = Number.parseFloat(element.dataset.scrollStagger) || 0

          setTimeout(() => {
            element.classList.add("animate-in")
          }, stagger * 1000)

          observer.unobserve(element)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Enhanced Skills Section
function initSkillsSection() {
  console.log("🔧 Initializing skills section...")

  try {
    initSkillIslands()
    initSkillModal()
    initIslandNavigation()
    initSkillsDesktopNavigation()
    console.log("✅ Skills section initialized")
  } catch (error) {
    console.error("❌ Error initializing skills section:", error)
  }
}

// Desktop Skills Navigation - Fixed version
function initSkillsDesktopNavigation() {
  console.log("🔧 Initializing skills desktop navigation...")

  const prevBtn = document.getElementById("skillsPrevBtn")
  const nextBtn = document.getElementById("skillsNextBtn")
  const islands = document.querySelectorAll(".skill-island")
  const navDots = document.querySelectorAll(".nav-dot")

  if (!prevBtn || !nextBtn || !islands.length) {
    console.warn("⚠️ Skills navigation elements not found")
    return
  }

  let currentIslandIndex = 0

  function updateIslandVisibility() {
    islands.forEach((island, index) => {
      if (index === currentIslandIndex) {
        island.style.opacity = "1"
        island.style.transform = "translateY(-10px) scale(1.02)"
        island.style.zIndex = "10"
      } else {
        island.style.opacity = "0.3"
        island.style.transform = "translateY(0) scale(0.95)"
        island.style.zIndex = "3"
      }
    })

    // Update navigation dots
    navDots.forEach((dot, index) => {
      if (index === currentIslandIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })

    // Update button states
    prevBtn.disabled = currentIslandIndex === 0
    nextBtn.disabled = currentIslandIndex === islands.length - 1

    prevBtn.style.opacity = currentIslandIndex === 0 ? "0.3" : "1"
    nextBtn.style.opacity = currentIslandIndex === islands.length - 1 ? "0.3" : "1"
  }

  prevBtn.addEventListener("click", () => {
    if (currentIslandIndex > 0) {
      currentIslandIndex--
      updateIslandVisibility()
    }
  })

  nextBtn.addEventListener("click", () => {
    if (currentIslandIndex < islands.length - 1) {
      currentIslandIndex++
      updateIslandVisibility()
    }
  })

  // Initialize
  updateIslandVisibility()

  console.log("✅ Skills desktop navigation initialized")
}

// Initialize Skill Islands
function initSkillIslands() {
  const skillHexagons = document.querySelectorAll(".hexagon-skill")
  const islands = document.querySelectorAll(".skill-island")

  // Add hover effects to islands
  islands.forEach((island) => {
    island.addEventListener("mouseenter", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(island, {
          y: -15,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        island.style.transform = "translateY(-15px) scale(1.05)"
      }
    })

    island.addEventListener("mouseleave", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(island, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        island.style.transform = "translateY(-10px) scale(1.02)"
      }
    })
  })

  // Add click handlers to hexagons
  skillHexagons.forEach((hexagon) => {
    hexagon.addEventListener("click", () => {
      const skillId = hexagon.dataset.skill
      const skillLevel = hexagon.dataset.level
      showSkillModal(skillId, skillLevel)
    })

    // Add hover effects
    hexagon.addEventListener("mouseenter", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(hexagon, {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
      }
    })

    hexagon.addEventListener("mouseleave", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(hexagon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    })
  })
}

// Initialize Skill Modal - Fixed version
function initSkillModal() {
  const modal = document.getElementById("skillModal")
  const closeBtn = document.getElementById("closeModal")
  const backdrop = document.getElementById("modalBackdrop")

  if (closeBtn) {
    closeBtn.addEventListener("click", hideSkillModal)
  }

  if (backdrop) {
    backdrop.addEventListener("click", hideSkillModal)
  }

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      hideSkillModal()
    }
  })
}

// Show Skill Modal - Fixed version with scrolling
function showSkillModal(skillId, level) {
  const modal = document.getElementById("skillModal")
  if (!modal) {
    console.warn("⚠️ Skill modal not found")
    return
  }

  const skillData = getSkillData(skillId)

  // Update modal content
  const skillIcon = modal.querySelector(".skill-icon-large i")
  const skillTitle = modal.querySelector(".skill-title")
  const skillCategory = modal.querySelector(".skill-category")
  const progressRing = modal.querySelector(".progress-ring-fill")
  const progressText = modal.querySelector(".progress-text")
  const skillDescription = modal.querySelector(".skill-description p")
  const featureList = modal.querySelector(".feature-list")

  if (skillIcon) skillIcon.className = skillData.icon
  if (skillTitle) skillTitle.textContent = skillData.name
  if (skillCategory) skillCategory.textContent = skillData.category
  if (progressText) progressText.textContent = `${level}%`
  if (skillDescription) skillDescription.textContent = skillData.description

  // Animate progress ring
  if (progressRing) {
    const circumference = 2 * Math.PI * 50
    const offset = circumference - (level / 100) * circumference
    progressRing.style.strokeDasharray = circumference
    progressRing.style.strokeDashoffset = circumference

    setTimeout(() => {
      progressRing.style.strokeDashoffset = offset
    }, 300)
  }

  // Update features
  if (featureList && skillData.features) {
    featureList.innerHTML = ""
    skillData.features.forEach((feature) => {
      const li = document.createElement("li")
      li.textContent = feature
      featureList.appendChild(li)
    })
  }

  // Show modal with proper display and enable scrolling
  modal.classList.add("active")

  // Prevent body scroll but allow modal scroll
  document.body.style.overflow = "hidden"

  // Ensure modal content can scroll
  const modalContent = modal.querySelector(".modal-content")
  if (modalContent) {
    modalContent.style.overflowY = "auto"
    modalContent.style.maxHeight = "90vh"
  }

  console.log("✅ Skill modal opened for:", skillData.name)
}

// Hide Skill Modal - Fixed version
function hideSkillModal() {
  const modal = document.getElementById("skillModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""

    // Reset modal content scroll
    const modalContent = modal.querySelector(".modal-content")
    if (modalContent) {
      modalContent.scrollTop = 0
    }

    console.log("✅ Skill modal closed")
  }
}

// Initialize Island Navigation
function initIslandNavigation() {
  const navDots = document.querySelectorAll(".nav-dot")
  const islands = document.querySelectorAll(".skill-island")

  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = dot.dataset.target
      const targetIsland = document.querySelector(`[data-island="${target}"]`)

      if (targetIsland) {
        // Update active dot
        navDots.forEach((d) => d.classList.remove("active"))
        dot.classList.add("active")

        // Scroll to island (for mobile)
        if (window.innerWidth <= 991) {
          targetIsland.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        } else {
          // Highlight island on desktop
          islands.forEach((island) => {
            island.style.opacity = island === targetIsland ? "1" : "0.6"
          })

          setTimeout(() => {
            islands.forEach((island) => {
              island.style.opacity = "1"
            })
          }, 2000)
        }
      }
    })
  })
}

// Get Skill Data
function getSkillData(skillId) {
  const skillsData = {
    html: {
      name: "HTML5",
      category: "Frontend",
      icon: "fab fa-html5",
      description:
        "Modern markup language for creating structured, semantic web pages and applications with advanced features like canvas, video, and local storage.",
      features: ["Semantic Elements", "Form Validation", "Canvas & SVG", "Local Storage", "Responsive Design"],
    },
    css: {
      name: "CSS3",
      category: "Frontend",
      icon: "fab fa-css3-alt",
      description:
        "Advanced styling language for creating beautiful, responsive designs with animations, transitions, and modern layout techniques.",
      features: ["Flexbox & Grid", "Animations", "Media Queries", "Custom Properties", "Transforms"],
    },
    javascript: {
      name: "JavaScript",
      category: "Frontend",
      icon: "fab fa-js",
      description:
        "Dynamic programming language for creating interactive web applications with modern ES6+ features and asynchronous programming.",
      features: ["ES6+ Syntax", "Async/Await", "DOM Manipulation", "Event Handling", "API Integration"],
    },
    bootstrap: {
      name: "Bootstrap",
      category: "Frontend",
      icon: "fab fa-bootstrap",
      description:
        "Popular CSS framework for building responsive, mobile-first websites with pre-built components and utilities.",
      features: ["Responsive Grid", "Components", "Utilities", "Customization", "JavaScript Plugins"],
    },
    python: {
      name: "Python",
      category: "Backend",
      icon: "fab fa-python",
      description:
        "Versatile, high-level programming language perfect for web development, data science, automation, and artificial intelligence.",
      features: ["Web Development", "Data Analysis", "Machine Learning", "Automation", "API Development"],
    },
    java: {
      name: "Java",
      category: "Backend",
      icon: "fab fa-java",
      description:
        "Robust, object-oriented programming language for enterprise applications, Android development, and large-scale systems.",
      features: ["OOP Principles", "Enterprise Apps", "Android Development", "Spring Framework", "Multithreading"],
    },
    cpp: {
      name: "C++",
      category: "Backend",
      icon: "fas fa-code",
      description:
        "Powerful, low-level programming language for system programming, game development, and performance-critical applications.",
      features: ["System Programming", "Game Development", "Memory Management", "STL", "Performance Optimization"],
    },
    c: {
      name: "C",
      category: "Backend",
      icon: "fas fa-copyright",
      description:
        "Fundamental programming language for system programming, embedded systems, and understanding computer architecture.",
      features: ["System Programming", "Embedded Systems", "Memory Management", "Pointers", "Low-level Operations"],
    },
    django: {
      name: "Django",
      category: "Framework",
      icon: "fab fa-python",
      description:
        "High-level Python web framework that encourages rapid development and clean, pragmatic design with built-in security features.",
      features: ["MVC Architecture", "ORM", "Admin Interface", "Security Features", "Scalability"],
    },
    mysql: {
      name: "MySQL",
      category: "Database",
      icon: "fas fa-database",
      description:
        "Popular relational database management system for storing, organizing, and retrieving data efficiently in web applications.",
      features: ["ACID Compliance", "Indexing", "Replication", "Stored Procedures", "Performance Optimization"],
    },
    genai: {
      name: "Generative AI",
      category: "AI/ML",
      icon: "fas fa-robot",
      description:
        "Cutting-edge artificial intelligence technology for creating content, automating tasks, and building intelligent applications.",
      features: [
        "Content Generation",
        "Natural Language Processing",
        "Machine Learning",
        "API Integration",
        "Prompt Engineering",
      ],
    },
    tableau: {
      name: "Tableau",
      category: "Analytics",
      icon: "fas fa-chart-bar",
      description:
        "Powerful data visualization tool for creating interactive dashboards and reports that help in data-driven decision making.",
      features: [
        "Data Visualization",
        "Interactive Dashboards",
        "Data Connections",
        "Statistical Analysis",
        "Storytelling",
      ],
    },
    powerbi: {
      name: "Power BI",
      category: "Analytics",
      icon: "fas fa-chart-pie",
      description:
        "Microsoft's business analytics tool for visualizing data and sharing insights across organizations with real-time dashboards.",
      features: [
        "Business Intelligence",
        "Real-time Analytics",
        "Data Modeling",
        "Custom Visuals",
        "Cloud Integration",
      ],
    },
    excel: {
      name: "Microsoft Excel",
      category: "Analytics",
      icon: "fas fa-file-excel",
      description:
        "Comprehensive spreadsheet application for data analysis, financial modeling, and business intelligence with advanced formulas.",
      features: ["Advanced Formulas", "Pivot Tables", "Data Analysis", "Macros & VBA", "Financial Modeling"],
    },
  }

  return (
    skillsData[skillId] || {
      name: "Unknown Skill",
      category: "General",
      icon: "fas fa-question",
      description: "Skill information not available.",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    }
  )
}

// Enhanced Certifications Section
function initCertificationsSection() {
  console.log("🔧 Initializing certifications section...")

  try {
    initCertificateCarousel()
    initCertificateModal()
    console.log("✅ Certifications section initialized")
  } catch (error) {
    console.error("❌ Error initializing certifications section:", error)
  }
}

// Initialize Certificate Carousel - Fixed version
function initCertificateCarousel() {
  const carousel = document.getElementById("certificateCarousel")
  if (!carousel) {
    console.warn("⚠️ Certificate carousel not found")
    return
  }

  // Ensure Bootstrap is available
  if (typeof bootstrap === "undefined") {
    console.warn("⚠️ Bootstrap not loaded, using fallback")
    return
  }

  try {
    // Initialize Bootstrap carousel with custom settings
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true,
      touch: true,
      pause: "hover",
    })

    // Add custom touch/swipe support
    let touchStartX = 0
    let touchEndX = 0

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true },
    )

    function handleSwipe() {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        bsCarousel.next()
      } else if (touchEndX > touchStartX + swipeThreshold) {
        bsCarousel.prev()
      }
    }

    console.log("✅ Certificate carousel initialized successfully")
  } catch (error) {
    console.error("❌ Error initializing certificate carousel:", error)
  }
}

// Initialize Certificate Modal - Fixed version with scrolling
function initCertificateModal() {
  const viewCertificateBtns = document.querySelectorAll(".view-certificate-btn")
  const certificateModal = document.getElementById("certificateModal")
  const certificateImage = document.getElementById("certificateImage")
  const certificateTitle = document.getElementById("certificateTitle")
  const certificateOrganization = document.getElementById("certificateOrganization")
  const certificateDate = document.getElementById("certificateDate")
  const downloadBtn = document.getElementById("downloadCertificate")
  const certificateLoading = document.querySelector(".certificate-loading")

  if (!viewCertificateBtns.length || !certificateModal) {
    console.warn("⚠️ Certificate modal elements not found")
    return
  }

  // Certificate data mapping
  const certificateData = {
    "python-course": {
      title: "Python Course",
      organization: "GeeksforGeeks",
      date: "August 2024",
      image: "./course/pythonCertificate.png",
      downloadUrl: "./course/pythonCertificate.png",
    },
    "django-course": {
      title: "Django Course",
      organization: "GeeksforGeeks",
      date: "October 2024",
      image: "./course/djangoCertificate.png",
      downloadUrl: "./course/djangoCertificate.png",
    },
    "oop-python": {
      title: "oop_python",
      organization: "Infosys | Springboard",
      date: "October 2024",
      image: "./course/opp_python.png",
      downloadUrl: "./course/opp_python.png",
    },
    "web-development": {
      title: "Fundamentals Of Web Development",
      organization: "Ace Academy, Sunstone",
      date: "December 2024",
      image: "./course/Fundamentals Of Web Development.png",
      downloadUrl: "./course/Fundamentals Of Web Development.png",
    },
    "advance-javascript": {
      title: "Advance JavaScript",
      organization: "Ace Academy, Sunstone",
      date: "June 2025",
      image: "./course/Advance JavaScript.png",
      downloadUrl: "./course/Advance JavaScript.png",
    },
    "frontend-internship": {
      title: "Frontend Development Internship",
      organization: "Nexila Technologies",
      date: "Summer 2024",
      image: "./internship/FrontEnd Development.jpg",
      downloadUrl: "./internship/FrontEnd Development.jpg",
    },
    "ip-awareness": {
      title: "IP Awareness/Training Program",
      organization: "Intellectual Property Office, India",
      date: "February 2025",
      image: "./webinar/IP Awareness.png",
      downloadUrl: "./webinar/IP Awareness.png",
    },
    "tableau-workshop": {
      title: "Tableau",
      organization: "JobAaj",
      date: "September 2024",
      image: "./webinar/Tableau Certificate (JobAaj).jpg",
      downloadUrl: "./webinar/Tableau Certificate (JobAaj).jpg",
    },    
    "debugging-winner": {
      title: "Debugging Winner",
      organization: "PROF.Dhanapalan College of Science & Management",
      date: "January 2025",
      image: "./Compition/Debugging3.jpeg",
      downloadUrl: "./Compition/Debugging3.jpeg",
    },
    "web-design-runner": {
      title: "Web Designing Runner",
      organization: "PROF.Dhanapalan College of Science & Management",
      date: "January 2025",
      image: "./Compition/Web Designing.jpeg",
      downloadUrl: "./Compition/Web Designing.jpeg",
    },
    "debugging-runner": {
      title: "Debugging Runner",
      organization: "The New College",
      date: "February 2025",
      image: "./Compition/Debugging 2.jpeg",
      downloadUrl: "./Compition/Debugging 2.jpeg",
    },
    "code-o-feista": {
      title: "Code -o- Feista",
      organization: "DDGD Vaishnav College",
      date: "February 2025",
      image: "./Compition/Code-O-Festa.jpeg",
      downloadUrl: "./Compition/Code-O-Festa.jpeg",
    },
  }

  // Add click event listeners to all view certificate buttons
  viewCertificateBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const certificateId = btn.getAttribute("data-certificate")
      const data = certificateData[certificateId]

      if (!data) {
        console.error(`Certificate data not found for ID: ${certificateId}`)
        return
      }

      // Show loading state
      if (certificateLoading) certificateLoading.classList.remove("d-none")
      if (certificateImage) certificateImage.style.display = "none"

      // Update modal content
      if (certificateTitle) certificateTitle.textContent = data.title
      if (certificateOrganization) certificateOrganization.textContent = data.organization
      if (certificateDate) certificateDate.textContent = data.date

      // Set up download button
      if (downloadBtn) {
        downloadBtn.onclick = () => {
          // Create a temporary link for download simulation
          const link = document.createElement("a")
          link.href = data.image
          link.download = `${data.title.replace(/\s+/g, "_")}_Certificate.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }

      // Simulate loading delay and show image
      setTimeout(() => {
        if (certificateImage) {
          certificateImage.src = data.image
          certificateImage.alt = `${data.title} Certificate`

          // ❗️Hide the placeholder right away
          const certificatePlaceholder = document.getElementById("certificatePlaceholder")
          if (certificatePlaceholder) certificatePlaceholder.style.display = "none"

          certificateImage.onload = () => {
            if (certificateLoading) certificateLoading.classList.add("d-none")
            certificateImage.style.display = "block"
          }

          certificateImage.onerror = () => {
            if (certificateLoading) certificateLoading.classList.add("d-none")
            certificateImage.style.display = "block"
            console.error("Failed to load certificate image")
          }
        }
      }, 500)

    })
  })

  // Reset modal when closed - Fixed for Bootstrap modal
if (certificateModal) {
  certificateModal.addEventListener("hidden.bs.modal", () => {
    if (certificateImage) {
      certificateImage.src = ""
      certificateImage.style.display = "none"
    }

    if (certificateLoading) certificateLoading.classList.add("d-none")

    // ✅ Show placeholder again
    const certificatePlaceholder = document.getElementById("certificatePlaceholder")
    if (certificatePlaceholder) certificatePlaceholder.style.display = "block"

    // Reset text
    if (certificateTitle) certificateTitle.textContent = ""
    if (certificateOrganization) certificateOrganization.textContent = ""
    if (certificateDate) certificateDate.textContent = ""
  })
}

}

// Enhanced Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  const submitBtn = document.getElementById("submit-btn")
  const formMessage = document.getElementById("form-message")

  if (!contactForm || !submitBtn || !formMessage) return

  // Form validation
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault() // Prevent default form submission

    // Validate form
    if (!validateForm()) {
      return
    }

    // Show loading state
    const originalBtnContent = submitBtn.innerHTML
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...'
    submitBtn.disabled = true

    // Clear previous messages
    formMessage.innerHTML = ""

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Create a timeout for the form submission
    const timeoutId = setTimeout(() => {
      // If it takes too long, show error and offer email fallback
      submitBtn.innerHTML = originalBtnContent
      submitBtn.disabled = false

      formMessage.innerHTML = `
        <div class="error-message">
          <p>The form is taking longer than expected. Please try sending an email directly or try again later.</p>
          <button id="email-direct-btn" class="btn secondary-btn" style="margin-top: 10px; margin-left: 0;">
            <span class="btn-content">
              <i class="fas fa-envelope"></i> Send Email Directly
            </span>
          </button>
        </div>
      `

      // Add event listener to the direct email button
      document.getElementById("email-direct-btn").addEventListener("click", () => {
        // Create mailto link with form data
        const mailtoLink = `mailto:madhusudan27102005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
        window.location.href = mailtoLink
      })
    }, 5000) // 5 seconds timeout

    // Use fetch to submit the form to formsubmit.co
    fetch("https://formsubmit.co/ajax/madhusudan27102005@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
    })
      .then((response) => {
        clearTimeout(timeoutId) // Clear the timeout
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        // Show success message
        showSuccessMessage()
      })
      .catch((error) => {
        clearTimeout(timeoutId) // Clear the timeout
        console.error("Error:", error)

        // Show error message with fallback option
        submitBtn.innerHTML = originalBtnContent
        submitBtn.disabled = false

        formMessage.innerHTML = `
        <div class="error-message">
          <p>There was an error sending your message. Please try sending an email directly or try again later.</p>
          <button id="email-direct-btn" class="btn secondary-btn" style="margin-top: 10px; margin-left: 0;">
            <span class="btn-content">
              <i class="fas fa-envelope"></i> Send Email Directly
            </span>
          </button>
        </div>
      `

        // Add event listener to the direct email button
        document.getElementById("email-direct-btn").addEventListener("click", () => {
          // Create mailto link with form data
          const mailtoLink = `mailto:madhusudan27102005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`
          window.location.href = mailtoLink
        })
      })
  })

  function showSuccessMessage() {
  // Replace form with success message
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return

  const contactFormContainer = contactForm.parentElement
  contactFormContainer.innerHTML = `
    <div class="success-message">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you for reaching out. I'll get back to you soon.</p>
      <button class="btn primary-btn" id="send-another-btn">
        <span class="btn-content">
          <span>Send Another Message</span>
          <i class="fas fa-paper-plane"></i>
        </span>
      </button>
    </div>
  `

  // Add event listener to "Send Another Message" button
  const sendAnotherBtn = document.getElementById("send-another-btn")
  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener("click", () => {
      // Reload the contact form
      location.reload()
    })
  }
}

  // Form validation function
  function validateForm() {
    let isValid = true

    // Clear previous error messages
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = ""
      el.style.display = "none"
    })
    document.querySelectorAll(".form-group").forEach((el) => {
      el.classList.remove("error")
    })

    // Validate name
    const nameInput = document.getElementById("name")
    if (!nameInput.value.trim()) {
      showError(nameInput, "name-error", "Please enter your name")
      isValid = false
    }

    // Validate email
    const emailInput = document.getElementById("email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailInput.value.trim()) {
      showError(emailInput, "email-error", "Please enter your email")
      isValid = false
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "email-error", "Please enter a valid email address")
      isValid = false
    }

    // Validate subject
    const subjectInput = document.getElementById("subject")
    if (!subjectInput.value.trim()) {
      showError(subjectInput, "subject-error", "Please enter a subject")
      isValid = false
    }

    // Validate message
    const messageInput = document.getElementById("message")
    if (!messageInput.value.trim()) {
      showError(messageInput, "message-error", "Please enter your message")
      isValid = false
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, "message-error", "Message must be at least 10 characters long")
      isValid = false
    }

    return isValid
  }

  // Show error message function
  function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId)
    if (errorElement) {
      errorElement.textContent = message
      errorElement.style.display = "block"
      input.parentElement.parentElement.classList.add("error")
      input.focus()
    }
  }
}

// Initialize Back to Top Button
function initBackToTop() {
  console.log("🔧 Initializing back to top button...")

  const backToTopButton = document.getElementById("backToTop")

  if (!backToTopButton) {
    console.warn("⚠️ Back to top button not found")
    return
  }

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove("d-none")
    } else {
      backToTopButton.classList.add("d-none")
    }
  })

  console.log("✅ Back to top button initialized")
}

// Initialize Header Scroll Effect
function initHeaderScroll() {
  console.log("🔧 Initializing header scroll effect...")

  const header = document.querySelector(".header")

  if (!header) {
    console.warn("⚠️ Header not found")
    return
  }

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  console.log("✅ Header scroll effect initialized")
}

// Initialize AOS (Animate On Scroll) library
function initAOS() {
  try {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    })
    console.log("✅ AOS initialized successfully!")
  } catch (error) {
    console.error("❌ Error initializing AOS:", error)
  }
}

// Initialize GSAP Animations
function initGSAPAnimations() {
  console.log("🔧 Initializing GSAP animations...")

  // Hero section animations
  const heroTl = gsap.timeline()
  heroTl
    .from(".hero-text h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" })
    .from(".hero-text h2", { duration: 0.8, y: 30, opacity: 0, ease: "power2.out" }, "-=0.5")
    .from(".hero-text p", { duration: 0.8, y: 30, opacity: 0, ease: "power2.out" }, "-=0.3")
    .from(".hero-btns .btn", { duration: 0.6, y: 20, opacity: 0, stagger: 0.2, ease: "power2.out" }, "-=0.3")
    .from(".social-icons a", { duration: 0.5, scale: 0, opacity: 0, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3")

  // Profile image animation
  gsap.from(".profile-img", {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.5,
  })

  console.log("✅ GSAP animations initialized")
}

// Fallback Animations (without AOS)
function initFallbackAnimations() {
  console.log("🔧 Initializing fallback animations...")

  const animatedElements = document.querySelectorAll("[data-aos]")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })

  console.log("✅ Fallback animations initialized")
}

// Basic Functionality (fallback)
function initBasicFunctionality() {
  console.log("🔧 Initializing basic functionality...")

  // Basic smooth scrolling
  document.querySelectorAll(".smooth-scroll").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Basic typing effect
  const typingElement = document.querySelector(".typing-text")
  if (typingElement) {
    typingElement.textContent = "Full Stack Developer"
  }

  console.log("✅ Basic functionality initialized")
}

// Prevent zoom on mobile devices
function preventZoom() {
  document.addEventListener(
    "touchmove",
    (event) => {
      if (event.scale !== undefined && event.scale !== 1) {
        event.preventDefault()
      }
    },
    { passive: false },
  )
}

// Comprehensive Function Testing
function testAllFunctions() {
  console.log("🧪 Testing all functions...")

  const tests = [
    { name: "Smooth Scrolling", test: () => document.querySelectorAll(".smooth-scroll").length > 0 },
    { name: "Navigation", test: () => document.querySelectorAll(".nav-link").length > 0 },
    { name: "Typing Effect", test: () => document.querySelector(".typing-text") !== null },
    { name: "Skills Section", test: () => document.querySelectorAll(".hexagon-skill").length > 0 },
    { name: "Skills Navigation", test: () => document.getElementById("skillsPrevBtn") !== null },
    { name: "Skill Modal", test: () => document.getElementById("skillModal") !== null },
    { name: "Certifications", test: () => document.getElementById("certificateCarousel") !== null },
    { name: "Contact Form", test: () => document.getElementById("contactForm") !== null },
    { name: "Back to Top", test: () => document.getElementById("backToTop") !== null },
    { name: "Parallax Elements", test: () => document.querySelectorAll(".parallax-element").length > 0 },
    { name: "Portfolio Items", test: () => document.querySelectorAll(".portfolio-item").length > 0 },
    { name: "Social Icons", test: () => document.querySelectorAll(".social-icons a").length > 0 },
  ]

  let passedTests = 0
  let failedTests = 0

  tests.forEach((test) => {
    try {
      if (test.test()) {
        console.log(`✅ ${test.name}: PASSED`)
        passedTests++
      } else {
        console.log(`❌ ${test.name}: FAILED`)
        failedTests++
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`)
      failedTests++
    }
  })

  console.log(`\n📊 Test Results: ${passedTests}/${tests.length} tests passed`)

  if (failedTests === 0) {
    console.log("🎉 All tests passed! Portfolio is fully functional.")
  } else {
    console.log(`⚠️ ${failedTests} tests failed. Some features may not work correctly.`)
  }

  // Test scrolling animations
  testScrollAnimations()

  // Test responsive behavior
  testResponsiveDesign()
}

// Test Scrolling Animations
function testScrollAnimations() {
  console.log("🧪 Testing scrolling animations...")

  const scrollTriggers = document.querySelectorAll("[data-scroll-trigger]")
  const scrollStaggerElements = document.querySelectorAll("[data-scroll-stagger]")

  console.log(`✅ Found ${scrollTriggers.length} scroll trigger elements`)
  console.log(`✅ Found ${scrollStaggerElements.length} scroll stagger elements`)

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    console.log("✅ GSAP ScrollTrigger is available")
  } else {
    console.log("⚠️ GSAP ScrollTrigger not available, using fallback")
  }
}

// Test Responsive Design
function testResponsiveDesign() {
  console.log("🧪 Testing responsive design...")

  const breakpoints = [
    { name: "Mobile", width: 375 },
    { name: "Tablet", width: 768 },
    { name: "Desktop", width: 1200 },
  ]

  breakpoints.forEach((bp) => {
    // Simulate viewport change
    const mediaQuery = window.matchMedia(`(min-width: ${bp.width}px)`)
    console.log(`📱 ${bp.name} (${bp.width}px): ${mediaQuery.matches ? "Active" : "Inactive"}`)
  })
}

// Utility Functions
function debounce(func, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), delay)
  }
}

function throttle(func, delay) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), delay)
    }
  }
}

// Handle window resize
window.addEventListener(
  "resize",
  debounce(() => {
    console.log("🔄 Window resized, updating layout...")

    // Refresh ScrollTrigger if available
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh()
    }

    // Update any responsive elements
    updateResponsiveElements()
  }, 250),
)

// Update Responsive Elements
function updateResponsiveElements() {
  // Update skill islands layout for mobile
  const skillIslands = document.querySelectorAll(".skill-island")
  const isMobile = window.innerWidth <= 991

  skillIslands.forEach((island) => {
    if (isMobile) {
      island.style.position = "relative"
      island.style.width = "100%"
      island.style.maxWidth = "400px"
      island.style.margin = "2rem auto"
    }
  })
}

// Performance monitoring
function monitorPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0]
        console.log(`⚡ Page load time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`)
      }, 0)
    })
  }
}

// Initialize performance monitoring
monitorPerformance()

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializePortfolio,
    testAllFunctions,
    initSkillsSection,
    initCertificationsSection,
  }
}

console.log("📝 Portfolio script loaded and ready!")
