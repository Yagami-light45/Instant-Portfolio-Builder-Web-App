const form = document.querySelector("#portfolioForm");

// Basic inputs
const userName = document.querySelector("#userName");
const userProfession = document.querySelector("#userProfession");
const userBio = document.querySelector("#userBio");
const userEmail = document.querySelector("#userEmail");
const userLinkedIn = document.querySelector("#userLinkedIn");
const userGithub = document.querySelector("#userGithub");
const userImage = document.querySelector("#userImage");

// Preview elements
const previewName = document.querySelector("#previewName");
const previewProfession = document.querySelector("#previewProfession");
const previewBio = document.querySelector("#previewBio");
const previewEmail = document.querySelector("#previewEmail");
const previewLinkedIn = document.querySelector("#previewLinkedIn");
const previewGithub = document.querySelector("#previewGithub");
const previewImage = document.querySelector("#previewImage");

// Skills
const skillsContainer = document.querySelector("#skillsContainer");
const addSkillBtn = document.querySelector("#addSkillBtn");
const previewSkills = document.querySelector("#previewSkills");

// Experience
const experienceContainer = document.querySelector("#experienceContainer");
const addExperienceBtn = document.querySelector("#addExperienceBtn");
const previewExperience = document.querySelector("#previewExperience");

// Projects
const projectsContainer = document.querySelector("#projectsContainer");
const addProjectBtn = document.querySelector("#addProjectBtn");
const previewProjects = document.querySelector("#previewProjects");

// Education
const educationContainer = document.querySelector("#educationContainer");
const addEducationBtn = document.querySelector("#addEducationBtn");
const previewEducation = document.querySelector("#previewEducation");

// Utility functions
function sanitizeInput(input) {
    if (!input) return '';
    return input.trim().replace(/[<>]/g, '');
}

