import egamecard from "./assets/egamecard.png";
import generalgamecard from "./assets/generalgamecard.png";
import geekcard from "./assets/geekcard.png";
import smecbanner from "./assets/smec_banner.png";
import qawalibanner from "./assets/qawali_banner.png";
import qawali from "./assets/qawali.png";
import blood from "./assets/blood.png";

const events = [
  {
    id: 1,
    title: "SMEC 1",
    image: smecbanner, // Replace with actual image path
    location: "CS & IT Department",
    dateRange: "November 13, 2024",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "10",
    category: "smec",
  },
  {
    id: 2,
    title: "Qawali Night 1",
    image: qawalibanner, // Replace with actual image path
    location: "AIT Parking",
    dateRange: "November 14, 2024",
    price: "$799.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "10",
    category: "qawwali",
  },
  {
    id: 3,
    title: "Annual Dinner 1",
    image: qawali, // Replace with actual image path
    location: "AIT Parking",
    dateRange: "November 15, 2024",
    price: "$199.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "3",
    category: "dinner",
  },
  {
    id: 4,
    title: "Training session to implement OBE",
    description: "A comprehensive session on implementing OBE principles, focusing on curriculum development and assessment strategies.",
    dateRange: "12-Mar-2025",
    daysLeft: 15,
    location: "SSUET Auditorium",
    timeToEnd: "12:00 pm - 1:00 pm",
    image: "https://via.placeholder.com/400x300", 
    bannerImage: "https://via.placeholder.com/1200x600", 
    galleryImages: [
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 }
    ],
    category: "other"
  },
  {
    id: 5,
    title: "Intellectual Property Awareness Session - 1",
    description: "An informative session about the importance of intellectual property in the field of technology and business.",
    dateRange: "18-Mar-2025",
    daysLeft: 22,
    location: "SSUET Conference Room",
    timeToEnd: "12:00 pm - 1:00 pm",
    image: "https://via.placeholder.com/400x300", // Replace with actual event image URL
    bannerImage: "https://via.placeholder.com/1200x600", // Replace with actual banner image URL
    galleryImages: [
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 }
    ],
    category: "other"
  },
  {
    id: 6,
    title: "Cyber Security & AI Club Award Ceremony",
    description: "A prestigious award ceremony celebrating the achievements of students in the fields of Cyber Security and AI.",
    dateRange: "25-Mar-2025",
    daysLeft: 29,
    location: "SSUET Auditorium",
    timeToEnd: "12:00 pm - 1:00 pm",
    image: "https://via.placeholder.com/400x300", // Replace with actual event image URL
    bannerImage: "https://via.placeholder.com/1200x600", // Replace with actual banner image URL
    galleryImages: [
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 }
    ],
    category: "other"
  },
  {
    id: 7,
    title: "Intellectual Property Awareness Seminar - 2",
    description: "A follow-up seminar discussing more advanced topics on intellectual property laws and their applications.",
    dateRange: "30-Mar-2025",
    daysLeft: 34,
    location: "SSUET Conference Hall",
    timeToEnd: "12:00 pm - 1:00 pm",
    image: "https://via.placeholder.com/400x300", // Replace with actual event image URL
    bannerImage: "https://via.placeholder.com/1200x600", // Replace with actual banner image URL
    galleryImages: [
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 }
    ],
    category: "other"
  },
  {
    id: 8,
    title: "SSUET Sports Week Starts",
    description: "Join us for a week of exciting sports events and competitions hosted by SSUET.",
    dateRange: "05-Apr-2025",
    daysLeft: 40,
    location: "SSUET Sports Ground",
    timeToEnd: "12:00 pm - 1:00 pm",
    image: "https://via.placeholder.com/400x300", // Replace with actual event image URL
    bannerImage: "https://via.placeholder.com/1200x600", // Replace with actual banner image URL
    galleryImages: [
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 }
    ],
    category: "other"
  },
  {
    id: 9,
    title: "Blood Drive",
    description: "A combined event of blood donation drive and seminar on intellectual property awareness.",
    dateRange: "20-Apr-2025",
    daysLeft: 55,
    location: "SSUET Auditorium",
    timeToEnd: "12:00 pm - 1:00 pm",
    image: blood, 
    bannerImage: "https://via.placeholder.com/1200x600", // Replace with actual banner image URL
    galleryImages: [
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 6 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 },
      { url: "https://via.placeholder.com/400x300", gridSize: 4 }
    ],
    category: "other",
  }
];

