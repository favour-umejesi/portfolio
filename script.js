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

// Projects Data
const projects = [
    {
        title: 'Smoking Status Prediction Model',
        description: 'Led the development of a machine learning model for healthcare applications during the DataSpark hackathon. Achieved Top 4 ranking among 10+ submissions with a binary classification model reaching 79% accuracy and 0.87 AUC-ROC. Utilized Python data science stack for feature engineering and created insightful visualizations using Matplotlib/Seaborn.',
        techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
        githubLink: 'https://colab.research.google.com/drive/13M_34Vs0xWcjUwxafGazbWDeoNZYVm6N',
        liveLink: '#'
    },
    {
        title: 'Predictive Analytics Dashboard',
        description: 'An interactive dashboard for visualizing and predicting trends using machine learning models. Features include data visualization and real-time predictions.',
        techStack: ['Python', 'Pandas', 'Scikit-learn', 'React', 'D3.js'],
        githubLink: '#',
        liveLink: '#'
    },
    {
        title: 'Carbon Footprint Calculator',
        description: 'An interactive web application that empowers users to track and reduce their environmental impact through personalized carbon footprint calculations. Features include dynamic data visualization with Chart.js and integration with Carbon Interface API.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Node.js'],
        githubLink: 'https://github.com/KingOz-stack/EcoTrack-',
        liveLink: 'https://eco-track-five.vercel.app/'
    },
    {
        title: 'Task Management System',
        description: 'A collaborative task management application with real-time updates, team collaboration features, and progress tracking.',
        techStack: ['Angular', 'Node.js', 'Socket.io', 'MongoDB'],
        githubLink: '#',
        liveLink: '#'
    },
    {
        title: 'Portfolio Website',
        description: 'A responsive portfolio website showcasing projects and skills with modern design and animations.',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
        githubLink: '#',
        liveLink: '#'
    }
];

// Experience Data
const experiences = [
    {
        role: 'Platform Engineering Intern',
        company: 'Netskope',
        period: 'June 2025 - Present',
        description: 'Leading development of enterprise applications using React, Node.js, and MongoDB. Implementing CI/CD pipelines and mentoring junior developers.',
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
        role: 'Frontend Developer',
        company: 'WebTech Solutions',
        period: '2018 - 2020',
        description: 'Created responsive web interfaces using HTML5, CSS3, and JavaScript. Collaborated with UX designers to implement modern design patterns.',
        logo: 'https://via.placeholder.com/100x100?text=WS'
    }
];

// Render Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
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

// Render Experience Timeline
function renderExperience() {
    console.log('Rendering experience section...');
    const timeline = document.querySelector('.experience-timeline');
    console.log('Timeline element:', timeline);
    
    if (!timeline) {
        console.error('Timeline element not found!');
        return;
    }

    experiences.forEach(exp => {
        console.log('Creating experience item for:', exp.company);
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <img src="${exp.logo}" alt="${exp.company} logo" class="company-logo">
            <div class="timeline-content">
                <h3>${exp.role}</h3>
                <h4>${exp.company}</h4>
                <p class="period">${exp.period}</p>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
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
    const mainText = "Hi, I'm Favour Umejesi";
    const subtitleText = "Aspiring Software Engineer";
    const epigraphText = "Passionate about creating innovative solutions and building robust applications.";
    const thanksText = "Welcome to my portfolio – where technology meets creativity and sustainability. Let's explore how we can build a better digital future together.";
    
    const typingElement = document.querySelector('.typing-text');
    const subtitleElement = document.querySelector('.typing-text-subtitle');
    const epigraphElement = document.querySelector('.typing-text-epigraph');
    const thanksElement = document.querySelector('.typing-text-thanks');
    
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    renderProjects();
    renderExperience();
    rotateBackground();
    typeText();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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