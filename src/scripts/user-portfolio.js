document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');


    //  THEME (DARK MODE) LOGIC 

    const applyInitialTheme = () => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        body.classList.toggle('dark-mode', isDarkMode);
    };

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.toggle('dark-mode');

            localStorage.setItem('darkMode', isDarkMode);
        });
    }


    //  MOBILE (HAMBURGER) MENU LOGIC 

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    if (navItems && navLinks) {
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    //  4. DYNAMIC DATA POPULATION 
    const populateData = () => {
        try {
            const data = JSON.parse(localStorage.getItem('portfolioData'));
            if (!data) {
                console.warn('No portfolio data found in localStorage. Using placeholders.');
              
                return;
            }

            const setText = (id, value) => {
                const el = document.getElementById(id);
                if (el) el.innerText = value || '';
            };

            const setHref = (id, value) => {
                const el = document.getElementById(id);
                if (el) el.href = value || '#';
            };

            setText('displayName', data.name);
            setText('displayProfession', data.profession);
            setText('displayBio', data.bio);
            setText('displayEmail', data.email);
            setHref('displayLinkedIn', data.linkedin);
            setHref('displayGithub', data.github);

           
            const displayImage = document.getElementById('displayImage');
            const storedImage = localStorage.getItem('imageDataURL');
            if (displayImage) {
                displayImage.src = storedImage || '/public/images/placeholder.png';
            }

            const skillsContainer = document.getElementById('displaySkills');
            if (skillsContainer && data.skills) {
                skillsContainer.innerHTML = ''; 
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsContainer.appendChild(li);
                });
            }

            const experienceContainer = document.getElementById('displayExperience');
            if (experienceContainer && data.experience) {
                experienceContainer.innerHTML = ''; 
                data.experience.forEach(exp => {
                    const div = document.createElement('div');
                    div.className = 'experience-item';
                    div.innerHTML = `
                        <h3>${exp.title || ''} at ${exp.company || ''}</h3>
                        <p class="duration">${exp.duration || ''}</p>
                        <p>${exp.description || ''}</p>
                    `;
                    experienceContainer.appendChild(div);
                });
            }

            const projectContainer = document.getElementById('displayProjects');
            if (projectContainer && data.projects) {
                projectContainer.innerHTML = ''; 
                data.projects.forEach(project => {
                    const div = document.createElement('div');
                    div.className = 'project-item';
                    div.innerHTML = `
                        <h3>${project.title || ''}</h3>
                        <a href="${project.link || '#'}" target="_blank" rel="noopener noreferrer">View Project</a>
                        <p class="tech-stack">Tech Stack: ${project.techStack || ''}</p>
                        <p>${project.description || ''}</p>
                    `;
                    projectContainer.appendChild(div);
                });
            }
        
            const educationContainer = document.getElementById('displayEducation');
            if (educationContainer && data.education) {
            educationContainer.innerHTML = '';
            data.education.forEach(ed => {
                const div = document.createElement('div');
                div.className = 'education-item';
                div.innerHTML = `
                <h3>${ed.degree || ''} at ${ed.institution || ''}</h3>
                <p class="duration">${ed.duration || ''}</p>
                <p>${ed.description || ''}</p>
                `;
                educationContainer.appendChild(div);
            });
            }


        } catch (error) {
            console.error("Failed to load or parse portfolio data:", error);
        }
    };

    applyInitialTheme();
    populateData();

});
