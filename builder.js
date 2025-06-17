
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

// Update Functions
function updateBasicInfo() {
  previewName.innerText = userName.value || "Your Name";
  previewProfession.innerText = userProfession.value || "Your Profession";
  previewBio.innerText = userBio.value || "A brief description about yourself will appear here.";
  previewEmail.innerText = userEmail.value;
  previewLinkedIn.href = userLinkedIn.value;
  previewLinkedIn.innerText = userLinkedIn.value ? "LinkedIn Profile" : "Not provided";
  previewGithub.href = userGithub.value;
  previewGithub.innerText = userGithub.value ? "GitHub Profile" : "Not provided";
}

function updateSkills() {
  previewSkills.innerHTML = "";
  const skillInputs = skillsContainer.querySelectorAll(".skill-input");
  skillInputs.forEach((input) => {
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.innerText = input.value.trim();
      previewSkills.appendChild(li);
    }
  });
}

function updateExperience() {
  previewExperience.innerHTML = "";
  const experiences = experienceContainer.querySelectorAll(".experience-item");
  experiences.forEach((exp) => {
    const title = exp.querySelector(".experience-title").value;
    const company = exp.querySelector(".experience-company").value;
    const duration = exp.querySelector(".experience-duration").value;
    const description = exp.querySelector(".experience-description").value;

    if (title || company || duration || description) {
      const div = document.createElement("div");
      div.classList.add("preview-experience-item");
      div.innerHTML = `
        <h5>${title} at ${company}</h5>
        <p class="duration">${duration}</p>
        <p>${description}</p>
      `;
      previewExperience.appendChild(div);
    }
  });
}

function updateProjects() {
  previewProjects.innerHTML = "";
  const projects = projectsContainer.querySelectorAll(".project-item");
  projects.forEach((proj) => {
    const title = proj.querySelector(".project-title").value;
    const link = proj.querySelector(".project-link").value;
    const techstack = proj.querySelector(".project-techstack").value;
    const description = proj.querySelector(".project-description").value;

    if (title || link || techstack || description) {
      const div = document.createElement("div");
      div.classList.add("preview-project-item");
      div.innerHTML = `
        <h5>${title || "Untitled Project"}</h5>
        ${link ? `<a href="${link}" target="_blank">Project Link</a>` : ""}
        ${techstack ? `<p class="tech-stack">Tech Stack: ${techstack}</p>` : ""}
        <p>${description || "No description provided."}</p>
      `;
      previewProjects.appendChild(div);
    }
  });
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      localStorage.setItem("imageDataURL", e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

//Dynamic Add/Remove Fields
function addSkill() {
  const wrapper = document.createElement("div");
  wrapper.className = "skill-item form-group";
  wrapper.innerHTML = `
    <input type="text" class="skill-input" placeholder="e.g., HTML">
    <button type="button" class="remove-skill-btn">Remove</button>
  `;
  skillsContainer.appendChild(wrapper);
}

function addExperience() {
  const wrapper = document.createElement("div");
  wrapper.className = "experience-item form-group";
  wrapper.innerHTML = `
    <input type="text" class="experience-title" placeholder="Job Title">
    <input type="text" class="experience-company" placeholder="Company">
    <input type="text" class="experience-duration" placeholder="e.g., Jan 2020 - Dec 2022">
    <textarea class="experience-description" rows="3" placeholder="Responsibilities and achievements..."></textarea>
    <button type="button" class="remove-experience-btn">Remove</button>
  `;
  experienceContainer.appendChild(wrapper);
}

function addProject() {
  const wrapper = document.createElement("div");
  wrapper.className = "project-item form-group";
  wrapper.innerHTML = `
    <input type="text" class="project-title" placeholder="Project Title">
    <input type="url" class="project-link" placeholder="Project URL (optional)">
    <input type="text" class="project-techstack" placeholder="Tech Stack (e.g., React, Node.js)">
    <textarea class="project-description" rows="3" placeholder="Brief description of the project..."></textarea>
    <button type="button" class="remove-project-btn">Remove</button>
  `;
  projectsContainer.appendChild(wrapper);
}

// Event Listeners
form.addEventListener("input", () => {
  updateBasicInfo();
  updateSkills();
  updateExperience();
  updateProjects();
});

userImage.addEventListener("change", handleImageUpload);

addSkillBtn.addEventListener("click", () => {
  addSkill();
});

addExperienceBtn.addEventListener("click", () => {
  addExperience();
});

addProjectBtn.addEventListener("click", () => {
  addProject();
});

// removal for dynamic buttons
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-skill-btn")) {
    e.target.parentElement.remove();
    updateSkills();
  } else if (e.target.classList.contains("remove-experience-btn")) {
    e.target.parentElement.remove();
    updateExperience();
  } else if (e.target.classList.contains("remove-project-btn")) {
    e.target.parentElement.remove();
    updateProjects();
  }
});
document.getElementById('portfolioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const file = document.getElementById('userImage').files[0];
  const oldImage = localStorage.getItem("imageDataURL") || "placeholder.png";

  const collectAndSave = (imageDataURL) => {
    const userData = {
      name: userName.value,
      profession: userProfession.value,
      bio: userBio.value,
      email: userEmail.value,
      linkedin: userLinkedIn.value,
      github: userGithub.value,
      imageDataURL,
      skills: [...document.querySelectorAll('.skill-input')].map(input => input.value),
      experience: [...document.querySelectorAll('.experience-item')].map(item => ({
        title: item.querySelector('.experience-title').value,
        company: item.querySelector('.experience-company').value,
        duration: item.querySelector('.experience-duration').value,
        description: item.querySelector('.experience-description').value
      })),
      projects: [...document.querySelectorAll('.project-item')].map(item => ({
        title: item.querySelector('.project-title').value,
        link: item.querySelector('.project-link').value,
        techStack: item.querySelector('.project-techstack').value,
        description: item.querySelector('.project-description').value
      }))
    };

    localStorage.setItem('portfolioData', JSON.stringify(userData));
    localStorage.setItem('imageDataURL', imageDataURL); 
    window.location.href = 'user-portfolio.html';
  };

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      collectAndSave(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    collectAndSave(oldImage);
  }
});
