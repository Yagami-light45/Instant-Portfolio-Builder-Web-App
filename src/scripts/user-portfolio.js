

// document.addEventListener("DOMContentLoaded", () => {
//   const toggleBtn = document.getElementById("menu-toggle");
//   const navLinks = document.getElementById("nav-links");
//   toggleBtn.addEventListener("click", () => {
//     navLinks.classList.toggle("show");
//   });

  
//   const themeToggle = document.getElementById("theme-toggle");
//   themeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("light-mode");

    
//     themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('portfolioData'));
  if (!data) return;


  document.getElementById('displayName').innerText = data.name;
  document.getElementById('displayProfession').innerText = data.profession;
  document.getElementById('displayBio').innerText = data.bio;
  document.getElementById('displayEmail').innerText = data.email;
  document.getElementById('displayLinkedIn').href = data.linkedin;
  document.getElementById('displayGithub').href = data.github;


  if (data.imageDataURL) {
    document.getElementById('displayImage').src = data.imageDataURL;
  } else {
    document.getElementById('displayImage').src = '../../public/images/placeholder.png';

  }


  const skillsContainer = document.getElementById('displaySkills');
  data.skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsContainer.appendChild(li);
  });


  const experienceContainer = document.getElementById('displayExperience');
  data.experience.forEach(exp => {
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `
      <h3>${exp.title} @ ${exp.company}</h3>
      <p class="duration">${exp.duration}</p>
      <p>${exp.description}</p>
    `;
    experienceContainer.appendChild(div);
  });


  const projectContainer = document.getElementById('displayProjects');
  data.projects.forEach(project => {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.innerHTML = `
      <h3>${project.title}</h3>
      <a href="${project.link}" target="_blank">View Project</a>
      <p class="tech-stack">Tech Stack: ${project.techStack}</p>
      <p>${project.description}</p>
    `;
    projectContainer.appendChild(div);
  });

 const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a'); 


hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
});
