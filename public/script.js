// Music Player
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        backgroundMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Projects Data (if on projects page)
let projects = [];
if (window.location.pathname.includes('projects.html') || window.location.pathname === '/projects') {
    projects = [
        {
            title: '🌿 AgriSmart Africa',
            description: 'A modern <strong>full-stack</strong> web application designed to empower African farmers by simplifying <strong>farm operations</strong>, enhancing <strong>digital branding</strong>, and enabling <strong>venture-style funding</strong>. Features include <strong>inventory management</strong>, <strong>investor matchmaking</strong>, farming advice via <strong>AI assistant</strong>, and <strong>custom logo generation</strong> to scale <strong>agricultural businesses</strong> digitally.',
            techStack: ['Next.js', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Firebase Authentication', 'LangChain + Mistral-7B', 'Stable Diffusion Model'],
            githubLink: 'https://github.com/favour-umejesi/AgriSmart',
            liveLink: '#'
        },
        {
            title: '📈 Smoking Status Prediction Model',
            description: 'Led the development of a machine learning model for healthcare applications during the DataSpark Datathon on Kaggle. Achieved Top 4 ranking among 10+ submissions with a binary classification model reaching 79% accuracy and 0.87 AUC-ROC. Utilized Python data science stack for feature engineering and created insightful visualizations using Matplotlib/Seaborn.',
            techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
            githubLink: 'https://colab.research.google.com/drive/13M_34Vs0xWcjUwxafGazbWDeoNZYVm6N',
            liveLink: '#'
        },
        {
            title: '👣 EcoTrack',
            description: 'An interactive web application that empowers users to track and reduce their environmental impact through personalized carbon footprint calculations. Features include dynamic data visualization with Chart.js and integration with Carbon Interface API.',
            techStack: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Node.js'],
            githubLink: 'https://github.com/KingOz-stack/EcoTrack-',
            liveLink: 'https://eco-track-five.vercel.app/'
        },
        // {
        //     title: 'Task Management System',
        //     description: 'A collaborative task management application with real-time updates, team collaboration features, and progress tracking.',
        //     techStack: ['Angular', 'Node.js', 'Socket.io', 'MongoDB'],
        //     githubLink: '#',
        //     liveLink: '#'
        // },
        // {
        //     title: 'Portfolio Website',
        //     description: 'A responsive portfolio website showcasing projects and skills with modern design and animations.',
        //     techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        //     githubLink: '#',
        //     liveLink: '#'
        // }
    ];
}

// Experience Data (if on experience page)
let experiences = [];
if (window.location.pathname.includes('experience.html') || window.location.pathname === '/experience') {
    experiences = [
        {
            role: 'Platform Engineering Intern',
            company: 'Netskope',
            period: 'June 2025 - Present',
            description: 'Managed secure infrastructure access and automated deployment processes for engineering teams in a production environment. Designed and implemented access control systems using Okta and Kubernetes orchestration through Rancher, while developing automation tooling to streamline SSL certificate deployments.\n\nKey Contributions:\n\n• Architected secure platform access workflows that improved engineering team productivity by 80% through systematic ticketing and access management\n• Built automation scripts in Python and Golang for SSL certificate deployment, reducing manual operational overhead by 40-50%\n• Collaborated with cross-functional teams to optimize containerized infrastructure and enhance security protocols\n\n<strong>Technologies:</strong> Okta • Kubernetes • Rancher • Python • Golang • SSL/TLS • Infrastructure Automation',
            logo: 'assets/netskope.png'
        },
        {
            role: 'AI Extern',
            company: 'PricewaterhouseCoopers',
            period: 'Febuary 2025 - April 2025',
            description: 'Worked on real-world automation challenges in a 10-week AI externship focused on finance document processing.\n\n• Automated extraction from financial documents using <strong>NLP</strong> tools like <strong>PyPDF2</strong> and <strong>pdfplumber</strong>, reducing processing time by 80%.\n\n• Built and deployed <strong>OCR</strong> + <strong>Label Studio</strong> pipelines to extract structured data from multiple document types, boosting speed by 75% and accuracy by 90%.\n\n• Developed a <strong>Retrieval-Augmented Generation (RAG)</strong> pipeline using <strong>Mistral B</strong> and <strong>LLaMA Index</strong>, automating mortgage document classification and insights extraction, cutting down manual underwriting work by 80%.',
            logo: 'assets/pwc.png'
        },
        {
            role: 'Student IT Assistant',
            company: 'Student Technology Center - Grambling State University',
            period: 'October 2024 - Present',
            description: 'Support the daily operations of the campus computer labs, ensuring a reliable and efficient learning environment for students and faculty.\n\n• Deliver technical support to <strong>50+</strong> users daily, resolving hardware and software issues across <strong>50+</strong> managed systems, maintaining <strong>99%</strong> uptime.\n\n• Lead weekly orientation sessions for new users, resulting in a <strong>90%</strong> reduction in policy violations and improved resource usage.\n\n• Collaborate with IT staff to tackle complex issues, implementing solutions that boosted lab uptime by <strong>25%</strong> and cut user complaints by <strong>40%</strong>.',
            logo: 'assets/download.jpeg'
        }
    ];
}

// Render Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projects.forEach(project => {
            // Bold technologies in description
            let description = project.description;
            project.techStack.forEach(tech => {
                const regex = new RegExp(tech, 'g');
                description = description.replace(regex, `<strong>${tech}</strong>`);
            });

            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${description}</p>
                <div class="tech-stack">
                    ${project.techStack.map(tech => `
                        <span class="tech-tag">
                            <strong>${tech}</strong>
                        </span>
                    `).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i></a>
                    <a href="${project.liveLink}" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }
}

