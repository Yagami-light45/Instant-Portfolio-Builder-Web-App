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

function updateBasicInfo() {
  previewName.innerText = userName.value || "Your Name";
  previewProfession.innerText = userProfession.value || "Your Profession";
  previewBio.innerText = userBio.value || "A brief description about yourself will appear here.";
  previewEmail.innerText = userEmail.value || "Not provided";
  previewLinkedIn.href = userLinkedIn.value || "#";
  previewLinkedIn.innerText = userLinkedIn.value ? "LinkedIn Profile" : "Not provided";
  previewGithub.href = userGithub.value || "#";
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
        <h5>${title || "Untitled"} at ${company || "Company"}</h5>
        <p class="duration">${duration || "Duration not specified"}</p>
        <p>${description || "No description provided."}</p>
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

function updateEducation() {
  previewEducation.innerHTML = "";
  const items = educationContainer.querySelectorAll(".education-item");
  items.forEach((item) => {
    const inst = item.querySelector(".education-institution").value.trim();
    const deg = item.querySelector(".education-degree").value.trim();
    const dur = item.querySelector(".education-duration").value.trim();
    const descr = item.querySelector(".education-description").value.trim();
    if (inst || deg || dur || descr) {
      const div = document.createElement("div");
      div.classList.add("preview-education-item");
      div.innerHTML = `
        <h5>${deg || "Degree"} at ${inst || "Institution"}</h5>
        <p class="duration">${dur || "Duration not specified"}</p>
        <p>${descr || "No additional details."}</p>
      `;
      previewEducation.appendChild(div);
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
  //ADD BUTTONS LOGIC
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

function addEducation() {
  const wrapper = document.createElement("div");
  wrapper.className = "education-item form-group";
  wrapper.innerHTML = `
    <input type="text" class="education-institution" placeholder="Institution Name">
    <input type="text" class="education-degree" placeholder="Degree (e.g., B.Sc Computer Science)">
    <input type="text" class="education-duration" placeholder="e.g., 2018 – 2022">
    <textarea class="education-description" rows="2" placeholder="Notes, GPA, honors..."></textarea>
    <button type="button" class="remove-education-btn">Remove</button>
  `;
  educationContainer.appendChild(wrapper);
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
    e.target.parentElement.remove();
    updateSkills();
  } else if (e.target.classList.contains("remove-experience-btn")) {
    e.target.parentElement.remove();
    updateExperience();
  } else if (e.target.classList.contains("remove-project-btn")) {
    e.target.parentElement.remove();
    updateProjects();
  } else if (e.target.classList.contains("remove-education-btn")) {
    e.target.parentElement.remove();
    updateEducation();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const file = userImage.files[0];
  const oldImage = localStorage.getItem("imageDataURL") || "/public/images/placeholder.png";

  const collectAndSave = (imageDataURL) => {
    const userData = {
      name: userName.value,
      profession: userProfession.value,
      bio: userBio.value,
      email: userEmail.value,
      linkedin: userLinkedIn.value,
      github: userGithub.value,
      skills: [...document.querySelectorAll(".skill-input")].map((input) => input.value),
      experience: [...document.querySelectorAll(".experience-item")].map((item) => ({
        title: item.querySelector(".experience-title").value,
        company: item.querySelector(".experience-company").value,
        duration: item.querySelector(".experience-duration").value,
        description: item.querySelector(".experience-description").value,
      })),
      projects: [...document.querySelectorAll(".project-item")].map((item) => ({
        title: item.querySelector(".project-title").value,
        link: item.querySelector(".project-link").value,
        techStack: item.querySelector(".project-techstack").value,
        description: item.querySelector(".project-description").value,
      })),
      education: [...document.querySelectorAll(".education-item")].map((item) => ({
        institution: item.querySelector(".education-institution").value,
        degree: item.querySelector(".education-degree").value,
        duration: item.querySelector(".education-duration").value,
        description: item.querySelector(".education-description").value,
      })),
    };

    localStorage.setItem("portfolioData", JSON.stringify(userData));
    localStorage.setItem("imageDataURL", imageDataURL);
    window.location.href = "../pages/user-portfolio.html";
  };

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => collectAndSave(e.target.result);
    reader.readAsDataURL(file);
  } else {
    collectAndSave(oldImage);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const resetBtn = document.getElementById("resetBtn");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("nav-links");

  const storedImage = localStorage.getItem("imageDataURL");
  previewImage.src = storedImage || "/public/images/placeholder.png";

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  resetBtn?.addEventListener("click", () => {
    if (form) form.reset();
    previewName.textContent = "Your Name";
    previewProfession.textContent = "Your Profession";
    previewBio.textContent = "A brief description about yourself will appear here.";
    previewSkills.innerHTML = `<li>Skill-1</li><li>Skill-2</li><li>Skill-3</li>`;
    previewExperience.innerHTML = `
      <div class="preview-experience-item">
        <h5>Job Title at Company</h5>
        <p class="duration">Jan 20XX - Dec 20YY</p>
        <p>Responsibilities and achievements...</p>
      </div>`;
    previewProjects.innerHTML = `
      <div class="preview-project-item">
        <h5>Project Title</h5>
        <a href="#" target="_blank">Project Link</a>
        <p class="tech-stack">Tech Stack: React, Node.js</p>
        <p>Brief description of the project...</p>
      </div>`;
    previewEmail.textContent = "your.email@example.com";
    previewLinkedIn.href = "#";
    previewLinkedIn.textContent = "LinkedIn Profile";
    previewGithub.href = "#";
    previewGithub.textContent = "GitHub Profile";
    previewImage.src = "/public/images/placeholder.png";
    localStorage.setItem("imageDataURL", "/public/images/placeholder.png");
    userImage.value = "";
  });
});