export default events;

export const smecgames = [
  {
    id: 1,
    image: egamecard,
    title: "E-Gaming",
    url: "/smec/egames",
  },
  {
    id: 2,
    image: geekcard,
    title: "Geeks",
    url: "/smec/geekgames",
  },
  {
    id: 3,
    image: generalgamecard,
    title: "General Games",
    url: "/smec/generalgames",
  },
];

export const egames = [
  {
    id: 1,
    image: "https://via.placeholder.com/400",
    title: "FC24",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "FC24 is the latest installment in EA Sports' iconic football simulation series. It brings next-level realism with improved player animations, cutting-edge AI, and immersive gameplay. New features include expanded Career Mode, a refined Ultimate Team experience, and an updated roster. Whether you're managing your dream team or competing online, FC24 offers endless excitement for football enthusiasts.",
    price: "1,100",
    winprice: "1,500",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Esports Arena",
    category: "egames",
    organizer: "EA Sports",
    rules: [
      "Match duration: 15 minutes.",
      "No glitches or exploits allowed.",
      "Referee's decision is final.",
    ],
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400",
    title: "Tekken 8",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Tekken 8 takes the legendary fighting series to a new level with stunning visuals and refined combat mechanics. Each character has been carefully redesigned, featuring unique moves and abilities. The game introduces real-time combat effects, dynamic stages, and an engaging storyline. It's the ultimate test of skill and strategy for fighting game fans.",
    price: "1,000",
    winprice: "1,500",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Fighter's Ring",
    category: "egames",
    organizer: "Namco Bandai",
    rules: [
      "Rounds: Best of 3.",
      "Default controller setup only.",
      "No pausing during matches.",
    ],
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400",
    title: "Need for Speed",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Need for Speed delivers heart-pounding racing action with high-speed chases and customizable cars. Featuring an expansive open-world environment, players can compete in thrilling street races while avoiding the relentless pursuit of law enforcement. Experience the adrenaline rush with its dynamic weather system, photorealistic visuals, and engaging storylines.",
    price: "1,000",
    winprice: "1,500",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Speedway Arena",
    category: "egames",
    organizer: "EA Sports",
    rules: [
      "No shortcuts or track cutting allowed.",
      "Race duration: 10 minutes.",
      "Referee's decision is final.",
    ],
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400",
    title: "WWE 2K24",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Step into the ring with WWE 2K24, the premier wrestling simulation game. Build your legacy with improved graphics, lifelike animations, and an expanded roster of iconic WWE superstars. Compete in intense matches, relive classic moments, and customize your own wrestler. The game's innovative physics engine and immersive sound effects make it the ultimate wrestling experience.",
    price: "1,000",
    winprice: "1,500",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Wrestling Ring",
    category: "egames",
    organizer: "2K Sports",
    rules: [
      "No pausing or disconnecting.",
      "Default controller setup only.",
      "Referee's decision is final.",
    ],
  },
  {
    id: 5,
    image: "https://via.placeholder.com/400",
    title: "Counter Strike 1.6",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Counter Strike 1.6 is a classic multiplayer first-person shooter that defined the genre. Players take on the role of terrorists or counter-terrorists in fast-paced, strategic battles. Featuring iconic maps, precision shooting mechanics, and team-based gameplay, Counter Strike 1.6 remains a favorite among gaming enthusiasts worldwide.",
    price: "2,000",
    winprice: "2,500",
    playerslot: "5v5",
    registrationDeadline: "20-Jan-2025",
    venue: "CyberZone Arena",
    category: "egames",
    organizer: "Valve",
    rules: [
      "Match duration: 30 minutes.",
      "No ghosting or team switching.",
      "All matches are final.",
    ],
  },
  {
    id: 6,
    image: "https://via.placeholder.com/400",
    title: "Counter Strike 2",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Counter Strike 2 redefines competitive shooting with its upgraded graphics, improved physics, and advanced matchmaking system. Players engage in intense 5v5 battles across detailed maps, employing tactical strategies to outplay their opponents. With enhanced weapon mechanics and a vibrant online community, Counter Strike 2 is the ultimate FPS experience.",
    price: "2,500",
    winprice: "3,000",
    playerslot: "5v5",
    registrationDeadline: "20-Jan-2025",
    venue: "CyberZone Arena",
    category: "egames",
    organizer: "Valve",
    rules: [
      "Match duration: 30 minutes.",
      "No ghosting or team switching.",
      "All matches are final.",
    ],
  },
  {
    id: 7,
    image: "https://via.placeholder.com/400",
    title: "PUBG",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "PUBG is a groundbreaking battle royale game that pits players against each other in a fight for survival. Scavenge for weapons, gear, and supplies while navigating a massive, shrinking map. The game's immersive graphics, realistic combat, and strategic gameplay make it a favorite among gamers worldwide.",
    price: "2,000",
    winprice: "2,500",
    playerslot: "4v4",
    registrationDeadline: "20-Jan-2025",
    venue: "Virtual Arena",
    category: "egames",
    organizer: "Battle Games Inc.",
    rules: [
      "No cheating or use of third-party software.",
      "Teams must be ready 10 minutes before start time.",
      "Players must follow referee instructions.",
    ],
  },
  {
    id: 8,
    image: "https://via.placeholder.com/400",
    title: "Valorant",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Valorant is a tactical first-person shooter that combines precise gunplay with unique agent abilities. Engage in strategic 5v5 matches, using your agent's skills to gain the upper hand. With its competitive environment, advanced matchmaking, and dynamic maps, Valorant has set a new standard in tactical shooters.",
    price: "2,500",
    winprice: "3,000",
    playerslot: "5v5",
    registrationDeadline: "20-Jan-2025",
    venue: "Esports Hub",
    category: "egames",
    organizer: "Riot Games",
    rules: [
      "No toxic behavior or foul language.",
      "Rounds: Best of 3.",
      "Agent lock-in time: 60 seconds.",
    ],
  },
  {
    id: 9,
    image: "https://via.placeholder.com/400",
    title: "Free Fire",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Free Fire is an action-packed mobile battle royale game that offers quick, 10-minute matches. Drop into an island with 49 other players, loot weapons, and fight to be the last one standing. With its customizable characters, vibrant graphics, and unique gameplay modes, Free Fire delivers non-stop excitement for players on the go.",
    price: "2,000",
    winprice: "2,500",
    playerslot: "4v4",
    registrationDeadline: "20-Jan-2025",
    venue: "Mobile Gaming Arena",
    category: "egames",
    organizer: "Garena",
    rules: [
      "No cheating or hacks allowed.",
      "Players must use their own devices.",
      "Teams must arrive 30 minutes before the match.",
    ],
  },
];