// Render Experience (now unused, as data is directly in HTML, but keeping for reference if data becomes dynamic)
function renderExperience() {
    // This function is no longer needed as experience data is directly in HTML.
    // However, if you plan to make it dynamic again, you can re-implement it.
}

// Timeline Gallery (About Page)
function setupTimelineGallery() {
    const timelineItemsContainer = document.querySelector('.timeline-items');
    const leftNav = document.querySelector('.timeline-gallery .left-nav');
    const rightNav = document.querySelector('.timeline-gallery .right-nav');

    if (timelineItemsContainer && leftNav && rightNav) {
        const scrollAmount = timelineItemsContainer.offsetWidth;

        leftNav.addEventListener('click', () => {
            timelineItemsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightNav.addEventListener('click', () => {
            timelineItemsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}

// Background Rotation
function rotateBackground() {
    const backgrounds = document.querySelectorAll('.background-image');
    let currentIndex = 0;

    // Set initial state: only the first image is visible
    backgrounds.forEach((bg, idx) => {
        bg.style.opacity = idx === 0 ? '0.3' : '0';
    });

    setInterval(() => {
        const nextIndex = (currentIndex + 1) % backgrounds.length;

        // Fade in the next background first
        backgrounds[nextIndex].style.opacity = '0.3';

        // After a short delay, fade out the current background
        setTimeout(() => {
            backgrounds[currentIndex].style.opacity = '0';
            currentIndex = nextIndex;
        }, 1000); // 1 second matches your CSS transition
    }, 60000); // Rotate every 60 seconds
}

// Typing Animation
function typeText() {
    const typingElement = document.querySelector('.typing-text');
    const subtitleElement = document.querySelector('.typing-text-subtitle');
    const epigraphElement = document.querySelector('.typing-text-epigraph');
    const thanksElement = document.querySelector('.typing-text-thanks');

    if (typingElement && subtitleElement && epigraphElement && thanksElement) {
        const mainText = "Hi, I'm Favour Umejesi";
        const subtitleText = "Aspiring Software Engineer";
        const epigraphText = "Driven by a passion for creating innovative solutions by integrating intelligent systems into robust, real-world applications.";
        const thanksText = "";
        
        let mainIndex = 0;
        let subtitleIndex = 0;
        let epigraphIndex = 0;
        let thanksIndex = 0;
        
        function typeMain() {
            if (mainIndex < mainText.length) {
                typingElement.textContent += mainText.charAt(mainIndex);
                mainIndex++;
                setTimeout(typeMain, 100);
            } else {
                setTimeout(typeSubtitle, 500);
            }
        }
        
        function typeSubtitle() {
            if (subtitleIndex < subtitleText.length) {
                subtitleElement.textContent += subtitleText.charAt(subtitleIndex);
                subtitleIndex++;
                setTimeout(typeSubtitle, 100);
            } else {
                setTimeout(typeEpigraph, 500);
            }
        }
        
        function typeEpigraph() {
            if (epigraphIndex < epigraphText.length) {
                epigraphElement.textContent += epigraphText.charAt(epigraphIndex);
                epigraphIndex++;
                setTimeout(typeEpigraph, 50);
            } else {
                setTimeout(typeThanks, 700);
            }
        }

        function typeThanks() {
            if (thanksIndex < thanksText.length) {
                thanksElement.textContent += thanksText.charAt(thanksIndex);
                thanksIndex++;
                setTimeout(typeThanks, 40);
            }
        }
        
        // Start typing sequence
        typeMain();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Run functions based on the current page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        typeText();
    } else if (window.location.pathname.includes('projects.html') || window.location.pathname === '/projects') {
        renderProjects();
    } else if (window.location.pathname.includes('about.html') || window.location.pathname === '/about') {
        setupTimelineGallery();
    }
    
    // Journey Timeline Carousel Logic
    if (window.location.pathname.toLowerCase().includes('journey')) {
        const track = document.querySelector('.carousel-track');
        const cards = document.querySelectorAll('.carousel-card');
        const leftArrow = document.querySelector('.carousel-arrow.left-arrow');
        const rightArrow = document.querySelector('.carousel-arrow.right-arrow');
        let currentIndex = 0;

        function scrollToCard(index) {
            if (!track || !cards[index]) return;
            const card = cards[index];
            card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }

        leftArrow && leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                scrollToCard(currentIndex);
            }
        });
        rightArrow && rightArrow.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                scrollToCard(currentIndex);
            }
        });

        // Optional: allow arrow keys for navigation
        document.addEventListener('keydown', (e) => {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
            if (e.key === 'ArrowLeft') leftArrow && leftArrow.click();
            if (e.key === 'ArrowRight') rightArrow && rightArrow.click();
        });

        // Center the first card on load
        scrollToCard(currentIndex);
    }
    
    rotateBackground();
});

// Smooth Scrolling (only for internal links within the same page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#') && document.querySelector(targetId)) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
}); 