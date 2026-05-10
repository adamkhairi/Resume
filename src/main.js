import content from './assets/content.js'

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

function loadContent() {
    resumeData = content
    updateLanguageButton()
    updateContent()
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
    const LH = 4.0;             // bullet line-height (mm)
    let yPosition = margin;

    // ── Helpers ──────────────────────────────────────────────────────

    function addText(text, x, y, options = {}) {
        const fontSize  = options.fontSize  || 9;
        const maxWidth  = options.maxWidth  || (pageWidth - 2 * margin - 5);
        const lineH     = options.lineHeight || LH;
        pdf.setFontSize(fontSize);
        pdf.setFont(options.font || 'helvetica', options.style || 'normal');
        if (options.color && Array.isArray(options.color)) {
            pdf.setTextColor(...options.color);
        } else {
            pdf.setTextColor(0, 0, 0);
        }
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line, i) => pdf.text(line, x, y + i * lineH));
        return y + lines.length * lineH;
    }

    function addCentred(text, y, options = {}) {
        const fontSize = options.fontSize || 10;
        pdf.setFontSize(fontSize);
        pdf.setFont(options.font || 'helvetica', options.style || 'normal');
        if (options.color && Array.isArray(options.color)) {
            pdf.setTextColor(...options.color);
        } else {
            pdf.setTextColor(0, 0, 0);
        }
        const tw = pdf.getStringUnitWidth(text) * fontSize / pdf.internal.scaleFactor;
        pdf.text(text, (pageWidth - tw) / 2, y);
        return y + fontSize * 0.35;
    }

    function sectionHeading(label, y) {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(label, margin, y);
        pdf.setLineWidth(0.3);
        pdf.line(margin, y + 1.2, pageWidth - margin, y + 1.2);
        return y + 6.5;
    }

    // ── Header ───────────────────────────────────────────────────────
    yPosition = addCentred('ADAM KHAIRI', yPosition + 8, {
        fontSize: 18, font: 'helvetica', style: 'bold'
    });

    const titleText = resumeData.personalInfo[currentLanguage].title;
    yPosition = addCentred(titleText, yPosition + 3.5, {
        fontSize: 10, color: [100, 100, 100]
    });

    const contactData = resumeData.personalInfo[currentLanguage].contact;
    yPosition = addCentred(
        `${contactData.email}  |  ${contactData.phone}  |  github.com/adamkhairi  |  linkedin.com/in/adam-khairi`,
        yPosition + 4,
        { fontSize: 8, color: [52, 152, 219] }
    );
    yPosition = addCentred(contactData.address, yPosition + 3, {
        fontSize: 8, color: [100, 100, 100]
    });

    yPosition += 5;

    // ── Experience ───────────────────────────────────────────────────
    yPosition = sectionHeading(resumeData.sections[currentLanguage].experience, yPosition);

    for (const exp of resumeData.experience[currentLanguage]) {
        // Position
        pdf.setFontSize(9.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(exp.position, margin, yPosition);
        yPosition += 4;

        // Company (left) + period | location (right) on the same baseline
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 152, 219);
        pdf.text(exp.company, margin, yPosition);

        const dateLoc = `${exp.period} | ${exp.location}`;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(120, 120, 120);
        pdf.setFontSize(8.5);
        const dateW = pdf.getStringUnitWidth(dateLoc) * 8.5 / pdf.internal.scaleFactor;
        pdf.text(dateLoc, pageWidth - margin - dateW, yPosition);
        yPosition += 4;

        // Bullets
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 0, 0);
        for (const resp of exp.responsibilities) {
            yPosition = addText(`• ${resp}`, margin + 3, yPosition, {
                fontSize: 8.5,
                maxWidth: pageWidth - 2 * margin - 6,
                lineHeight: LH
            });
            yPosition += 0.6;
        }
        yPosition += 3;
    }

    // ── Education ────────────────────────────────────────────────────
    yPosition += 2;
    yPosition = sectionHeading(resumeData.sections[currentLanguage].education, yPosition);

    for (const edu of resumeData.education[currentLanguage]) {
        pdf.setFontSize(9.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(edu.degree, margin, yPosition);
        yPosition += 4;

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(52, 152, 219);
        pdf.text(edu.institution, margin, yPosition);

        const eduDate = `${edu.period} | ${edu.location}`;
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(120, 120, 120);
        pdf.setFontSize(8.5);
        const eduDateW = pdf.getStringUnitWidth(eduDate) * 8.5 / pdf.internal.scaleFactor;
        pdf.text(eduDate, pageWidth - margin - eduDateW, yPosition);
        yPosition += 4;

        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(60, 60, 60);
        pdf.text(edu.field, margin + 3, yPosition);
        yPosition += 4.5;
    }

    // ── Skills ───────────────────────────────────────────────────────
    yPosition += 2;
    yPosition = sectionHeading(resumeData.sections[currentLanguage].skills, yPosition);

    const skills = resumeData.skills[currentLanguage].map(sanitizeForPDF);
    const skillsPerRow = 4;
    const colWidth    = (pageWidth - 2 * margin) / skillsPerRow;
    const skillRowH   = 5.5;

    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'normal');

    for (let i = 0; i < skills.length; i++) {
        const col = i % skillsPerRow;
        const row = Math.floor(i / skillsPerRow);
        const x   = margin + col * colWidth;
        const y   = yPosition + row * skillRowH;

        pdf.setFillColor(242, 242, 242);
        pdf.roundedRect(x, y - 2.2, colWidth - 2.5, 4.2, 1, 1, 'F');
        pdf.setTextColor(30, 30, 30);
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
