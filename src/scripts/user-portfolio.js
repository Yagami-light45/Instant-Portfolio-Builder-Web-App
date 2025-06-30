document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const downloadOptions = document.querySelector('.download-options');
  const downloadBtn = document.querySelector('.download-btn');
  const downloadMenu = document.querySelector('.download-menu');

  // Theme (Dark Mode) Logic
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

  // Hamburger Menu Logic
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

  // Download Options Logic
  if (downloadBtn && downloadMenu) {
    downloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = downloadOptions.classList.toggle('active');
      downloadBtn.setAttribute('aria-expanded', isActive);
    });

    document.addEventListener('click', (e) => {
      if (!downloadOptions.contains(e.target)) {
        downloadOptions.classList.remove('active');
        downloadBtn.setAttribute('aria-expanded', 'false');
      }
    });

    const downloadLinks = document.querySelectorAll('.download-menu a');
    downloadLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const data = JSON.parse(localStorage.getItem('portfolioData')) || {};
        downloadOptions.classList.remove('active');
        downloadBtn.setAttribute('aria-expanded', 'false');

        if (link.id === 'download-resume') {
          generateResumePDF(data);
        } else if (link.id === 'download-bundle') {
          generateStaticBundle(data);
        }
      });
    });
  }

  // Dynamic Data Population
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

function checkPageOverflow(doc, y) {
  const pageHeight = 270; 
  if (y > pageHeight) {
    doc.addPage();
    return 20; 
  }
  return y;
}

