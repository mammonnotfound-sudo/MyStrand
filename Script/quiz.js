/* ==========================================================================
   MyStrand - Quiz Page JavaScript (Final Version with Expanded Content)
   ========================================================================== */

const quizData = {
    "strandQuizzes": {
        "STEM": {
            title: "STEM", icon: "fa-atom",
            specializations: {
                "programming": {
                    title: "Programming Challenge (15 Questions)",
                    questions: [
                        { type: 'multiple-choice', question: "What does 'HTML' stand for?", options: ["Hyper Tool Makeup Language", "HyperText Markup Language", "High Tech Modern Language"], answer: "HyperText Markup Language", funFact: "HTML provides the fundamental structure of all websites." },
                        { type: 'true-false', question: "A 'bug' in programming refers to an error in the code.", answer: true, funFact: "The term was famously coined when a real moth got stuck in a computer in 1947!" },
                        { type: 'multiple-choice', question: "Which symbol is used for single-line comments in JavaScript?", options: ["//", "/* */", "", "#"], answer: "//", funFact: "Comments are ignored by the browser but are crucial for developers to understand the code." },
                        { type: 'true-false', question: "Java and JavaScript are the same programming language.", answer: false, funFact: "Despite the similar names, they are completely different languages with different purposes." },
                        { type: 'multiple-choice', question: "What is 'CSS' primarily used for?", options: ["Database management", "Server-side logic", "Styling web pages", "Creating animations"], answer: "Styling web pages", funFact: "CSS stands for Cascading Style Sheets and controls the look and feel of a website." },
                        { type: 'true-false', question: "An integer is a data type that can store numbers with decimal points.", answer: false, funFact: "Integers store whole numbers. Numbers with decimal points are called 'floats' or 'doubles'." },
                        { type: 'multiple-choice', question: "What does the 'git clone' command do?", options: ["Deletes a repository", "Creates a new branch", "Copies a repository from a remote source", "Merges two branches"], answer: "Copies a repository from a remote source", funFact: "Cloning is the first step most developers take when starting work on an existing project." },
                        { type: 'true-false', question: "A 'string' is a sequence of characters, such as text.", answer: true, funFact: "Strings are one of the most common and fundamental data types in all of programming." },
                        { type: 'multiple-choice', question: "Which of these is a popular version control system?", options: ["Docker", "Kubernetes", "Git", "Jenkins"], answer: "Git", funFact: "Git was created by Linus Torvalds, the same person who created the Linux operating system kernel." },
                        { type: 'true-false', question: "The 'else' statement in an 'if-else' block is mandatory.", answer: false, funFact: "You can have an 'if' statement without an 'else'. The 'else' block only runs if the 'if' condition is false." },
                        { type: 'multiple-choice', question: "What is an API?", options: ["Advanced Programming Interface", "Application Programming Interface", "Automated Program Interaction", "Applied Project Infrastructure"], answer: "Application Programming Interface", funFact: "APIs are what allow different software applications to communicate with each other." },
                        { type: 'true-false', question: "Binary code uses only the digits 0 and 1.", answer: true, funFact: "At the most basic level, all computer instructions are represented by sequences of 0s and 1s." },
                        { type: 'multiple-choice', question: "Which data structure operates on a 'First-In, First-Out' (FIFO) basis?", options: ["Stack", "Queue", "Array", "Tree"], answer: "Queue", funFact: "Think of a queue like a line at a ticket counter – the first person in line is the first person to be served." },
                        { type: 'true-false', question: "Python is a statically-typed language.", answer: false, funFact: "Python is dynamically-typed, meaning you don't have to declare the variable type beforehand." },
                        { type: 'multiple-choice', question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Question Logic", "Standardized Query Language", "System Query Link"], answer: "Structured Query Language", funFact: "SQL is the standard language for managing and querying relational databases." }
                    ]
                },
                "physics": {
                    title: "Physics Challenge",
                    questions: [
                        { type: 'multiple-choice', question: "What is Newton's First Law of Motion also known as?", options: ["Law of Acceleration", "Law of Action-Reaction", "Law of Inertia", "Law of Gravity"], answer: "Law of Inertia", funFact: "An object in motion stays in motion unless a force acts upon it!" },
                        { type: 'true-false', question: "Sound travels faster in water than in air.", answer: true, funFact: "Sound waves travel more than four times faster in water due to its higher density." },
                        { type: 'multiple-choice', question: "What force keeps planets in orbit around the sun?", options: ["Magnetic Force", "Frictional Force", "Gravitational Force", "Tension Force"], answer: "Gravitational Force", funFact: "Gravity is the same force that keeps you on the Earth!" },
                        { type: 'true-false', question: "Energy can be created and destroyed.", answer: false, funFact: "The First Law of Thermodynamics states that energy can only be converted from one form to another." },
                        { type: 'multiple-choice', question: "What is the unit of electrical resistance?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: "Ohm", funFact: "It's named after German physicist Georg Ohm." }
                    ]
                }
            }
        },
        "ABM": {
            title: "ABM", icon: "fa-chart-line",
            specializations: {
                "marketing": {
                    title: "Marketing Masters (15 Questions)",
                    questions: [
                        { type: 'multiple-choice', question: "Which of these is NOT one of the traditional 4 Ps of marketing?", options: ["Product", "Price", "People", "Place"], answer: "People", funFact: "The original 4 Ps are Product, Price, Promotion, and Place. 'People' was added later in expanded models." },
                        { type: 'true-false', question: "A logo is the same thing as a brand.", answer: false, funFact: "A logo is a visual symbol, while a brand is the entire identity and perception of a company." },
                        { type: 'multiple-choice', question: "What does SWOT analysis stand for?", options: ["Sales, Weaknesses, Opportunities, Threats", "Strengths, Weaknesses, Opportunities, Threats", "Strategy, Work, Operations, Tactics"], answer: "Strengths, Weaknesses, Opportunities, Threats", funFact: "SWOT analysis is a crucial strategic planning tool for any business." },
                        { type: 'true-false', question: "Viral marketing relies heavily on social networks and word-of-mouth.", answer: true, funFact: "The goal is to create content so engaging that people share it exponentially, like a virus." },
                        { type: 'multiple-choice', question: "A 'target audience' is...", options: ["Everyone who buys products", "A specific group of consumers a campaign is aimed at", "People who work in marketing", "Competitors' customers"], answer: "A specific group of consumers a campaign is aimed at", funFact: "Defining a target audience is one of the most important first steps in marketing." },
                        { type: 'true-false', question: "Increasing the price of a product will always increase revenue.", answer: false, funFact: "This depends on 'price elasticity'. If a price increase causes too many people to stop buying, revenue can actually decrease." },
                        { type: 'multiple-choice', question: "What is SEO?", options: ["Sales Engine Optimization", "Social Engagement Office", "Search Engine Optimization", "Service Enterprise Operations"], answer: "Search Engine Optimization", funFact: "SEO is the practice of improving a website to rank higher on search engines like Google." },
                        { type: 'true-false', question: "'B2B' stands for 'Back to Business'.", answer: false, funFact: "'B2B' stands for 'Business-to-Business', meaning a company that sells to other companies, not directly to consumers (B2C)." },
                        { type: 'multiple-choice', question: "What type of marketing involves creating valuable free content to attract an audience?", options: ["Direct Marketing", "Content Marketing", "Affiliate Marketing", "Guerilla Marketing"], answer: "Content Marketing", funFact: "Blogs, videos, and tutorials are common forms of content marketing." },
                        { type: 'true-false', question: "A tagline and a slogan are the same thing.", answer: false, funFact: "A tagline represents the entire brand (e.g., Nike's 'Just Do It'), while a slogan is often for a specific campaign." },
                        { type: 'multiple-choice', question: "What is a 'call to action' (CTA)?", options: ["A legal document", "A customer complaint", "A brand's logo", "An instruction to provoke a response (e.g., 'Buy Now')"], answer: "An instruction to provoke a response (e.g., 'Buy Now')", funFact: "Effective CTAs are crucial for converting viewers into customers." },
                        { type: 'true-false', question: "Market research is only done before a product is launched.", answer: false, funFact: "Successful companies conduct market research continuously to stay in touch with customer needs and market trends." },
                        { type: 'multiple-choice', question: "Which social media platform is most focused on professional networking?", options: ["Facebook", "Instagram", "LinkedIn", "TikTok"], answer: "LinkedIn", funFact: "LinkedIn is the go-to platform for job searching, professional connections, and industry news." },
                        { type: 'true-false', question: "The primary goal of public relations (PR) is to increase sales directly.", answer: false, funFact: "The primary goal of PR is to build and maintain a positive public image for a brand, which indirectly helps sales." },
                        { type: 'multiple-choice', question: "A 'USP' in marketing is a product's...", options: ["Universal Selling Price", "Unique Selling Proposition", "Underlying Sales Potential", "Unified Service Plan"], answer: "Unique Selling Proposition", funFact: "A USP is the one thing that makes your product different from and better than the competition." }
                    ]
                },
                "accounting": {
                    title: "Accounting Basics",
                    questions: [
                        { type: 'true-false', question: "Revenue is the same as profit.", answer: false, funFact: "Profit is what's left after you subtract expenses from revenue (Profit = Revenue - Expenses)." },
                        { type: 'multiple-choice', question: "Which financial statement shows a company's financial position at a specific point in time?", options: ["Income Statement", "Cash Flow Statement", "Balance Sheet", "Annual Report"], answer: "Balance Sheet", funFact: "The Balance Sheet is like a 'snapshot' of a company's financial health." },
                        { type: 'true-false', question: "Debits must always equal credits in double-entry accounting.", answer: true, funFact: "This is the golden rule of accounting that ensures the balance sheet always balances." }
                    ]
                }
            }
        },
        "HUMSS": {
            title: "HUMSS", icon: "fa-landmark",
            specializations: {
                "psychology": {
                    title: "Psychology Deep Dive (15 Questions)",
                    questions: [
                        { type: 'true-false', question: "The left side of the brain is primarily responsible for creativity.", answer: false, funFact: "Generally, the right side of the brain is associated with creativity and the left with logic." },
                        { type: 'multiple-choice', question: "Who is often called the 'father of psychoanalysis'?", options: ["B.F. Skinner", "Carl Jung", "Ivan Pavlov", "Sigmund Freud"], answer: "Sigmund Freud", funFact: "Freud's theories, though controversial, revolutionized the field of psychology." },
                        { type: 'multiple-choice', question: "What is the 'placebo effect'?", options: ["A type of memory loss", "A beneficial effect from a fake treatment", "The fear of open spaces", "A sleep disorder"], answer: "A beneficial effect from a fake treatment", funFact: "The placebo effect demonstrates the powerful connection between the mind and body." },
                        { type: 'true-false', question: "Short-term memory can typically hold about 15 items at once.", answer: false, funFact: "The classic estimate is that short-term memory holds about 7 items (plus or minus 2)." },
                        { type: 'multiple-choice', question: "Classical Conditioning is most associated with which psychologist?", options: ["Abraham Maslow", "Jean Piaget", "Ivan Pavlov", "Albert Bandura"], answer: "Ivan Pavlov", funFact: "Pavlov famously conditioned dogs to salivate at the sound of a bell." },
                        { type: 'true-false', question: "Cognitive dissonance is the feeling of comfort when your beliefs and actions align.", answer: false, funFact: "It's the feeling of *discomfort* when your beliefs and actions are in conflict." },
                        { type: 'multiple-choice', question: "Which of these is at the bottom of Maslow's Hierarchy of Needs?", options: ["Self-Actualization", "Safety Needs", "Esteem", "Physiological Needs"], answer: "Physiological Needs", funFact: "Physiological needs like air, water, and food are the most fundamental for survival." },
                        { type: 'true-false', question: "Phobias are rational, explainable fears.", answer: false, funFact: "A key characteristic of a phobia is that the fear is intense and irrational." },
                        { type: 'multiple-choice', question: "The Stanford Prison Experiment studied the psychological effects of...", options: ["Sleep deprivation", "Perceived power", "Memory recall", "Childhood development"], answer: "Perceived power", funFact: "The experiment had to be stopped early because the participants took their roles as 'prisoners' and 'guards' too seriously." },
                        { type: 'true-false', question: "IQ scores are a perfect and complete measure of a person's intelligence.", answer: false, funFact: "IQ tests measure certain types of analytical intelligence but don't capture creativity, emotional intelligence, or practical skills." },
                        { type: 'multiple-choice', question: "What part of the brain is most associated with fear and emotional responses?", options: ["Cerebellum", "Frontal Lobe", "Hippocampus", "Amygdala"], answer: "Amygdala", funFact: "The amygdala acts as the brain's 'alarm system'." },
                        { type: 'true-false', question: "Introversion is the same as shyness.", answer: false, funFact: "Introversion is about gaining energy from solitude, while shyness is a fear of social judgment." },
                        { type: 'multiple-choice', question: "What is 'confirmation bias'?", options: ["The tendency to forget information", "The tendency to seek out information that confirms one's existing beliefs", "The bias towards positive outcomes", "The bias against new ideas"], answer: "The tendency to seek out information that confirms one's existing beliefs", funFact: "It's a mental shortcut that can prevent us from looking at issues objectively." },
                        { type: 'true-false', question: "Déjà vu is a sign of a serious memory problem.", answer: false, funFact: "Déjà vu is a common experience, and scientists believe it's a brief 'misfire' in the brain's memory systems, not a sign of a disorder." },
                        { type: 'multiple-choice', question: "Which of these is a 'Big Five' personality trait?", options: ["Humor", "Optimism", "Conscientiousness", "Patience"], answer: "Conscientiousness", funFact: "The Big Five are: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (OCEAN)." }
                    ]
                }
            }
        },
        "TVL": {
            title: "TVL", icon: "fa-tools",
            specializations: {
                "culinary": {
                    title: "Culinary Arts Pro (15 Questions)",
                    questions: [
                        { type: 'multiple-choice', question: "What are the five mother sauces of classical cuisine?", options: ["Ketchup, Mustard, Mayo, BBQ, Ranch", "Béchamel, Velouté, Espagnole, Hollandaise, Tomato", "Soy, Teriyaki, Hoisin, Oyster, Fish Sauce"], answer: "Béchamel, Velouté, Espagnole, Hollandaise, Tomato", funFact: "These five sauces are the building blocks from which hundreds of other sauces are made." },
                        { type: 'true-false', question: "Blanching involves slowly simmering vegetables in water.", answer: false, funFact: "Blanching is a quick process of boiling vegetables briefly and then plunging them into ice water to stop the cooking." },
                        { type: 'multiple-choice', question: "What is the culinary term for finely chopping herbs or leafy greens?", options: ["Julienne", "Mirepoix", "Chiffonade", "Brunoise"], answer: "Chiffonade", funFact: "It involves stacking leaves, rolling them tightly, and then slicing them into thin ribbons." },
                        { type: 'true-false', question: "A 'roux' is a mixture of flour and fat used to thicken sauces.", answer: true, funFact: "The color of the roux (white, blond, or brown) depends on how long you cook it and affects the final flavor." },
                        { type: 'multiple-choice', question: "What does 'al dente' mean when cooking pasta?", options: ["To the tooth (firm bite)", "Very soft", "With cheese", "In a spicy sauce"], answer: "To the tooth (firm bite)", funFact: "Perfectly cooked pasta should have a slight resistance when you bite into it." },
                        { type: 'true-false', question: "Searing meat at a high temperature seals in the juices.", answer: false, funFact: "This is a common myth! Searing creates flavor and a delicious crust through the Maillard reaction, but it doesn't seal in juices." },
                        { type: 'multiple-choice', question: "What is the main ingredient in a traditional pesto sauce?", options: ["Parsley", "Cilantro", "Basil", "Mint"], answer: "Basil", funFact: "Classic Pesto Genovese also includes garlic, pine nuts, olive oil, and Parmesan cheese." },
                        { type: 'true-false', question: "Braising is a dry-heat cooking method.", answer: false, funFact: "Braising is a combination-cooking method that uses both wet and dry heat (searing then simmering in liquid)." },
                        { type: 'multiple-choice', question: "The process of 'proofing' is associated with what type of food?", options: ["Cheese", "Wine", "Bread", "Cured Meats"], answer: "Bread", funFact: "Proofing is the final rise of bread dough before baking." },
                        { type: 'true-false', question: "Umami is one of the five basic tastes.", answer: true, funFact: "The five basic tastes are sweet, sour, salty, bitter, and umami (savory)." },
                        { type: 'multiple-choice', question: "What is 'mirepoix'?", options: ["A type of mushroom", "A dessert wine", "A mix of chopped onions, carrots, and celery", "A French cheese"], answer: "A mix of chopped onions, carrots, and celery", funFact: "This aromatic vegetable mix is the flavor base for countless stocks, soups, and stews." },
                        { type: 'true-false', question: "You should always wash mushrooms with a lot of water.", answer: false, funFact: "Mushrooms are like sponges and can become waterlogged. It's best to brush them clean or wipe them with a damp cloth." },
                        { type: 'multiple-choice', question: "What does it mean to 'deglaze' a pan?", options: ["To clean it with soap", "To add liquid to a hot pan to lift off browned bits", "To remove the fat", "To let it cool down"], answer: "To add liquid to a hot pan to lift off browned bits", funFact: "Those browned bits (fond) are packed with flavor and form the base of a delicious pan sauce." },
                        { type: 'true-false', question: "Adding salt to water makes it boil faster.", answer: false, funFact: "Adding salt actually increases the boiling point of water, making it take slightly longer to boil, but it does season the food." },
                        { type: 'multiple-choice', question: "What is a 'concasse'?", options: ["A thick soup", "A type of pastry", "A roughly chopped mixture, usually of tomatoes", "A grilled sandwich"], answer: "A roughly chopped mixture, usually of tomatoes", funFact: "Tomato concasse involves blanching, peeling, and seeding tomatoes before chopping them." }
                    ]
                }
            }
        },
        "PBM": {
            title: "PBM", icon: "fa-anchor",
            specializations: {
                "navigation": {
                    title: "Navigation & Seamanship (15 Questions)",
                    questions: [
                        { type: 'multiple-choice', question: "What does 'starboard' refer to on a ship?", options: ["The left side", "The right side", "The front", "The back"], answer: "The right side", funFact: "An easy way to remember is that 'starboard' and 'right' have more letters than 'port' and 'left'." },
                        { type: 'true-false', question: "A nautical mile is shorter than a standard mile.", answer: false, funFact: "A nautical mile is slightly longer, measuring about 1.15 standard miles or 1.852 kilometers." },
                        { type: 'multiple-choice', question: "What is the front of a ship called?", options: ["Stern", "Aft", "Bow", "Beam"], answer: "Bow", funFact: "The back of the ship is called the stern." },
                        { type: 'true-false', question: "The 'port' side of a vessel has a green navigation light.", answer: false, funFact: "The port (left) side has a red light. The starboard (right) side has a green light. Remember: 'Port wine is red'." },
                        { type: 'multiple-choice', question: "What does 'GPS' stand for?", options: ["Global Positioning System", "General Piloting Service", "Global Pathfinding Satellite", "Guiding Protocol System"], answer: "Global Positioning System", funFact: "The GPS system is a network of satellites owned by the U.S. government." },
                        { type: 'true-false', question: "A ship's 'draft' is the distance from the waterline to the main deck.", answer: false, funFact: "The draft is the distance from the waterline to the *bottom* of the hull (the keel)." },
                        { type: 'multiple-choice', question: "What is the name of the 'steering wheel' of a ship?", options: ["The Rudder", "The Tiller", "The Helm", "The Compass"], answer: "The Helm", funFact: "The helm controls the rudder, which is the fin at the back of the ship that does the actual steering." },
                        { type: 'true-false', question: "A 'knot' is a unit of speed, not distance.", answer: true, funFact: "One knot is equal to one nautical mile per hour." },
                        { type: 'multiple-choice', question: "Which instrument is used to measure latitude at sea?", options: ["Chronometer", "Sextant", "Barometer", "Anemometer"], answer: "Sextant", funFact: "A sextant measures the angle between the horizon and a celestial body like the Sun or North Star." },
                        { type: 'true-false', question: "The 'bridge' of a ship is the main storage area for cargo.", answer: false, funFact: "The bridge is the command center of the ship where the captain and officers navigate and control the vessel." },
                        { type: 'multiple-choice', question: "What is a 'bulkhead' on a ship?", options: ["A type of anchor", "The ship's kitchen", "A wall or partition inside the ship", "A life raft"], answer: "A wall or partition inside the ship", funFact: "Bulkheads provide structural support and create watertight compartments." },
                        { type: 'true-false', question: "On a nautical chart, the numbers indicate the depth of the water.", answer: true, funFact: "These numbers, called 'soundings', are crucial for preventing the ship from running aground." },
                        { type: 'multiple-choice', question: "What is the 'Plimsoll Line' on a ship's hull?", options: ["The waterline when empty", "A line indicating the maximum safe draft", "The name of the ship builder", "A decorative stripe"], answer: "A line indicating the maximum safe draft", funFact: "It shows how heavily a ship can be loaded in different water types and seasons." },
                        { type: 'true-false', question: "A lighthouse's light pattern is unique to help sailors identify it.", answer: true, funFact: "This unique sequence of flashes and eclipses is called its 'light characteristic' and is marked on nautical charts." },
                        { type: 'multiple-choice', question: "What is the 'wake' of a ship?", options: ["The captain's sleeping quarters", "The trail of disturbed water left behind a moving ship", "The ship's horn", "The main mast"], answer: "The trail of disturbed water left behind a moving ship", funFact: "A ship's wake can be visible for miles and can be a hazard to smaller boats." }
                    ]
                }
            }
        },
        "SMAW": {
        title: "SMAW",
            icon: "fa-fire",
            specializations: {
                "welding_tech": {
                    title: "Shielded Metal Arc Welding (15 Questions)",
                    questions: [
                        { "type": "multiple-choice", "question": "What does 'SMAW' stand for?", "options": ["Steel Metal Arc Welding", "Shielded Metal Arc Welding", "Standard Manual Arc Welding", "Structural Metal Arc Work"], "answer": "Shielded Metal Arc Welding", "funFact": "It is also informally known as 'stick welding' because of the electrode used." },
                        { "type": "true-false", "question": "You can safely weld without a welding helmet if you just close your eyes.", "answer": false, "funFact": "The UV radiation from the arc can burn your eyelids and skin even if your eyes are closed. Always wear proper PPE." },
                        { "type": "multiple-choice", "question": "What is the function of the 'flux' coating on the electrode?", "options": ["To make the electrode look nice", "To conduct electricity better", "To protect the molten weld pool from air", "To cool down the metal"], "answer": "To protect the molten weld pool from air", "funFact": "When the flux burns, it creates a gas shield that prevents oxidation, which would weaken the weld." },
                        { "type": "multiple-choice", "question": "In the electrode classification 'E6013', what does the '60' stand for?", "options": ["60% Iron", "60,000 psi Tensile Strength", "60 seconds of welding time", "60 mm length"], "answer": "60,000 psi Tensile Strength", "funFact": "The first two digits (or three) always indicate how much stress the weld metal can handle before breaking." },
                        { "type": "true-false", "question": "'Slag' is the hardened layer of impurities that forms on top of a finished weld.", "answer": true, "funFact": "Slag protects the hot metal as it cools, but it must be chipped off later to inspect the weld." },
                        { "type": "multiple-choice", "question": "Which tool is specifically used to remove slag from a weld bead?", "options": ["Chipping Hammer", "Screwdriver", "Ball-peen Hammer", "Wrench"], "answer": "Chipping Hammer", "funFact": "A wire brush is usually used immediately after the chipping hammer to clean off the remaining fine dust." },
                        { "type": "multiple-choice", "question": "What is 'Arc Eye' (or Welder's Flash)?", "options": ["A special welding technique", "A painful eye condition caused by UV radiation", "A type of safety glass", "The center of the welding arc"], "answer": "A painful eye condition caused by UV radiation", "funFact": "It feels like having sand in your eyes and can happen if you look at the arc without a proper filter lens." },
                        { "type": "true-false", "question": "Damp or wet electrodes are perfectly fine to use in SMAW.", "answer": false, "funFact": "Moisture in electrodes can cause defects like porosity (tiny holes) and excessive spatter." },
                        { "type": "multiple-choice", "question": "What is 'Spatter'?", "options": ["The perfect weld bead", "Droplets of molten metal scattered around the weld", "The smoke created by flux", "The sound the machine makes"], "answer": "Droplets of molten metal scattered around the weld", "funFact": "Excessive spatter often means your amperage (current) is set too high or your arc length is too long." },
                        { "type": "true-false", "question": "The 'Ground Clamp' must be attached to the workpiece or the welding table.", "answer": true, "funFact": "Without the ground clamp, the electrical circuit is incomplete, and the arc will not strike." },
                        { "type": "multiple-choice", "question": "What creates the heat needed to melt the metal in SMAW?", "options": ["A gas flame", "An electric arc", "Friction", "Chemical reaction"], "answer": "An electric arc", "funFact": "The temperature of the electric arc can reach up to 6,500°F (3,600°C)." },
                        { "type": "multiple-choice", "question": "Which PPE is essential for protecting your lungs from welding fumes?", "options": ["Earplugs", "Safety Shoes", "Respirator / Proper Ventilation", "Leather Apron"], "answer": "Respirator / Proper Ventilation", "funFact": "Galvanized steel is especially dangerous to weld without ventilation because it releases toxic zinc fumes." },
                        { "type": "true-false", "question": "In the code 'E6013', the '1' indicates that the electrode can be used in ALL positions.", "answer": true, "funFact": "If the third digit is '2', it means the electrode is only for Flat and Horizontal Fillet positions." },
                        { "type": "multiple-choice", "question": "What is 'undercut'?", "options": ["Welding from the bottom up", "A groove melted into the base metal usually at the toe of the weld", "Cutting the metal before welding", "Using too little current"], "answer": "A groove melted into the base metal usually at the toe of the weld", "funFact": "Undercut creates a weak point where the metal is thinner than intended, leading to potential failure." },
                        { "type": "true-false", "question": "Leather gloves are preferred over synthetic fabric gloves for welding.", "answer": true, "funFact": "Synthetic fabrics like polyester can melt and stick to your skin when exposed to the high heat and sparks of welding." }
                    ]
                }
            }
        }
    },
    "generalQuizzes": {
        "randomFacts": {
            title: "Random Facts", icon: "fa-question-circle",
            questions: [
                { type: 'true-false', question: "A slug has four noses.", answer: true, funFact: "They use two for smelling and tasting, and two for detecting light and movement." },
                { type: 'multiple-choice', question: "What is the only mammal capable of true flight?", options: ["Flying Squirrel", "Sugar Glider", "Bat", "Ostrich"], answer: "Bat", funFact: "Other 'flying' mammals like squirrels and gliders actually glide, they don't achieve powered flight." },
                { type: 'true-false', question: "An octopus has three hearts.", answer: true, funFact: "Two hearts pump blood through the gills, while the third pumps it to the rest of the body." },
                { type: 'multiple-choice', question: "Which planet is known for its prominent rings?", options: ["Jupiter", "Mars", "Saturn", "Neptune"], answer: "Saturn", funFact: "While other gas giants also have rings, Saturn's are by far the largest and most spectacular." },
                { type: 'true-false', question: "The unicorn is the national animal of Scotland.", answer: true, funFact: "It was adopted as a symbol of purity, innocence, and power in the 15th century." },
                { type: 'multiple-choice', question: "What is a group of crows called?", options: ["A flock", "A gaggle", "A murder", "A parliament"], answer: "A murder", funFact: "This name comes from old folk tales and superstitions that associated crows with death." },
                { type: 'true-false', question: "The Eiffel Tower can be taller during the summer.", answer: true, funFact: "Due to thermal expansion of the iron, it can grow by up to 15 cm (6 inches) in the summer heat!" }
            ]
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('quiz-content-area');
    const titleEl = document.getElementById('quiz-title');
    const breadcrumbEl = document.getElementById('quiz-breadcrumb');
    const headerEl = document.getElementById('quiz-header');
    const backToMainBtn = document.querySelector('.back-to-main-btn');
    let state = { view: 'home', history: [] };
    let quizState = {};

    function updateHeaderLayout() {
        let backBtn = document.getElementById('back-btn');
        
        if (state.view === 'home') {
            if (backBtn) backBtn.remove();
            if (backToMainBtn) backToMainBtn.style.display = 'inline-block';
            headerEl.classList.remove('title-right');
        } else {
            if (!backBtn) {
                backBtn = document.createElement('button');
                backBtn.id = 'back-btn';
                backBtn.className = 'back-btn';
                backBtn.innerHTML = `<i class="fas fa-arrow-left"></i> Back`;
                backBtn.onclick = goBack;
                headerEl.prepend(backBtn);
            }
            if (backToMainBtn) backToMainBtn.style.display = 'none';
            headerEl.classList.add('title-right');
        }
    }

    function goBack() {
        if (state.history.length > 0) {
            const lastState = state.history.pop();
            renderView(lastState.view, lastState.payload, true);
        }
    }

    function renderView(view, payload, isGoingBack = false) {
        if (!isGoingBack) {
            state.history.push({ view: state.view, payload: state.payload });
        }
        state.view = view;
        state.payload = payload;
        
        contentArea.innerHTML = '';
        updateHeaderLayout();

        switch (view) {
            case 'home':
                titleEl.textContent = 'Quiz Zone';
                breadcrumbEl.textContent = 'Choose a quiz category';
                const homeGrid = createPickerGrid({
                    'strandQuizzes': { title: 'Strand Quizzes', icon: 'fa-graduation-cap'},
                    'generalQuizzes': { title: 'General Knowledge', icon: 'fa-globe' }
                }, (key) => renderView(key === 'strandQuizzes' ? 'strandPicker' : 'generalQuizPicker', quizData[key]));
                contentArea.appendChild(homeGrid);
                break;
                
            case 'strandPicker':
                breadcrumbEl.textContent = `Home > Strand Quizzes`;
                const strandGrid = createPickerGrid(payload, (key) => renderView('specPicker', { strandKey: key, data: payload[key] }));
                contentArea.appendChild(strandGrid);
                break;
            
            case 'specPicker':
                const strand = quizData.strandQuizzes[payload.strandKey];
                breadcrumbEl.textContent = `Home > Strands > ${strand.title}`;
                const specGrid = createPickerGrid(strand.specializations, (key) => {
                    startQuiz(strand.specializations[key].questions, strand.specializations[key].title);
                });
                contentArea.appendChild(specGrid);
                break;

            case 'generalQuizPicker':
                breadcrumbEl.textContent = `Home > General Knowledge`;
                const generalGrid = createPickerGrid(payload, (key) => {
                    startQuiz(payload[key].questions, payload[key].title);
                });
                contentArea.appendChild(generalGrid);
                break;
        }
    }

    function createPickerGrid(dataObject, onClickCallback) {
        const grid = document.createElement('div');
        grid.className = 'picker-grid';
        for (const key in dataObject) {
            const item = dataObject[key];
            if (item && item.title) {
                const card = document.createElement('div');
                card.className = 'picker-card';
                card.innerHTML = `<i class="fas ${item.icon || 'fa-book-open'} icon"></i><h3 class="title">${item.title}</h3>`;
                card.onclick = () => onClickCallback(key);
                grid.appendChild(card);
            }
        }
        return grid;
    }

    function startQuiz(questions, title) {
        titleEl.textContent = title;
        breadcrumbEl.textContent = `Playing Quiz...`;
        quizState = {
            questions: [...questions].sort(() => 0.5 - Math.random()),
            score: 0,
            index: 0
        };
        renderQuestion();
    }
    
    function renderQuestion() {
        if (quizState.index >= quizState.questions.length) {
            renderFinalScore();
            return;
        }
        
        const q = quizState.questions[quizState.index];
        let optionsHTML = '';
        if (q.type === 'multiple-choice') {
            optionsHTML = q.options.map(opt => `<button class="option-btn">${opt}</button>`).join('');
        } else if (q.type === 'true-false') {
            optionsHTML = `<button class="option-btn">True</button><button class="option-btn">False</button>`;
        }
        
        contentArea.innerHTML = `
            <p id="quiz-question-text">${q.question}</p>
            <div id="quiz-options-container">${optionsHTML}</div>
            <div id="quiz-feedback-container"></div>
            <div id="quiz-status-container">
                <span>Question ${quizState.index + 1} of ${quizState.questions.length}</span>
                <button class="back-btn" id="next-btn" style="display: none;">Next <i class="fas fa-arrow-right"></i></button>
            </div>
        `;
        document.querySelectorAll('.option-btn').forEach(btn => btn.onclick = (e) => handleAnswer(e.target));
    }

    function handleAnswer(selectedButton) {
        const q = quizState.questions[quizState.index];
        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
        let isCorrect = false;
        if (q.type === 'multiple-choice') {
            isCorrect = selectedButton.textContent === q.answer;
        } else if (q.type === 'true-false') {
            isCorrect = (selectedButton.textContent.toLowerCase() === String(q.answer));
        }
        
        const feedbackContainer = document.getElementById('quiz-feedback-container');
        if (isCorrect) {
            quizState.score++;
            selectedButton.classList.add('correct');
            feedbackContainer.innerHTML = `<p class="feedback-text correct">Correct! ${q.funFact}</p>`;
        } else {
            selectedButton.classList.add('incorrect');
            feedbackContainer.innerHTML = `<p class="feedback-text incorrect">Not quite! ${q.funFact}</p>`;
            document.querySelectorAll('.option-btn').forEach(btn => {
                if ((q.type === 'multiple-choice' && btn.textContent === q.answer) || (q.type === 'true-false' && btn.textContent.toLowerCase() === String(q.answer))) {
                    btn.classList.add('correct');
                }
            });
        }
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('next-btn').onclick = () => { quizState.index++; renderQuestion(); };
    }

    function renderFinalScore() {
        titleEl.textContent = 'Quiz Complete!';
        breadcrumbEl.textContent = "You did great!";
        contentArea.innerHTML = `
            <div class="final-score-container">
                <h2>Congratulations!</h2>
                <p>Your final score is:</p>
                <p class="score-display">${quizState.score} / ${quizState.questions.length}</p>
                <div class="button-group">
                    <button class="back-btn" id="retry-btn"><i class="fas fa-redo"></i> Try Again</button>
                    <button class="back-btn" id="back-home-btn"><i class="fas fa-home"></i> Back to Home</button>
                </div>
            </div>
        `;
        document.getElementById('retry-btn').onclick = () => startQuiz(quizState.questions, titleEl.textContent);
        document.getElementById('back-home-btn').onclick = () => {
            state.history = [];
            renderView('home');
        };
    }
    
    // Initial Load
    renderView('home');
});