export const geekgames = [
  {
    id: 1,
    image: "https://via.placeholder.com/400",
    title: "Speed Programming",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Speed Programming is an electrifying challenge where participants compete to solve complex coding problems in record time. It tests logic, efficiency, and programming skills under intense pressure. Ideal for competitive coders looking to showcase their expertise and innovation.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Tech Arena",
    category: "geekgames",
    organizer: "Code Masters",
    rules: [
      "No use of online resources.",
      "Time limit: 60 minutes.",
      "Submissions must compile successfully.",
    ],
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400",
    title: "Speed Debugging",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Speed Debugging is a race against time to identify and fix bugs in complex codebases. Test your analytical skills and attention to detail in this high-stakes competition. Perfect for developers who love solving puzzles under pressure.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Debuggers' Hub",
    category: "geekgames",
    organizer: "Code Gurus",
    rules: [
      "No external debugging tools allowed.",
      "Time limit: 45 minutes.",
      "Corrected code must pass all test cases.",
    ],
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400",
    title: "UI-UX Designing",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "UI/UX Designing is a creative challenge to design user-friendly and visually appealing interfaces. Participants will tackle real-world problems and showcase their ability to craft intuitive, innovative designs that enhance user experiences.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Design Studio",
    category: "geekgames",
    organizer: "Creative Minds",
    rules: [
      "Designs must be original.",
      "Time limit: 2 hours.",
      "Presentations are mandatory.",
    ],
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400",
    title: "Logo Designing",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Logo Designing invites participants to create innovative logos for fictional brands. This competition tests creativity, originality, and the ability to communicate a brand’s identity through visual design.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Art Studio",
    category: "geekgames",
    organizer: "Design Gurus",
    rules: [
      "Submissions must be in vector format.",
      "Time limit: 90 minutes.",
      "No use of pre-made templates.",
    ],
  },
  {
    id: 5,
    image: "https://via.placeholder.com/400",
    title: "Network Designing",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Network Designing tests participants' ability to architect efficient, secure, and scalable network solutions. This competition is perfect for IT professionals and students who thrive on solving complex network challenges.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Networking Lab",
    category: "geekgames",
    organizer: "IT Wizards",
    rules: [
      "Participants must use provided tools.",
      "Designs must include security measures.",
      "Time limit: 2 hours.",
    ],
  },
  {
    id: 6,
    image: "https://via.placeholder.com/400",
    title: "Hackathon",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Hackathon is an intense innovation challenge where teams work on groundbreaking projects in limited time. Collaborate, brainstorm, and build prototypes that solve real-world problems.",
    price: "1,000",
    winprice: "1,500",
    playerslot: "Team",
    registrationDeadline: "20-Jan-2025",
    venue: "Innovation Hub",
    category: "geekgames",
    organizer: "Tech Innovators",
    rules: [
      "Teams must present a functional prototype.",
      "Time limit: 24 hours.",
      "Original ideas only.",
    ],
  },
  {
    id: 7,
    image: "https://via.placeholder.com/400",
    title: "Data Analytics",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Data Analytics challenges participants to uncover insights from complex datasets. Showcase your skills in data cleaning, visualization, and predictive analysis in this thrilling competition.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Analytics Arena",
    category: "geekgames",
    organizer: "Data Wizards",
    rules: [
      "Use of external libraries is prohibited.",
      "Submissions must include visualizations.",
      "Time limit: 2 hours.",
    ],
  },
  {
    id: 8,
    image: "https://via.placeholder.com/400",
    title: "Robo War",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Robo War pits autonomous robots against each other in thrilling battles. Participants must design, program, and deploy robots to compete in a challenging arena.",
    price: "1,000",
    winprice: "1,500",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Battle Arena",
    category: "geekgames",
    organizer: "Robotics Club",
    rules: [
      "Robots must adhere to size and weight limits.",
      "No external interference during matches.",
      "Time limit: 5 minutes per match.",
    ],
  },
];