// generate Resume PDF
function generateResumePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(data.name || 'Your Name', 105, y, { align: 'center' });
  y += 10;

  // Job title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(16);
  doc.text(data.profession || 'Your Profession', 105, y, { align: 'center' });
  y += 10;

  // Contact information
  doc.setFontSize(12);
  const contactLines = [
    data.email ? `Email: ${data.email}` : '',
    data.linkedin ? `LinkedIn: ${data.linkedin}` : '',
    data.github ? `GitHub: ${data.github}` : ''
  ].filter(line => line !== '');
  contactLines.forEach(line => {
    y = checkPageOverflow(doc, y);
    doc.text(line, 20, y);
    y += 10;
  });
  y += 10;

  // About Me
  if (data.bio) {
    y = checkPageOverflow(doc, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('About Me', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const bioLines = doc.splitTextToSize(data.bio, 170);
    bioLines.forEach(line => {
      y = checkPageOverflow(doc, y);
      doc.text(line, 20, y);
      y += 10;
    });
    y += 10;
  }

  // Skills
  if (data.skills?.length) {
    y = checkPageOverflow(doc, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Skills', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const skillsText = data.skills.join(', ');
    const skillsLines = doc.splitTextToSize(skillsText, 170);
    skillsLines.forEach(line => {
      y = checkPageOverflow(doc, y);
      doc.text(line, 20, y);
      y += 10;
    });
    y += 10;
  }

  // Experience
  if (data.experience?.length) {
    y = checkPageOverflow(doc, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Experience', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    data.experience.forEach(exp => {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(`${exp.title || ''} at ${exp.company || ''}`, 20, y);
      y += 10;
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'normal');
      doc.text(exp.duration || '', 20, y);
      y += 10;
      if (exp.description) {
        const descLines = doc.splitTextToSize(exp.description, 170);
        descLines.forEach(line => {
          y = checkPageOverflow(doc, y);
          doc.text(line, 20, y);
          y += 10;
        });
      }
      y += 10;
    });
  }

  // Education
  if (data.education?.length) {
    y = checkPageOverflow(doc, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Education', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    data.education.forEach(ed => {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(`${ed.degree || ''} at ${ed.institution || ''}`, 20, y);
      y += 10;
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'normal');
      doc.text(ed.duration || '', 20, y);
      y += 10;
      if (ed.description) {
        const descLines = doc.splitTextToSize(ed.description, 170);
        descLines.forEach(line => {
          y = checkPageOverflow(doc, y);
          doc.text(line, 20, y);
          y += 10;
        });
      }
      y += 10;
    });
  }

  // Projects
  if (data.projects?.length) {
    y = checkPageOverflow(doc, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Projects', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    data.projects.forEach(project => {
      y = checkPageOverflow(doc, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(project.title || '', 20, y);
      y += 10;
      if (project.link) {
        y = checkPageOverflow(doc, y);
        doc.text(`Link: ${project.link}`, 20, y);
        y += 10;
      }
      if (project.techStack) {
        y = checkPageOverflow(doc, y);
        doc.text(`Tech Stack: ${project.techStack}`, 20, y);
        y += 10;
      }
      if (project.description) {
        const descLines = doc.splitTextToSize(project.description, 170);
        descLines.forEach(line => {
          y = checkPageOverflow(doc, y);
          doc.text(line, 20, y);
          y += 10;
        });
      }
      y += 10;
    });
  }

  doc.save('resume.pdf');
}

  // generate Static Bundle
  function generateStaticBundle(data) {
    const zip = new JSZip();

    let htmlContent = document.documentElement.outerHTML;
    const storedImage = localStorage.getItem('imageDataURL');
    if (storedImage) {
      htmlContent = htmlContent.replace(/src="[^"]*" alt="Profile"/, `src="${storedImage}" alt="Profile"`);
    }

    zip.file('index.html', htmlContent);

    zip.file('styles/user-portfolio.css', `* {
  margin: 0;
  padding: 0;
}

body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: url('../../public/images/bgblur.png');
    background-color: #f4f4f4;
    background-attachment: fixed;
    scroll-behavior: smooth;
    color: #333;
    transition: background-color 0.8s ease, color 0.8s ease, background-image 0.8s ease;
}

.container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

p {
    overflow-wrap: break-word;
    word-wrap: break-word;
}

#about, #skills, #experience, #projects, #contact, #education {
    scroll-margin-top: 6rem;
}

.education-item {
    padding: 2rem ;
    margin-bottom: 1.5rem;
}

#education h2{
    padding-top: 1.5rem;
}

.education-item h3 {
    margin: 0 0 0.3rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #0056b3;
}

.glass-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(7px);
  -webpkit-backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 0.8rem 0;
  transition: background-color 0.8s ease, border-color 0.8s ease;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  transition: color 0.8s ease;
  flex-shrink: 0;
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  margin: 0;
  padding: 0;
  flex-grow: 1;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #007BFF;
}

.navbar-buttons {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
}

.download-options {
  position: relative;
}

.download-btn {
  display: none;

}

.download-btn:hover {
  display: none;
}

.download-menu {
  display: none;
}

.download-menu a {
  display: none;
}

.dark-mode-toggle {
    display: none;
}

    




.hamburger {
  display: none;
  background: none;
  border: none;
  fontczyn-size: 1.5rem;
  color: #2c3e50;
  cursor: pointer;
  transition: color 0.8s ease;
}

.profile {
    text-align: center;
    margin-top: 6rem;
    border-radius: 10px;
}

.profile img {
    border<|control498|>-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: border-color 0.8s ease;
}

.subtitle {
    color: #555;
    font-size: 1.2rem;
    transition: color 0.8s ease;
}

section {
    margin-bottom: 2rem;
    padding: 0.75rem 2rem 2rem 2rem;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    transition: background-color 0.8s ease, border-color 0.8s ease;
}

section h2 {
    border-bottom: 2px solid #007BFF;
    transition: border-color 0.8s ease;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0;
}

.skills li {
    list-style: none;
    background: #0070f3;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 500;
    transition: background-color 0.8s ease;
}

.experience-item h3, .project-item h3 , .education-item h3 {
    color: #0056b3;
    transition: color 0.8s ease;
}

.duration {
    font-style | italic;
    color: #666;
    margin-bottom: 0.5rem;
    transition: color 0.8s ease;
}

.project-item a {
    color: #007BFF;
    transition: color 0.8s ease;
}

.tech-stack {
    color: #555;
    transition: color 0.8s ease;
}

.footer {
  margin-top : 5rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    text-align: center;
    transition: background-color 0.8s ease, border-color 0.8s ease, color 0.8s ease;
}

.footer-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 0;
}

.footer-links {
    margin: 0.5rem 0;
}

.footer-links a {
    margin: 0 1rem;
    font-size: 1.4rem;
    color: #333;
    transition: color 0.3s ease, transform 0.3s ease;
}

.footer-links a:hover {
    color: #007BFF;
    transform: scale(1.1);
}

.footer-note {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #555;
    transition: color 0.8s ease;
}

body.dark-mode {
    background-color: #0f1624;
    background-image: url('../../public/images/bgblur.png');
    color: #ffffff;
}

body.dark-mode .glass-navbar {
    background-color: rgba(10, 20, 40, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
}

body.dark-mode .logo,
body.dark-mode .nav-links li a,
body.dark-mode .hamburger,
body.dark-mode .footer-links a {
    color: #ffffff;
}

body.dark-mode .nav-links li a:hover,
body.dark-mode .footer-links a:hover {
    color: #1e90ff;
}

body.dark-mode .dark-mode-toggle {
    background-color: #2c3e50;
    border-color: #ffffff;
}

body.dark-mode .dark-mode-toggle:hover {
    background-color: #34495e;
}

body.dark-mode .download-btn {
  background-color: #2c3e50;
  border-color: #ffffff;
}

body.dark-mode .download-btn:hover {
  background-color: #384c5f;
}

body.dark-mode .download-menu {
  background-color: #1a1a1a;
  border-color: #444;
}

body.dark-mode .download-menu a {
  color: #ffffff;
}

body.dark-mode .download-menu a:hover {
  background-color: #2a2a2a;
}

body.dark-mode .sun-icon {
    transform: translateY(-150%);
    opacity: 0;
}

body.dark-mode .moon-icon {
    transform: translateY(0);
    opacity: 1;
}

body.dark-mode .profile img {
    border-color: #333;
}

body.dark-mode .subtitle {
    color: #cccccc;
}

body.dark-mode section {
    background-color: rgba(20, 30, 50, 0.5);
    border: 1px solid #2c3e50;
}

body.dark-mode section h2 {
    border-color: #1e90ff;
}

body.dark-mode .skills li {
    background: #1e90ff;
}

body.dark-mode .experience-item h3,
body.dark-mode .project-item h3,
body.dark-mode .project-item a,
body.dark-mode .education-item h3 {
    color: #1e90ff;
}

body.dark-mode .duration,
body.dark-mode .tech-stack,
body.dark-mode .footer-note {
    color: #aaaaaa;
}

body.dark-mode .footer {
    background: rgba(10, 20, 40, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top : -40px;
}

@media(max-width: 768px) {
    .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        position: absolute;
        top: 68px;
        left: 0;
        padding: 1rem 0;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: background-color 0.8s ease;
    }

    .nav-links.active {
        display: flex;
    }

    .nav-links li {
        text-align: center;
        padding: 0.5rem 0;
    }

    .hamburger {
        display: block;
        position: static;
        transform: none;
    }

    body.dark-mode .nav-links {
        background-color: rgba(10, 20, 40, 0.95);
    }
}

@media (max-width: 480px) {
    h1 { font-size: 2rem; }
    .hero .subtitle { font-size: 1.2rem; }
    .container { padding: 1rem; }
    section { padding: 1.5rem; }
}`);

    if (storedImage) {
      const imgName = storedImage.includes('data:image/png') ? 'images/profile.png' : 'images/profile.jpg';
      zip.file(imgName, storedImage.split(',')[1], { base64: true });
    }

    zip.generateAsync({ type: 'blob' }).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio-bundle.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  applyInitialTheme();
  populateData();
});