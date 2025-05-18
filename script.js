document.addEventListener('DOMContentLoaded', () => {
    let cvData;
    const cvDataFromLocalStorage = localStorage.getItem('cvData');
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        cvData = cvDataFromLocalStorage ? JSON.parse(cvDataFromLocalStorage) : data;
        console.log(cvData);
        const nameEl = document.getElementById('name');
    const statusEl = document.getElementById('status');
    const dateEl = document.getElementById('date');
    const phoneEl = document.getElementById('phone');
    const emailEl = document.getElementById('email');
    const locationEl = document.getElementById('location');

    const skillsListEl = document.getElementById('skills-list');
    const newSkillInputEl = document.getElementById('new-skill-input');
    const addSkillBtnEl = document.getElementById('add-skill-btn');

    const languagesListEl = document.getElementById('languages-list');
    const newLangInputEl = document.getElementById('new-language-input');
    const newLangLevelInputEl = document.getElementById('new-language-level-input');
    const addLangBtnEl = document.getElementById('add-language-btn');

    const educationContentEl = document.getElementById('education-content'); // Remains for hardcoded/simple text
    const personalQualitiesListEl = document.getElementById('personal-qualities-list');
    const aboutContentEl = document.getElementById('about-content');
    const experienceContentEl = document.getElementById('experience-content');
    
    const hobbiesListEl = document.getElementById('hobbies-list'); // New
    const newHobbyInputEl = document.getElementById('new-hobby-input'); // New
    const addHobbyBtnEl = document.getElementById('add-hobby-btn'); // New


    const saveToLocalStorageBtnEl = document.getElementById('save-to-localstorage-btn');

    saveToLocalStorageBtnEl.addEventListener('click', (e) => {
        e.target.innerHTML = 'Saved!';
        localStorage.setItem('cvData', JSON.stringify(cvData));
    });

    // --- Render Functions ---
    function renderSkills() {
        skillsListEl.innerHTML = '';
        cvData.Bacarıqlar.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsListEl.appendChild(li);
        });
    }

    function renderLanguages() {
        languagesListEl.innerHTML = '';
        cvData.Dillər.forEach(lang => {
            const li = document.createElement('li');
            li.textContent = `${lang.Dil} - ${lang.Səviyyə}`;
            languagesListEl.appendChild(li);
        });
    }

    function renderPersonalQualities() {
        personalQualitiesListEl.innerHTML = '';
        cvData['Şəxsi Keyfiyyətlər'].forEach(quality => {
            const li = document.createElement('li');
            li.textContent = quality;
            personalQualitiesListEl.appendChild(li);
        });
    }

    const resetLocalStorageBtnEl = document.getElementById('reset-localstorage-btn');
    resetLocalStorageBtnEl.addEventListener('click', () => {
        localStorage.clear();
        cvData = null;
        location.reload();
    });

    const editDateBtnEl = document.getElementById('edit-date-btn');
    const editEmailBtnEl = document.getElementById('edit-email-btn');
    const editEducationBtnEl = document.getElementById('edit-education-btn');
    const editAboutBtnEl = document.getElementById('edit-about-btn');
    const editExperienceBtnEl = document.getElementById('edit-experience-btn');
    const addPersonalQualityBtnEl = document.getElementById('add-personal-quality-btn');
    const newPersonalQualityInputEl = document.getElementById('new-personal-quality-input');
    
    function validateDate(date) {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        return dateRegex.test(date);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function editDate() {
        const newDate = prompt('Yeni doğum tarixi:', dateEl.textContent);
        if (newDate) {
            if (!validateDate(newDate)) {
                alert('Yanlış tarix formatı! (dd.mm.yyyy)');
                return;
            }
            cvData['Şəxsi məlumatlar']['Doğum tarixi'] = newDate;
            dateEl.textContent = newDate;
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
    }

    function editEmail() {
        const newEmail = prompt('Yeni email:', emailEl.textContent);
        if (newEmail) {
            if (!validateEmail(newEmail)) {
                alert('Yanlış email formatı!');
                return;
            }
            cvData['Şəxsi məlumatlar']['Email'] = newEmail;
            emailEl.textContent = newEmail;
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
    }

    editDateBtnEl.addEventListener('click', editDate);
    editEmailBtnEl.addEventListener('click', editEmail);
    editEducationBtnEl.addEventListener('click', editEducation);
    editAboutBtnEl.addEventListener('click', editAbout);
    editExperienceBtnEl.addEventListener('click', editExperience);
    addPersonalQualityBtnEl.addEventListener('click', addPersonalQuality);

    function addPersonalQuality() {
        const newPersonalQuality = newPersonalQualityInputEl.value.trim();
        if (newPersonalQuality) {
            cvData['Şəxsi Keyfiyyətlər'].push(newPersonalQuality);
            renderPersonalQualities();
            newPersonalQualityInputEl.value = '';
        }
    }
    
    function editEducation() {
        const newEducation = prompt('Təhsil:', educationContentEl.textContent);
        if (newEducation) {
            cvData.Təhsil = newEducation;
            educationContentEl.textContent = newEducation;
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
    }

    function editAbout() {
        const newAbout = prompt('Haqqımda:', aboutContentEl.textContent);
        if (newAbout) {
            cvData.Haqqımda = newAbout;
            aboutContentEl.textContent = newAbout;
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
    }

    function editExperience() {
        const newExperience = prompt('İş təcrübəsi:', experienceContentEl.textContent);
        if (newExperience) {
            cvData['İş təcrübəsi'] = newExperience;
            experienceContentEl.textContent = newExperience;
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
    }

    function renderHobbies() { // New function
        hobbiesListEl.innerHTML = '';
        cvData['Hobbi və Maraqlar'].forEach(hobby => {
            const li = document.createElement('li');
            li.textContent = hobby;
            hobbiesListEl.appendChild(li);
        });
    }

    // --- Initial Data Population ---
    function populateCV() {
        const personalInfo = cvData['Şəxsi məlumatlar'];
        nameEl.textContent = personalInfo.Ad;
        statusEl.textContent = personalInfo.Status;
        dateEl.textContent = personalInfo['Doğum tarixi'];
        phoneEl.textContent = personalInfo.Telefon;
        emailEl.textContent = personalInfo.Email;
        locationEl.textContent = personalInfo.Ünvan;

        renderSkills();
        renderLanguages();
        renderPersonalQualities();
        renderHobbies(); // Call new render function

        // For Təhsil, using hardcoded HTML. If you want it dynamic:
        // educationContentEl.innerHTML = ''; // Clear existing
        // cvData.Təhsil.forEach(edu => {
        //     const p = document.createElement('p');
        //     if (edu.məktəb) { p.textContent = `${edu.məktəb} ${edu.müddət}`; }
        //     else if (edu.universitet) { p.textContent = `${edu.universitet} - ${edu.ixtisas} ${edu.müddət}`; }
        //     educationContentEl.appendChild(p);
        // });

        aboutContentEl.textContent = cvData.Haqqımda;
        experienceContentEl.textContent = cvData['İş təcrübəsi'];
    }

    // --- Event Listeners for Adding Items ---
    addSkillBtnEl.addEventListener('click', () => {
        const newSkill = newSkillInputEl.value.trim();
        if (newSkill) {
            cvData.Bacarıqlar.push(newSkill);
            renderSkills();
            newSkillInputEl.value = '';
        }
    });

    addLangBtnEl.addEventListener('click', () => {
        const newLang = newLangInputEl.value.trim();
        const newLevel = newLangLevelInputEl.value.trim();
        if (newLang && newLevel) {
            cvData.Dillər.push({ "Dil": newLang, "Səviyyə": newLevel });
            renderLanguages();
            newLangInputEl.value = '';
            newLangLevelInputEl.value = '';
        }
    });

    addHobbyBtnEl.addEventListener('click', () => { // New event listener
        const newHobby = newHobbyInputEl.value.trim();
        if (newHobby) {
            cvData['Hobbi və Maraqlar'].push(newHobby);
            renderHobbies();
            newHobbyInputEl.value = '';
        }
    });

    // --- Accordion Functionality ---
    const accordionBtns = document.querySelectorAll(".accordion-btn");
    accordionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const panel = btn.nextElementSibling;
            const isActive = btn.classList.contains('active');

            accordionBtns.forEach(otherBtn => {
                otherBtn.classList.remove('active');
                otherBtn.nextElementSibling.style.display = "none";
            });

            if (!isActive) {
                btn.classList.add('active');
                panel.style.display = "block";
            }
        });
    });

    // --- Initialize ---
    populateCV();
    })
    

    // --- Element Getters ---
    

});