export const generalgames = [
  {
    id: 1,
    image: "https://via.placeholder.com/400",
    title: "Futsal",
    date: "21-Feb-2025",
    time: "07:00 PM",
    gamedesc:
      "Futsal is an exciting, fast-paced version of football played on a smaller field with fewer players. This game emphasizes skill, agility, and teamwork, making it perfect for football enthusiasts who love high-intensity action.",
    price: "2,500",
    winprice: "3,000",
    playerslot: "5v5",
    registrationDeadline: "20-Jan-2025",
    venue: "Outdoor Arena",
    category: "generalgames",
    organizer: "Sports Club",
    rules: [
      "Match duration: 20 minutes.",
      "Rolling substitutions allowed.",
      "Referee's decision is final.",
    ],
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400",
    title: "Chess",
    date: "21-Feb-2025",
    time: "07:30 PM",
    gamedesc:
      "Chess is the ultimate strategy game that tests your planning, foresight, and tactical skills. Compete head-to-head in this timeless battle of wits, where every move counts towards victory.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Mind Sports Hall",
    category: "generalgames",
    organizer: "Board Game Club",
    rules: [
      "Match duration: 20 minutes.",
      "Touch move rule applies.",
      "Referee's decision is final.",
    ],
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400",
    title: "Tug of War",
    date: "21-Feb-2025",
    time: "08:00 PM",
    gamedesc:
      "Tug of War is the ultimate test of strength, teamwork, and determination. Gather your team and pull with all your might in this thrilling and classic competition.",
    price: "2,000",
    winprice: "2,500",
    playerslot: "Team",
    registrationDeadline: "20-Jan-2025",
    venue: "Sports Ground",
    category: "generalgames",
    organizer: "Strength Society",
    rules: [
      "Teams must have equal members.",
      "No gloves or additional grip aids allowed.",
      "Referee's whistle signals the start.",
    ],
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400",
    title: "Photo Contest",
    date: "21-Feb-2025",
    time: "09:00 AM",
    gamedesc:
      "Showcase your photography skills in the Photo Contest. Capture moments that tell a story, and impress the judges with your creativity and technical expertise.",
    price: "500",
    winprice: "700",
    playerslot: "Individual",
    registrationDeadline: "20-Jan-2025",
    venue: "Exhibition Hall",
    category: "generalgames",
    organizer: "Creative Visionaries",
    rules: [
      "Photos must be original.",
      "No editing software allowed.",
      "Maximum of 3 submissions per participant.",
    ],
  },
  {
    id: 5,
    image: "https://via.placeholder.com/400",
    title: "Brain Games",
    date: "21-Feb-2025",
    time: "02:00 PM",
    gamedesc:
      "Challenge your intellect with Brain Games, a series of puzzles, riddles, and mental challenges designed to test your cognitive abilities and problem-solving skills.",
    price: "2,000",
    winprice: "2,500",
    playerslot: "Individual",
    registrationDeadline: "20-Jan-2025",
    venue: "Logic Lounge",
    category: "generalgames",
    organizer: "Puzzle Masters",
    rules: [
      "No use of calculators or electronic devices.",
      "Time limit: 30 minutes per round.",
      "Judges' decision is final.",
    ],
  },
  {
    id: 6,
    image: "https://via.placeholder.com/400",
    title: "Treasure Hunt",
    date: "21-Feb-2025",
    time: "10:00 AM",
    gamedesc:
      "Embark on an exciting adventure with Treasure Hunt. Solve clues, overcome obstacles, and race against time to uncover hidden treasures in this thrilling team event.",
    price: "2,000",
    winprice: "2,500",
    playerslot: "Team",
    registrationDeadline: "20-Jan-2025",
    venue: "Adventure Zone",
    category: "generalgames",
    organizer: "Explorers Club",
    rules: [
      "All team members must participate.",
      "No external assistance allowed.",
      "The first team to find the treasure wins.",
    ],
  },
  {
    id: 7,
    image: "https://via.placeholder.com/400",
    title: "Scrabble",
    date: "21-Feb-2025",
    time: "04:00 PM",
    gamedesc:
      "Scrabble is the classic word game that tests your vocabulary, strategy, and quick thinking. Play against worthy opponents and create high-scoring words to win.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Wordsmith Hall",
    category: "generalgames",
    organizer: "Linguistic Society",
    rules: [
      "Official Scrabble dictionary will be used.",
      "Time limit: 20 minutes per game.",
      "No use of mobile devices or external tools.",
    ],
  },
  {
    id: 8,
    image: "https://via.placeholder.com/400",
    title: "Arm Wrestling",
    date: "21-Feb-2025",
    time: "06:00 PM",
    gamedesc:
      "Test your strength and determination in Arm Wrestling. Compete head-to-head in this gripping contest of power and endurance.",
    price: "500",
    winprice: "700",
    playerslot: "1v1",
    registrationDeadline: "20-Jan-2025",
    venue: "Strength Arena",
    category: "generalgames",
    organizer: "Fitness Club",
    rules: [
      "Elbows must remain on the table at all times.",
      "No use of gloves or grip enhancers.",
      "Referee's decision is final.",
    ],
  },
  {
    id: 9,
    image: "https://via.placeholder.com/400",
    title: "Creative Writing",
    date: "21-Feb-2025",
    time: "11:00 AM",
    gamedesc:
      "Unleash your imagination in Creative Writing. Craft compelling stories, essays, or poems, and showcase your talent in this engaging and expressive competition.",
    price: "500",
    winprice: "700",
    playerslot: "Individual",
    registrationDeadline: "20-Jan-2025",
    venue: "Writers' Den",
    category: "generalgames",
    organizer: "Literary Society",
    rules: [
      "Topics will be assigned on the spot.",
      "Time limit: 60 minutes.",
      "No external assistance or plagiarism allowed.",
    ],
  },
];