function isValidURL(string) {
    if (!string) return false;
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function updateBasicInfo() {
    const name = sanitizeInput(userName.value);
    const profession = sanitizeInput(userProfession.value);
    const bio = sanitizeInput(userBio.value);
    const email = sanitizeInput(userEmail.value);
    const linkedin = sanitizeInput(userLinkedIn.value);
    const github = sanitizeInput(userGithub.value);

    previewName.textContent = name || "Your Name";
    previewProfession.textContent = profession || "Your Profession";
    previewBio.textContent = bio || "A brief description about yourself will appear here.";

    if (email && isValidEmail(email)) {
        previewEmail.textContent = email;
        previewEmail.style.color = '';
    } else if (email) {
        previewEmail.textContent = email + " (Invalid email)";
        previewEmail.style.color = '#ff6b6b';
    } else {
        previewEmail.textContent = "your.email@example.com";
        previewEmail.style.color = '';
    }

    if (linkedin && isValidURL(linkedin)) {
        previewLinkedIn.href = linkedin;
        previewLinkedIn.textContent = "LinkedIn Profile";
        previewLinkedIn.style.color = '';
    } else if (linkedin) {
        previewLinkedIn.href = "#";
        previewLinkedIn.textContent = "LinkedIn Profile (Invalid URL)";
        previewLinkedIn.style.color = '#ff6b6b';
    } else {
        previewLinkedIn.href = "#";
        previewLinkedIn.textContent = "LinkedIn Profile";
        previewLinkedIn.style.color = '';
    }

    if (github && isValidURL(github)) {
        previewGithub.href = github;
        previewGithub.textContent = "GitHub Profile";
        previewGithub.style.color = '';
    } else if (github) {
        previewGithub.href = "#";
        previewGithub.textContent = "GitHub Profile (Invalid URL)";
        previewGithub.style.color = '#ff6b6b';
    } else {
        previewGithub.href = "#";
        previewGithub.textContent = "GitHub Profile";
        previewGithub.style.color = '';
    }
}

function updateSkills() {
    previewSkills.innerHTML = "";
    const skillInputs = skillsContainer.querySelectorAll(".skill-input");
    let hasSkills = false;

    skillInputs.forEach((input) => {
        const skill = sanitizeInput(input.value);
        if (skill) {
            hasSkills = true;
            const li = document.createElement("li");
            li.textContent = skill;
            previewSkills.appendChild(li);
        }
    });

    if (!hasSkills) {
        previewSkills.innerHTML = '<li style="color: #888;">No skills added yet</li>';
    }
}

function updateExperience() {
    previewExperience.innerHTML = "";
    const experiences = experienceContainer.querySelectorAll(".experience-item");
    let hasExperience = false;

    experiences.forEach((exp) => {
        const title = sanitizeInput(exp.querySelector(".experience-title")?.value);
        const company = sanitizeInput(exp.querySelector(".experience-company")?.value);
        const duration = sanitizeInput(exp.querySelector(".experience-duration")?.value);
        const description = sanitizeInput(exp.querySelector(".experience-description")?.value);

        if (title || company || duration || description) {
            hasExperience = true;
            const div = document.createElement("div");
            div.classList.add("preview-experience-item");
            
            const jobTitle = title || "Untitled Position";
            const companyName = company || "Company Name";
            const jobDuration = duration || "Duration not specified";
            const jobDescription = description || "No description provided.";

            div.innerHTML = `
                <h5>${jobTitle} at ${companyName}</h5>
                <p class="duration">${jobDuration}</p>
                <p>${jobDescription}</p>
            `;
            previewExperience.appendChild(div);
        }
    });

    if (!hasExperience) {
        previewExperience.innerHTML = `
            <div class="preview-experience-item">
                <h5>No experience added yet</h5>
                <p class="duration">Add your work experience above</p>
                <p>Your professional experience will appear here.</p>
            </div>
        `;
    }
}

function updateProjects() {
    previewProjects.innerHTML = "";
    const projects = projectsContainer.querySelectorAll(".project-item");
    let hasProjects = false;

    projects.forEach((proj) => {
        const title = sanitizeInput(proj.querySelector(".project-title")?.value);
        const link = sanitizeInput(proj.querySelector(".project-link")?.value);
        const techstack = sanitizeInput(proj.querySelector(".project-techstack")?.value);
        const description = sanitizeInput(proj.querySelector(".project-description")?.value);

        if (title || link || techstack || description) {
            hasProjects = true;
            const div = document.createElement("div");
            div.classList.add("preview-project-item");
            
            const projectTitle = title || "Untitled Project";
            const projectDescription = description || "No description provided.";
            
            let linkHTML = '';
            if (link && isValidURL(link)) {
                linkHTML = `<a href="${link}" target="_blank" rel="noopener noreferrer">View Project</a>`;
            } else if (link) {
                linkHTML = `<span style="color: #ff6b6b;">Invalid URL: ${link}</span>`;
            }

            let techStackHTML = '';
            if (techstack) {
                techStackHTML = `<p class="tech-stack">Tech Stack: ${techstack}</p>`;
            }


            div.innerHTML = `
                <h5>${projectTitle}</h5>
                ${linkHTML}
                ${techStackHTML}
                <p>${projectDescription}</p>
            `;
            previewProjects.appendChild(div);
        }
    });

    if (!hasProjects) {
        previewProjects.innerHTML = `
            <div class="preview-project-item">
                <h5>No projects added yet</h5>
                <p class="tech-stack">Add your projects above</p>
                <p>Your projects will appear here.</p>
            </div>
        `;
    }
}

function updateEducation() {
    previewEducation.innerHTML = "";
    const items = educationContainer.querySelectorAll(".education-item");
    let hasEducation = false;

    items.forEach((item) => {
        const inst = sanitizeInput(item.querySelector(".education-institution")?.value);
        const deg = sanitizeInput(item.querySelector(".education-degree")?.value);
        const dur = sanitizeInput(item.querySelector(".education-duration")?.value);
        const descr = sanitizeInput(item.querySelector(".education-description")?.value);

        if (inst || deg || dur || descr) {
            hasEducation = true;
            const div = document.createElement("div");
            div.classList.add("preview-education-item");
            
            const degree = deg || "Degree";
            const institution = inst || "Institution";
            const duration = dur || "Duration not specified";
            const description = descr || "No additional details.";

            div.innerHTML = `
                <h5>${degree} at ${institution}</h5>
                <p class="duration">${duration}</p>
                <p>${description}</p>
            `;
            previewEducation.appendChild(div);
        }
    });

    if (!hasEducation) {
        previewEducation.innerHTML = `
            <div class="preview-education-item">
                <h5>No education added yet</h5>
                <p class="duration">Add your education details above</p>
                <p>Your educational background will appear here.</p>
            </div>
        `;
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file || !previewImage) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        event.target.value = "";
        return;
    }

    if (file.size > 3 * 1024 * 1024) {
        alert("File size is too large. Please select an image smaller than 3MB.");
        event.target.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        previewImage.src = e.target.result;
        localStorage.setItem("imageDataURL", e.target.result);
    };
    reader.onerror = function () {
        alert("Error reading file. Please try again.");
    };
    reader.readAsDataURL(file);
}

