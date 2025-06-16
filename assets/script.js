let currentLanguage = 'fr'
let resumeData = null

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode')
}

function updateLanguageButton() {
  const langButton = document.getElementById('language-toggle')
  langButton.textContent = currentLanguage === 'fr' ? 'EN' : 'FR'
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr'
  updateLanguageButton()
  updateContent()
}

function updateContent() {
  if (!resumeData) return

  // Update personal info
  document.getElementById('name').textContent = resumeData.personalInfo[currentLanguage].name
  document.getElementById('title').textContent = resumeData.personalInfo[currentLanguage].title

  // Update contact info
  const contact = resumeData.personalInfo[currentLanguage].contact
  const contactInfo = document.getElementById('contact-info')
  contactInfo.innerHTML = `
          <a href="mailto:${contact.email}">${contact.email}</a>
          | <a href="tel:${contact.phone.replace(/\s/g, '')}">${contact.phone}</a><br />
          ${contact.address}<br />
          <div>
          <a href="https://${contact.github}" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
              <path fill="#fff" d="M41,24c0,9.4-7.6,17-17,17S7,33.4,7,24S14.6,7,24,7S41,14.6,41,24z"></path><path fill="#455a64" d="M21 41v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-6.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h1.8c.2-.3.2-.6.2-1.1V36c0-2.2-1.9-5.2-4.3-5.2h-2.5c-2.3 0-4.3 3.1-4.3 5.2v3.9c0 .4.1.8.2 1.1L21 41 21 41zM40.1 26.4C40.1 26.4 40.1 26.4 40.1 26.4c0 0-1.3-.4-2.4-.4 0 0-.1 0-.1 0-1.1 0-2.9.3-2.9.3-.1 0-.1 0-.1 0-.1.1-.1.1 0 2-.3 3.1-.3 1.1 0 2.4.4 2.5.4.1 0 .1.1.1.2C40.2 26.3 40.2 26.4 40.1 26.4zM39.8 27.2C39.8 27.2 39.8 27.2 39.8 27.2c0 0-1.4-.4-2.6-.4-.9 0-3 .2-3.1.2-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2.2-.2 3.1-.2 1.3 0 2.6.4 2.6.4.1 0 .1.1.1.2C39.9 27.1 39.9 27.2 39.8 27.2zM7.8 26.4c-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.2.8-.2 2.4-.5 3.3-.5.8 0 3.5.2 3.6.2.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0-2.7-.2-3.5-.2C10.1 26 8.6 26.2 7.8 26.4 7.8 26.4 7.8 26.4 7.8 26.4zM8.2 27.9c0 0-.1 0-.1-.1 0-.1 0-.1 0-.2.1 0 1.4-.8 2.9-1 1.3-.2 4 .1 4.2.1.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0 0 0 0 0 0 0-2.8-.3-4.1-.1C9.6 27.1 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9z"></path><path fill="#455a64" d="M14.2,23.5c0-4.4,4.6-8.5,10.3-8.5c5.7,0,10.3,4,10.3,8.5S31.5,31,24.5,31S14.2,27.9,14.2,23.5z"></path><path fill="#455a64" d="M28.6 16.3c0 0 1.7-2.3 4.8-2.3 1.2 1.2.4 4.8 0 5.8L28.6 16.3zM20.4 16.3c0 0-1.7-2.3-4.8-2.3-1.2 1.2-.4 4.8 0 5.8L20.4 16.3zM20.1 35.9c0 0-2.3 0-2.8 0-1.2 0-2.3-.5-2.8-1.5-.6-1.1-1.1-2.3-2.6-3.3-.3-.2-.1-.4.4-.4.5.1 1.4.2 2.1 1.1.7.9 1.5 2 2.8 2 1.3 0 2.7 0 3.5-.9L20.1 35.9z"></path><path fill="#00bcd4" d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M24,40c-8.8,0-16-7.2-16-16S15.2,8,24,8 s16,7.2,16,16S32.8,40,24,40z"></path>
            </svg>
            ${contact.github}
          </a> | 
          <a href="https://${contact.linkedin}" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
              <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
            </svg>
            ${contact.linkedin}
          </a>
          </div>
        `

  // Update section titles
  document.getElementById('experience-title').textContent = resumeData.sections[currentLanguage].experience
  document.getElementById('education-title').textContent = resumeData.sections[currentLanguage].education
  document.getElementById('skills-title').textContent = resumeData.sections[currentLanguage].skills

  // Update experience
  const experienceContainer = document.getElementById('experience-container')
  experienceContainer.innerHTML = ''
  resumeData.experience[currentLanguage].forEach((exp) => {
    const expDiv = document.createElement('div')
    expDiv.className = 'experience-item'
    expDiv.innerHTML = `
            <div class="position">${exp.position}</div>
            <div class="company">${exp.company}</div>
            <div class="date-location">${exp.period} | ${exp.location}</div>
            <ul>
              ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join('')}
            </ul>
          `
    experienceContainer.appendChild(expDiv)
  })

  // Update education
  const educationContainer = document.getElementById('education-container')
  educationContainer.innerHTML = ''
  resumeData.education[currentLanguage].forEach((edu) => {
    const eduDiv = document.createElement('div')
    eduDiv.className = 'education-item'
    eduDiv.innerHTML = `
            <div class="position">${edu.degree}</div>
            <div class="company">${edu.institution}</div>
            <div class="date-location">${edu.period} | ${edu.location}</div>
            <div>${edu.field}</div>
          `
    educationContainer.appendChild(eduDiv)
  })

  // Update skills
  const skillsContainer = document.getElementById('skills-container')
  skillsContainer.innerHTML = ''
  resumeData.skills[currentLanguage].forEach((skill) => {
    const skillSpan = document.createElement('span')
    skillSpan.className = 'skill'
    skillSpan.textContent = skill
    skillsContainer.appendChild(skillSpan)
  })
}