export const egameWinners = [
  { id: 1, name: "Rameez Rafiq", game: "FIFA 25" },
  { id: 2, name: "Ali Ahmed", game: "FIFA 25" },
  { id: 3, name: "aa Khan", game: "FIFA 25" },
  { id: 4, name: "John Doe", game: "FIFA 25" },
  { id: 5, name: "Jane Smith", game: "FIFA 25" },
  { id: 6, name: "Michael Brown", game: "FIFA 25" },
  { id: 7, name: "Emily Davis", game: "FIFA 25" },
];

export const geekWinners = [
  { id: 1, name: "Rameez Rafiq", game: "FIFA 25" },
  { id: 2, name: "Ali Ahmed", game: "FIFA 25" },
  { id: 3, name: "Sara Khan", game: "FIFA 25" },
  { id: 4, name: "John hooo", game: "FIFA 25" },
  { id: 5, name: "Jane Smith", game: "FIFA 25" },
  { id: 6, name: "Michael Brown", game: "FIFA 25" },
  { id: 7, name: "Emily Davis", game: "FIFA 25" },
  { id: 8, name: "Alice Cooper", game: "FIFA 25" },
  { id: 9, name: "Steve Rogers", game: "FIFA 25" },
  { id: 10, name: "Tony Stark", game: "FIFA 25" },
  { id: 11, name: "Natasha Romanoff", game: "FIFA 25" },
  { id: 12, name: "Bruce Wayne", game: "FIFA 25" },
];