// Add button logic
function addSkill() {
    const wrapper = document.createElement("div");
    wrapper.className = "skill-item form-group";
    wrapper.innerHTML = `
        <input type="text" class="skill-input" placeholder="e.g., HTML" maxlength="50">
        <button type="button" class="remove-skill-btn">Remove</button>
    `;
    skillsContainer.appendChild(wrapper);
    
    const newInput = wrapper.querySelector(".skill-input");
    if (newInput) {
        newInput.focus();
        newInput.addEventListener("input", updateSkills);
    }
}

function addExperience() {
    const wrapper = document.createElement("div");
    wrapper.className = "experience-item form-group";
    wrapper.innerHTML = `
        <input type="text" class="experience-title" placeholder="Job Title" maxlength="100">
        <input type="text" class="experience-company" placeholder="Company" maxlength="100">
        <input type="text" class="experience-duration" placeholder="e.g., Jan 2020 - Dec 2022" maxlength="50">
        <textarea class="experience-description" rows="3" placeholder="Responsibilities and achievements..." maxlength="500"></textarea>
        <button type="button" class="remove-experience-btn">Remove</button>
    `;
    experienceContainer.appendChild(wrapper);
    
    const firstInput = wrapper.querySelector(".experience-title");
    if (firstInput) firstInput.focus();
    
    wrapper.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", updateExperience);
    });
}

function addProject() {
    const wrapper = document.createElement("div");
    wrapper.className = "project-item form-group";
    wrapper.innerHTML = `
        <input type="text" class="project-title" placeholder="Project Title" maxlength="100">
        <input type="url" class="project-link" placeholder="Project URL (optional)">
        <input type="text" class="project-techstack" placeholder="Tech Stack (e.g., React, Node.js)" maxlength="200">
        <textarea class="project-description" rows="3" placeholder="Brief description of the project..." maxlength="500"></textarea>
        <button type="button" class="remove-project-btn">Remove</button>
    `;
    projectsContainer.appendChild(wrapper);
    
    const firstInput = wrapper.querySelector(".project-title");
    if (firstInput) firstInput.focus();
    
    wrapper.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", updateProjects);
    });
}

function addEducation() {
    const wrapper = document.createElement("div");
    wrapper.className = "education-item form-group";
    wrapper.innerHTML = `
        <input type="text" class="education-institution" placeholder="Institution Name" maxlength="100">
        <input type="text" class="education-degree" placeholder="Degree (e.g., B.Sc Computer Science)" maxlength="100">
        <input type="text" class="education-duration" placeholder="e.g., 2018 – 2022" maxlength="50">
        <textarea class="education-description" rows="2" placeholder="Notes, GPA, honors..." maxlength="300"></textarea>
        <button type="button" class="remove-education-btn">Remove</button>
    `;
    educationContainer.appendChild(wrapper);
    
    const firstInput = wrapper.querySelector(".education-institution");
    if (firstInput) firstInput.focus();
    
    wrapper.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", updateEducation);
    });
}

// Event Listeners
form.addEventListener("input", () => {
    updateBasicInfo();
    updateSkills();
    updateExperience();
    updateProjects();
    updateEducation();
});

userImage.addEventListener("change", handleImageUpload);

