/**
 * ==========================================================================
 * MyStrand Website - Main User Page JavaScript
 * Updated: Manual Slideshow Navigation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==================================================================
    // 1. GATEKEEPER SCRIPT
    // ==================================================================
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("You must be logged in to view this page. Redirecting...");
        window.location.href = 'login.html';
        return;
    }

    // ==================================================================
    // 2. WELCOME & LOGOUT LOGIC
    // ==================================================================
    const navbarUser = document.getElementById('navbarUser');
    if (navbarUser) {
        navbarUser.textContent = `Welcome, ${loggedInUser}`;
    }

    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('loggedInUser');
            alert("You have been logged out.");
            window.location.href = 'main.html';
        });
    }

    // ==================================================================
    // 3. SIDEBAR NAVIGATION LOGIC
    // ==================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar-nav');
    const closeBtn = document.getElementById('close-btn');
    const sidebarLinks = document.querySelectorAll('#sidebar-nav .nav-links a');

    if (menuToggle && sidebar && closeBtn) {
        const openSidebar = () => sidebar.classList.add('active');
        const closeSidebar = () => sidebar.classList.remove('active');

        menuToggle.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);

        sidebarLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    // ==================================================================
    // 4. STRAND DATA (Database for Modal)
    // ==================================================================
    const strandData = {
        "STEM": {
            title: "Science, Technology, Engineering, and Mathematics",
            specializations: [
                { name: "Robotics", description: "Design, build, and program automated machines.", requirements: "Solid foundation in Algebra and Physics. Basic programming logic is an advantage.", showcase: "Students build and compete with VEX-style robots in school competitions.", quizLink: "quiz.html?spec=robotics" },
                { name: "Computer Programming", description: "Master coding languages like Python, Java, and C++.", requirements: "Strong analytical and problem-solving skills.", showcase: "Development of a simple inventory management system and a personal website portfolio.", quizLink: "quiz.html?spec=programming" },
            ]
        },
        "ABM": {
            title: "Accountancy, Business, and Management",
            specializations: [
                { name: "Marketing Management", description: "Discover strategies for promoting products and services.", requirements: "Strong communication skills, creativity, and an interest in consumer behavior.", showcase: "Developing a comprehensive marketing plan for a local startup and creating a social media campaign.", quizLink: "quiz.html?spec=marketing" },
                { name: "Financial Accounting", description: "Master the principles of financial reporting.", requirements: "High attention to detail and strong analytical skills.", showcase: "Managing a mock portfolio of stocks and preparing financial statements for a fictional company.", quizLink: "quiz.html?spec=finance" },
            ]
        },
        "HUMSS": {
            title: "Humanities and Social Sciences",
            specializations: [
                { name: "Political Science", description: "Study systems of government and public policies.", requirements: "Strong interest in current events and good argumentation skills.", showcase: "Participating in model United Nations conferences and drafting a sample bill.", quizLink: "quiz.html?spec=polsci" },
                { name: "Psychology", description: "Explore the complexities of the human mind.", requirements: "An empathetic and observant nature, and strong analytical skills.", showcase: "Conducting a basic behavioral experiment and writing a research paper on a psychological topic.", quizLink: "quiz.html?spec=psych" },
            ]
        },
        "TVL": {
            title: "Technical-Vocational-Livelihood",
            specializations: [
                { name: "Culinary Arts", description: "Master professional cooking techniques and kitchen management.", requirements: "A passion for cooking, creativity, and good hygiene practices.", showcase: "Preparing a three-course meal and managing a kitchen station.", quizLink: "quiz.html?spec=cookery" },
                { name: "ICT", description: "Focus on practical IT skills including computer servicing and networking.", requirements: "Basic computer literacy and a keen interest in technology.", showcase: "Setting up a small network and troubleshooting common computer issues.", quizLink: "quiz.html?spec=ict" },
            ]
        },
        "PBM": {
            title: "Pre-Baccalaureate Maritime",
            specializations: [
                { name: "Marine Navigation", description: "Learn the fundamentals of ship navigation and maritime safety.", requirements: "Strong spatial awareness and good mathematical skills.", showcase: "Using navigational tools and plotting courses on nautical charts.", quizLink: "quiz.html?spec=navigation" },
                { name: "Marine Engineering", description: "Study the principles of marine machinery and systems.", requirements: "Proficiency in physics and mathematics, and mechanical aptitude.", showcase: "Understanding engine components and performing basic maintenance tasks.", quizLink: "quiz.html?spec=marineeng" },
            ]
        },
        "SMAW": {
            title: "Shield Manufacturing and Welding",
            specializations: [
                { name: "Pipe Welding", description: "Learn to weld pipes and fittings for industrial applications.", requirements: "Physical strength, attention to detail, and safety awareness.", showcase: "Welding a pipe joint and performing a quality inspection.", quizLink: "quiz.html?spec=SMAW" },
                { name: "Structural Welding", description: "Focus on welding structural components for buildings and bridges.", requirements: "Strong analytical skills, mechanical aptitude, and precision.", showcase: "Welding a structural beam and conducting a stress test.", quizLink: "quiz.html?spec=structural" },
            ]
        }
    };

    // ==================================================================
    // 5. INTERACTIVE MODAL LOGIC
    // ==================================================================
    const strandCards = document.querySelectorAll('.strand-card');
    const modal = document.getElementById('strand-modal');

    if (modal && strandCards.length > 0) {
        const modalTitle = document.getElementById('modal-title');
        const modalListView = document.getElementById('modal-list-view');
        const modalDetailView = document.getElementById('modal-detail-view');

        const showListView = () => {
            modalDetailView.style.display = 'none';
            modalListView.style.display = 'block';
        };

        const showDetailView = (strandKey, specIndex) => {
            const specialization = strandData[strandKey].specializations[specIndex];
            if (!specialization) return;

            document.getElementById('detail-title').textContent = specialization.name;
            document.getElementById('detail-content').innerHTML = `
                <div class="detail-action-card">
                    <h4><i class="fas fa-tasks"></i> Test / Quiz</h4>
                    <p>Take a short quiz to see if this specialization is right for you.</p>
                    <a href="quiz.html" class="action-btn">Take Quiz</a>
                </div>
                <div class="detail-action-card">
                    <h4><i class="fas fa-file-alt"></i> Requirements</h4>
                    <p>${specialization.requirements}</p>
                </div>
                <div class="detail-action-card">
                    <h4><i class="fas fa-lightbulb"></i> Showcase</h4>
                    <p>${specialization.showcase}</p>
                </div>
                <div class="detail-action-card">
                    <h4><i class="fas fa-paper-plane"></i> Enroll Now</h4>
                    <p>Ready to start your journey? Enroll in this specialization today.</p>
                    <a href="enroll.html" class="action-btn">Enroll Now</a>
                </div>`;

            modalListView.style.display = 'none';
            modalDetailView.style.display = 'block';
        };

        const openModal = (card) => {
            const strandKey = card.getAttribute('data-strand');
            const data = strandData[strandKey];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalListView.innerHTML = '';

            data.specializations.forEach((spec, index) => {
                const infoContainer = document.createElement('div');
                infoContainer.className = 'specialization-info clickable';
                infoContainer.innerHTML = `
                    <h3 class="specialization-name">${spec.name}</h3>
                    <p class="specialization-description">${spec.description}</p>`;
                infoContainer.addEventListener('click', () => showDetailView(strandKey, index));
                modalListView.appendChild(infoContainer);
            });

            showListView();
            modal.classList.add('active');
        };

        const closeModal = () => modal.classList.remove('active');

        strandCards.forEach(card => card.addEventListener('click', () => openModal(card)));
        document.querySelector('.modal-close').addEventListener('click', closeModal);
        document.getElementById('modal-back-btn').addEventListener('click', showListView);
        
        modal.addEventListener('click', e => (e.target === modal) && closeModal());
        document.addEventListener('keydown', e => (e.key === 'Escape') && closeModal());
    }

    // ==================================================================
    // 6. NEW: HERO SLIDESHOW MANUAL NAVIGATION
    // ==================================================================
    const heroSlideshow = document.getElementById('main-slideshow');
    const slidePrevBtn = document.getElementById('slide-prev');
    const slideNextBtn = document.getElementById('slide-next');

    if (heroSlideshow && slidePrevBtn && slideNextBtn) {
        let currentHeroSlide = 0;
        const totalHeroSlides = 4; // Number of images in your HTML

        function updateHeroSlide() {
            // Because wrapper width is 300%, shifting 33.333% moves exactly one image width
            // 0% -> Image 1, -33.333% -> Image 2, -66.666% -> Image 3
            const shiftPercentage = -(currentHeroSlide * (100 / totalHeroSlides)); 
            heroSlideshow.style.transform = `translateX(${shiftPercentage}%)`;
        }

        slideNextBtn.addEventListener('click', () => {
            currentHeroSlide++;
            if (currentHeroSlide >= totalHeroSlides) {
                currentHeroSlide = 0; // Loop back to start
            }
            updateHeroSlide();
        });

        slidePrevBtn.addEventListener('click', () => {
            currentHeroSlide--;
            if (currentHeroSlide < 0) {
                currentHeroSlide = totalHeroSlides - 1; // Loop to end
            }
            updateHeroSlide();
        });
    }

    // ==================================================================
    // 7. HORIZONTAL EVENTS TIMELINE LOGIC
    // ==================================================================
    const timelineViewport = document.getElementById('timeline-viewport');
    const prevBtn = document.getElementById('timeline-prev');
    const nextBtn = document.getElementById('timeline-next');

    if (timelineViewport && prevBtn && nextBtn) {
        const scrollStep = () => {
            const firstCard = timelineViewport.querySelector('.month-card');
            return firstCard ? firstCard.offsetWidth + 24 : 300; 
        };

        nextBtn.addEventListener('click', () => {
            timelineViewport.scrollBy({ left: scrollStep(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            timelineViewport.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
        });
    }

    // ==================================================================
    // 8. "BACK TO MAIN PAGE" / ANCHOR SCROLL LOGIC
    // ==================================================================
    const backtoBtn = document.getElementById("backtoBtn");
    if (backtoBtn) {
        backtoBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            const targetElement = document.querySelector(backtoBtn.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ==================================================================
    // 9. THEME TOGGLE LOGIC
    // ==================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        const body = document.body;
        
        // Check Local Storage
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            body.classList.add('light-mode');
            if(themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }

        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            if (body.classList.contains('light-mode')) {
                if(themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
                localStorage.setItem('theme', 'light');
            } else {
                if(themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
                localStorage.setItem('theme', 'dark');
            }
        });
    }

});