export const generalGameWinners = [
  { id: 1, name: "Rameez Rafiq", game: "FIFA 25" },
  { id: 2, name: "Ali Ahmed", game: "FIFA 25" },
  { id: 3, name: "Sara Khan", game: "FIFA 25" },
  { id: 4, name: "John Doe", game: "FIFA 25" },
  { id: 5, name: "Jane Smbhhhith", game: "FIFA 25" },
  { id: 6, name: "Michael Brown", game: "FIFA 25" },
  { id: 7, name: "Emily Davis", game: "FIFA 25" },
  { id: 8, name: "Alice Cooper", game: "FIFA 25" },
  { id: 9, name: "Steve Rogers", game: "FIFA 25" },
  { id: 10, name: "Tony Stark", game: "FIFA 25" },
];

export const sponsors = [
  { id: 1, name: "Asim Fragrance" },
  { id: 2, name: "NBP" },
  { id: 3, name: "PowerPlay" },
  { id: 4, name: "Uzma Enterprises" },
  { id: 5, name: "Tech 20Four" },
  { id: 6, name: "P@SHA" },
  { id: 7, name: "HBL" },
  { id: 8, name: "Bano Qabil" },
]

export const newsData = [
  {
    id: 1,
    title: "Taylor Swift in Biggest World",
    description:
      "Lorem ipsum dolor donec bibendum laishiaj oi asjfasj alskjfldsakf massa erat the ultrices nulla.",
    author: "Jonathan Wills",
    date: "July 17, 2024",
    time: "5 min read",
    image: smecbanner,
  },
  {
    id: 2,
    title: "Royal Albert Hall New Events",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "Marian Ed",
    date: "June 13, 2024",
    time: "10 min read",
    image: qawalibanner,
  },
  {
    id: 3,
    title: "Yanni Will Be in London",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "Jack Nikelson",
    date: "May 08, 2024",
    time: "7 min read",
    image: qawali,
  },
  {
    id: 4,
    title: "Jazz Night Special Concert",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "Sara Bennett",
    date: "April 22, 2024",
    time: "8 min read",
    image: qawalibanner,
  },
  {
    id: 5,
    title: "Classical Fusion Event",
    description:
      "Lorem ipsum dolor sit amet consectetur. Vivamus donec bibendum massa erat the ultrices nulla.",
    author: "David Turner",
    date: "March 10, 2024",
    time: "6 min read",
    image: smecbanner,
  },
];