addSkillBtn.addEventListener("click", addSkill);
addExperienceBtn.addEventListener("click", addExperience);
addProjectBtn.addEventListener("click", addProject);
addEducationBtn.addEventListener("click", addEducation);

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-skill-btn")) {
        const skillsCount = skillsContainer?.querySelectorAll(".skill-item").length || 0;
        if (skillsCount > 1) {
            e.target.parentElement.remove();
            updateSkills();
        } else {
            alert("At least one skill field must remain.");
        }
    } else if (e.target.classList.contains("remove-experience-btn")) {
        const experienceCount = experienceContainer?.querySelectorAll(".experience-item").length || 0;
        if (experienceCount > 1) {
            e.target.parentElement.remove();
            updateExperience();
        } else {
            alert("At least one experience field must remain.");
        }
    } else if (e.target.classList.contains("remove-project-btn")) {
        const projectsCount = projectsContainer?.querySelectorAll(".project-item").length || 0;
        if (projectsCount > 1) {
            e.target.parentElement.remove();
            updateProjects();
        } else {
            alert("At least one project field must remain.");
        }
    } else if (e.target.classList.contains("remove-education-btn")) {
        const educationCount = educationContainer?.querySelectorAll(".education-item").length || 0;
        if (educationCount > 1) {
            e.target.parentElement.remove();
            updateEducation();
        } else {
            alert("At least one education field must remain.");
        }
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    if (!userName.value.trim()) {
        alert("Please enter your name.");
        userName.focus();
        return;
    }

    const userData = {
        name: sanitizeInput(userName.value),
        profession: sanitizeInput(userProfession.value || ''),
        bio: sanitizeInput(userBio.value || ''),
        email: sanitizeInput(userEmail.value || ''),
        linkedin: sanitizeInput(userLinkedIn.value || ''),
        github: sanitizeInput(userGithub.value || ''),
        skills: [...document.querySelectorAll(".skill-input")]
            .map(input => sanitizeInput(input.value))
            .filter(skill => skill),
        experience: [...document.querySelectorAll(".experience-item")].map(item => ({
            title: sanitizeInput(item.querySelector(".experience-title")?.value || ''),
            company: sanitizeInput(item.querySelector(".experience-company")?.value || ''),
            duration: sanitizeInput(item.querySelector(".experience-duration")?.value || ''),
            description: sanitizeInput(item.querySelector(".experience-description")?.value || '')
        })).filter(exp => exp.title || exp.company || exp.duration || exp.description),
        projects: [...document.querySelectorAll(".project-item")].map(item => ({
            title: sanitizeInput(item.querySelector(".project-title")?.value || ''),
            link: sanitizeInput(item.querySelector(".project-link")?.value || ''),
            techStack: sanitizeInput(item.querySelector(".project-techstack")?.value || ''),
            description: sanitizeInput(item.querySelector(".project-description")?.value || '')
        })).filter(proj => proj.title || proj.link || proj.techStack || proj.description),
        education: [...document.querySelectorAll(".education-item")].map(item => ({
            institution: sanitizeInput(item.querySelector(".education-institution")?.value || ''),
            degree: sanitizeInput(item.querySelector(".education-degree")?.value || ''),
            duration: sanitizeInput(item.querySelector(".education-duration")?.value || ''),
            description: sanitizeInput(item.querySelector(".education-description")?.value || '')
        })).filter(edu => edu.institution || edu.degree || edu.duration || edu.description)
    };

    localStorage.setItem("portfolioData", JSON.stringify(userData));
    // Image is already stored in handleImageUpload
    window.location.href = "../pages/user-portfolio.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const resetBtn = document.getElementById("resetBtn");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("nav-links");

    // Initialize theme
    const isLightMode = localStorage.getItem('lightMode') === 'true';
    if (isLightMode) {
        document.body.classList.add("light-mode");
        if (themeToggle) themeToggle.textContent = "🌙 Dark Mode";
    } else {
        document.body.classList.remove("light-mode");
        if (themeToggle) themeToggle.textContent = "☀ Light Mode";
    }

    // Initialize image
    const storedImage = localStorage.getItem("imageDataURL");
    if (previewImage) {
        previewImage.src = storedImage || "/public/images/placeholder.png";
    }

    themeToggle?.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const isLightMode = document.body.classList.contains("light-mode");
        localStorage.setItem('lightMode', isLightMode ? 'true' : 'false');
        themeToggle.textContent = isLightMode ? "🌙 Dark Mode" : "☀ Light Mode";
    });

    menuToggle?.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    resetBtn?.addEventListener("click", () => {
        if (!confirm("Are you sure you want to reset all data? This action cannot be undone.")) {
            return;
        }

        if (form) form.reset();
        previewName.textContent = "Your Name";
        previewProfession.textContent = "Your Profession";
        previewBio.textContent = "A brief description about yourself will appear here.";
        previewEmail.textContent = "your.email@example.com";
        previewLinkedIn.href = "#";
        previewLinkedIn.textContent = "LinkedIn Profile";
        previewGithub.href = "#";
        previewGithub.textContent = "GitHub Profile";
        previewImage.src = "/public/images/placeholder.png";
        userImage.value = "";

        previewSkills.innerHTML = `
            <li style="color: #888;">No skills added yet</li>
        `;
        previewExperience.innerHTML = `
            <div class="preview-experience-item">
                <h5>No experience added yet</h5>
                <p class="duration">Add your work experience above</p>
                <p>Your professional experience will appear here.</p>
            </div>`;
        previewProjects.innerHTML = `
            <div class="preview-project-item">
                <h5>No projects added yet</h5>
                <p class="tech-stack">Add your projects above</p>
                <p>Your projects will appear here.</p>
            </div>`;
        previewEducation.innerHTML = `
            <div class="preview-education-item">
                <h5>No education added yet</h5>
                <p class="duration">Add your education details above</p>
                <p>Your educational background will appear here.</p>
            </div>`;

        skillsContainer.innerHTML = `
            <div class="skill-item form-group">
                <input type="text" class="skill-input" placeholder="e.g., HTML" maxlength="50">
                <button type="button" class="remove-skill-btn">Remove</button>
            </div>
        `;
        experienceContainer.innerHTML = `
            <div class="experience-item form-group">
                <input type="text" class="experience-title" placeholder="Job Title" maxlength="100">
                <input type="text" class="experience-company" placeholder="Company" maxlength="100">
                <input type="text" class="experience-duration" placeholder="e.g., Jan 2020 - Dec 2022" maxlength="50">
                <textarea class="experience-description" rows="3" placeholder="Responsibilities and achievements..." maxlength="500"></textarea>
                <button type="button" class="remove-experience-btn">Remove</button>
            </div>
        `;
        projectsContainer.innerHTML = `
            <div class="project-item form-group">
                <input type="text" class="project-title" placeholder="Project Title" maxlength="100">
                <input type="url" class="project-link" placeholder="Project URL (optional)">
                <input type="text" class="project-techstack" placeholder="Tech Stack (e.g., React, Node.js)" maxlength="200">
                <textarea class="project-description" rows="3" placeholder="Brief description of the project..." maxlength="500"></textarea>
                <button type="button" class="remove-project-btn">Remove</button>
            </div>
        `;
        educationContainer.innerHTML = `
            <div class="education-item form-group">
                <input type="text" class="education-institution" placeholder="Institution Name" maxlength="100">
                <input type="text" class="education-degree" placeholder="Degree (e.g., B.Sc Computer Science)" maxlength="100">
                <input type="text" class="education-duration" placeholder="e.g., 2018 – 2022" maxlength="50">
                <textarea class="education-description" rows="2" placeholder="Notes, GPA, honors..." maxlength="300"></textarea>
                <button type="button" class="remove-education-btn">Remove</button>
            </div>
        `;

        localStorage.removeItem("portfolioData");
        localStorage.removeItem("imageDataURL");

        // Reattach input event listeners for new fields
        skillsContainer.querySelectorAll(".skill-input").forEach(input => input.addEventListener("input", updateSkills));
        experienceContainer.querySelectorAll("input, textarea").forEach(input => input.addEventListener("input", updateExperience));
        projectsContainer.querySelectorAll("input, textarea").forEach(input => input.addEventListener("input", updateProjects));
        educationContainer.querySelectorAll("input, textarea").forEach(input => input.addEventListener("input", updateEducation));
    });
});