async function loadContent() {
  try {
    const response = await fetch('./content.json')
    resumeData = await response.json()
    updateLanguageButton()
    updateContent()
  } catch (error) {
    console.error('Error loading content:', error)
  }
}

async function exportToPDF() {
  try {
    // Show loading indicator (visual feedback)
    const pdfButton = document.getElementById('pdf-export');
    const originalText = pdfButton.textContent;
    pdfButton.textContent = 'Generating...';
    pdfButton.disabled = true;

    // Hide floating UI elements and profile image for clean capture
    const elementsToHide = [
      document.querySelector('.dark-mode-toggle'),
      document.getElementById('language-toggle'), 
      document.getElementById('pdf-export')
    ];
    
    elementsToHide.forEach(el => {
      if (el) el.style.visibility = 'hidden';
    });

    // Hide profile image and center header content for PDF
    const profileImage = document.querySelector('.profile-image');
    const headerElement = document.querySelector('.header');
    const headerContent = document.querySelector('.header-content');
    
    // Store original styles
    const originalHeaderStyle = headerElement ? headerElement.style.cssText : '';
    const originalHeaderContentStyle = headerContent ? headerContent.style.cssText : '';
    
    if (profileImage) {
      profileImage.style.display = 'none';
    }
    
    if (headerElement) {
      headerElement.style.justifyContent = 'center';
      headerElement.style.textAlign = 'center';
    }
    
    if (headerContent) {
      headerContent.style.textAlign = 'center';
      headerContent.style.width = '100%';
    }

    // Wait a moment for DOM updates
    await new Promise(resolve => setTimeout(resolve, 100));

    // Force a reflow to ensure proper dimensions
    document.body.style.overflow = 'visible';
    document.documentElement.style.overflow = 'visible';
    
    // Get the full content dimensions
    const fullHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    
    // Wait for reflow
    await new Promise(resolve => setTimeout(resolve, 200));

    // Capture the entire page content with proper sizing
    const canvas = await html2canvas(document.body, {
      scale: 2, // High quality for crisp text
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: window.innerWidth,
      height: fullHeight, // Capture full page height
      windowWidth: window.innerWidth,
      windowHeight: fullHeight, // Use full height for window
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      foreignObjectRendering: true,
      removeContainer: false
    });

    // A4 dimensions in mm
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;
    const MARGIN = 1; // Absolute minimal margin for maximum text size
    const CONTENT_WIDTH = A4_WIDTH - (MARGIN * 2);
    const CONTENT_HEIGHT = A4_HEIGHT - (MARGIN * 2);

    // Create PDF
    const pdf = new jspdf.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calculate optimal sizing to maximize content while maintaining readability
    const canvasAspectRatio = canvas.width / canvas.height;
    const contentAspectRatio = CONTENT_WIDTH / CONTENT_HEIGHT;

    let imgWidth, imgHeight;
    
    // Always prioritize using maximum available space for better readability
    if (canvasAspectRatio > contentAspectRatio) {
      // Content is wider - fit to width and scale height accordingly
      imgWidth = CONTENT_WIDTH;
      imgHeight = CONTENT_WIDTH / canvasAspectRatio;
    } else {
      // Content is taller - fit to height and scale width accordingly
      imgHeight = CONTENT_HEIGHT;
      imgWidth = CONTENT_HEIGHT * canvasAspectRatio;
    }

    // Ensure maximum size for readability (use 99.5% of available space minimum)
    const minWidth = CONTENT_WIDTH * 0.995;
    const minHeight = CONTENT_HEIGHT * 0.995;
    
    if (imgWidth < minWidth) {
      const scale = minWidth / imgWidth;
      imgWidth = minWidth;
      imgHeight = imgHeight * scale;
    }
    
    if (imgHeight < minHeight) {
      const scale = minHeight / imgHeight;
      imgHeight = minHeight;
      imgWidth = imgWidth * scale;
    }

    // Center the content on the page
    const xOffset = MARGIN + (CONTENT_WIDTH - imgWidth) / 2;
    const yOffset = MARGIN + (CONTENT_HEIGHT - imgHeight) / 2;

    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL('image/png', 1.0),
      'PNG',
      xOffset,
      yOffset,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );

    // Generate filename with current date and language
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Adam_Khairi_Resume_${currentLanguage.toUpperCase()}_${currentDate}.pdf`;

    // Save the PDF
    pdf.save(filename);

    // Restore UI elements
    elementsToHide.forEach(el => {
      if (el) el.style.visibility = 'visible';
    });

    // Restore profile image and header styles
    if (profileImage) {
      profileImage.style.display = '';
    }
    
    if (headerElement) {
      headerElement.style.cssText = originalHeaderStyle;
    }
    
    if (headerContent) {
      headerContent.style.cssText = originalHeaderContentStyle;
    }

    // Restore button
    pdfButton.textContent = originalText;
    pdfButton.disabled = false;

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Restore UI elements on error
    const elementsToRestore = [
      document.querySelector('.dark-mode-toggle'),
      document.getElementById('language-toggle'), 
      document.getElementById('pdf-export')
    ];
    
    elementsToRestore.forEach(el => {
      if (el) el.style.visibility = 'visible';
    });

    // Restore profile image and header styles on error
    const profileImageRestore = document.querySelector('.profile-image');
    const headerElementRestore = document.querySelector('.header');
    const headerContentRestore = document.querySelector('.header-content');
    
    if (profileImageRestore) {
      profileImageRestore.style.display = '';
    }
    
    if (headerElementRestore) {
      headerElementRestore.style.cssText = '';
    }
    
    if (headerContentRestore) {
      headerContentRestore.style.cssText = '';
    }

    // Restore button
    const pdfButton = document.getElementById('pdf-export');
    pdfButton.textContent = 'PDF';
    pdfButton.disabled = false;
    
    alert('Error generating PDF. Please try again.');
  }
}

// Add event listener for language toggle
document.getElementById('language-toggle').addEventListener('click', toggleLanguage)

// Load content when the page loads
document.addEventListener('DOMContentLoaded', loadContent)

// Add event listener for PDF export
document.getElementById('pdf-export').addEventListener('click', exportToPDF);
