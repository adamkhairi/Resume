import content from './assets/content.json'

let currentLanguage = 'fr'
let resumeData = content

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode')
}

window.toggleDarkMode = toggleDarkMode

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
          <a href="tel:${contact.phone.replace(/\s/g, '')}">${contact.phone}</a><br />
          <div>
              <a href="https://${contact.github}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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

    const formatTextWithLinks = (text) => {
        // Regex to find URLs (starting with http:// or https://)
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });
    };

    resumeData.experience[currentLanguage].forEach((exp) => {
        const expDiv = document.createElement('div')
        expDiv.className = 'experience-item'
        expDiv.innerHTML = `
            <div class="position">${exp.position}</div>
            <div class="company">${exp.company}</div>
            <div class="date-location">${exp.period} | ${exp.location}</div>
            <ul>
              ${exp.responsibilities.map((resp) => `<li>${formatTextWithLinks(resp)}</li>`).join('')}
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
        const response = await fetch('/src/assets/content.json')
        resumeData = await response.json()
        updateLanguageButton()
        updateContent()
    } catch (error) {
        console.error('Error loading content:', error)
    }
}

async function exportToPDF() {
    try {
        // Show loading indicator
        const pdfButton = document.getElementById('pdf-export');
        const originalText = pdfButton.textContent;
        pdfButton.textContent = 'Generating...';
        pdfButton.disabled = true;

        // Create PDF directly from data (device-independent approach)
        await generateDirectPDF();

        // Restore button
        pdfButton.textContent = originalText;
        pdfButton.disabled = false;

    } catch (error) {
        console.error('Error generating PDF:', error);
        console.error('Error stack:', error.stack);
        console.log('resumeData:', resumeData);
        console.log('currentLanguage:', currentLanguage);

        // Restore button
        const pdfButton = document.getElementById('pdf-export');
        pdfButton.textContent = 'PDF';
        pdfButton.disabled = false;

        alert(`Error generating PDF: ${error.message}. Please check the console for details.`);
    }
}

// Sanitize text for PDF (replace Unicode chars unsupported by helvetica)
function sanitizeForPDF(text) {
    return text
        .replace(/❤︎/g, '<3')
        .replace(/❤️/g, '<3')
        .replace(/❤/g, '<3');
}

async function generateDirectPDF() {
    // Check if resumeData is available
    if (!resumeData) {
        console.error('Resume data not loaded');
        throw new Error('Resume data not available');
    }

    // Create PDF with professional settings
    const pdf = new jspdf.jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 12;
    let yPosition = margin;

    // Helper function to add text with word wrap
    function addText(text, x, y, options = {}) {
        const fontSize = options.fontSize || 10;
        const maxWidth = options.maxWidth || (pageWidth - 2 * margin);
        const lineHeight = options.lineHeight || fontSize * 0.9;

        pdf.setFontSize(fontSize);
        pdf.setFont(options.font || 'helvetica', options.style || 'normal');

        if (options.color && Array.isArray(options.color)) {
            pdf.setTextColor(options.color[0], options.color[1], options.color[2]);
        } else {
            pdf.setTextColor(0, 0, 0);
        }

        const lines = pdf.splitTextToSize(text, maxWidth);
        for (let i = 0; i < lines.length; i++) {
            pdf.text(lines[i], x, y + (i * lineHeight));
        }

        return y + (lines.length * lineHeight);
    }

    // Helper function to add centered text
    function addCenteredText(text, y, options = {}) {
        const fontSize = options.fontSize || 10;
        pdf.setFontSize(fontSize);
        pdf.setFont(options.font || 'helvetica', options.style || 'normal');

        if (options.color && Array.isArray(options.color)) {
            pdf.setTextColor(options.color[0], options.color[1], options.color[2]);
        } else {
            pdf.setTextColor(0, 0, 0);
        }

        const textWidth = pdf.getStringUnitWidth(text) * fontSize / pdf.internal.scaleFactor;
        const x = (pageWidth - textWidth) / 2;
        pdf.text(text, x, y);

        return y + (fontSize * 0.35);
    }

    // Header Section
    yPosition = addCenteredText('ADAM KHAIRI', yPosition + 4, {
        fontSize: 20,
        font: 'helvetica',
        style: 'bold'
    });

    const title = resumeData.personalInfo[currentLanguage].title;
    yPosition = addCenteredText(title, yPosition + 1, {
        fontSize: 12,
        color: [100, 100, 100]
    });

    // Contact Info
    const contactData = resumeData.personalInfo[currentLanguage].contact;
    yPosition = addCenteredText(`${contactData.email} | ${contactData.phone}`, yPosition + 5, {
        fontSize: 9,
        color: [52, 152, 219]
    });

    yPosition = addCenteredText(contactData.address, yPosition + 3, {
        fontSize: 9
    });

    yPosition = addCenteredText(`github.com/adamkhairi | linkedin.com/in/adam-khairi`, yPosition + 3, {
        fontSize: 9,
        color: [52, 152, 219]
    });

    yPosition += 8;

    // Experience Section
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const expTitle = resumeData.sections[currentLanguage].experience;
    pdf.text(expTitle, margin, yPosition);
    pdf.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1);
    yPosition += 8;

    // Add experiences
    const experiences = resumeData.experience[currentLanguage];
    for (const exp of experiences) {
        // Position title
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(exp.position, margin, yPosition);
        yPosition += 4;

        // Company
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 152, 219);
        pdf.text(exp.company, margin, yPosition);
        yPosition += 4;

        // Period and location
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 100, 100);
        pdf.text(`${exp.period} | ${exp.location}`, margin, yPosition);
        yPosition += 5;

        // Responsibilities
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 0, 0);

        for (const resp of exp.responsibilities) {
            const bulletText = `• ${resp}`;
            yPosition = addText(bulletText, margin + 3, yPosition, {
                fontSize: 9,
                maxWidth: pageWidth - 2 * margin - 6,
                lineHeight: 4
            });
            yPosition += 1;
        }
        yPosition += 3;
    }

    // Education Section
    yPosition += 3;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const eduTitle = resumeData.sections[currentLanguage].education;
    pdf.text(eduTitle, margin, yPosition);
    pdf.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1);
    yPosition += 8;

    const education = resumeData.education[currentLanguage];
    for (const edu of education) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(edu.degree, margin, yPosition);
        yPosition += 4;

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 152, 219);
        pdf.text(edu.institution, margin, yPosition);
        yPosition += 4;

        // Period and location
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 100, 100);
        pdf.text(`${edu.period} | ${edu.location}`, margin, yPosition);
        yPosition += 4;

        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.text(edu.field, margin + 3, yPosition);
        yPosition += 6;
    }

    // Skills Section
    yPosition += 3;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    const skillsTitle = resumeData.sections[currentLanguage].skills;
    pdf.text(skillsTitle, margin, yPosition);
    pdf.line(margin, yPosition + 1, pageWidth - margin, yPosition + 1);
    yPosition += 8;

    // Skills in columns
    const skills = resumeData.skills[currentLanguage].map(sanitizeForPDF);
    const skillsPerRow = 4;
    const colWidth = (pageWidth - 2 * margin) / skillsPerRow;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);

    for (let i = 0; i < skills.length; i++) {
        const col = i % skillsPerRow;
        const row = Math.floor(i / skillsPerRow);
        const x = margin + (col * colWidth);
        const y = yPosition + (row * 4);

        // Skill background
        pdf.setFillColor(240, 240, 240);
        pdf.roundedRect(x, y - 2, colWidth - 3, 3.7, 1, 1, 'F');

        // Skill text
        pdf.setTextColor(0, 0, 0);
        pdf.text(skills[i], x + 2, y + 1);
    }

    // Generate filename and save
    const currentDate = new Date().toISOString().split('T')[0];
    const filename = `Adam_Khairi_Resume_${currentLanguage.toUpperCase()}_${currentDate}.pdf`;
    pdf.save(filename);
}

// Add event listener for language toggle
document.getElementById('language-toggle').addEventListener('click', toggleLanguage)

// Load content when the page loads
document.addEventListener('DOMContentLoaded', loadContent)

// Add event listener for PDF export
document.getElementById('pdf-export').addEventListener('click', exportToPDF);
