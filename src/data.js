import egamecard from "./assets/egamecard.png";
import generalgamecard from "./assets/generalgamecard.png";
import geekcard from "./assets/geekcard.png";
import smecbanner from "./assets/smec_banner.png";
import qawalibanner from "./assets/qawali_banner.png";
import qawali from "./assets/qawali.png";

const events = [
  {
    id: 1,
    title: "SMEC 1",
    image: smecbanner,
    location: "London",
    dateRange: "November 13 2024 ",
    price: "$499.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "10",
  },
  {
    id: 2,
    title: "Qawali Night 1",
    image: qawalibanner,
    location: "London",
    dateRange: "November 14 2024",
    price: "$799.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "10",
  },
  {
    id: 3,
    title: "Annual Dinner 1",
    image: qawali,
    location: "Bristol",
    dateRange: "November 15 2024 ",
    price: "$199.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "3",
  },
  {
    id: 4,
    title: "Qawali Night 2",
    image: smecbanner,
    location: "Birmingham",
    dateRange: "November 20 2024 ",
    price: "$299.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "6",
  },
  {
    id: 5,
    title: "SMEC 2",
    image: qawali,
    location: "Bristol",
    dateRange: "November 15 2024 ",
    price: "$199.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "1",
  },
  {
    id: 6,
    title: "Annual Dinner 2",
    image: qawalibanner,
    location: "Birmingham",
    dateRange: "November 20 2024 ",
    price: "$299.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "11",
  },
  {
    id: 7,
    title: "Qawali Night 3",
    image:smecbanner,
    location: "Birmingham",
    dateRange: "November 20 2024 ",
    price: "$299.99",
    timeToEnd: "12:00 pm - 1:00 pm",
    daysLeft: "10",
  },
];

export default events;

export const smecgames = [
  {
    id: 1,
    image: egamecard,
    title: "E-Gaming",
    url: "/egames",
  },
  {
    id: 2,
    image: geekcard,
    title: "Geeks",
    url: "/geekgames",
  },
  {
    id: 3,
    image: generalgamecard,
    title: "General Games",
    url: "/generalgames",
  },
];

export const egames = [
  { id: 1, image: "https://via.placeholder.com/400", title: "FC24", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Exciting football simulation game.", price: "1,000", winprice: "1,500", playerslot: "1v1" },
  { id: 2, image: "https://via.placeholder.com/400", title: "Tekken 8", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Popular fighting game.", price: "1,000", winprice: "1,500", playerslot: "1v1" },
  { id: 3, image: "https://via.placeholder.com/400", title: "Need for Speed", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Thrilling racing game.", price: "1,000", winprice: "1,500", playerslot: "1v1" },
  { id: 4, image: "https://via.placeholder.com/400", title: "WWE 2K24", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Professional wrestling game.", price: "1,000", winprice: "1,500", playerslot: "1v1" },
  { id: 5, image: "https://via.placeholder.com/400", title: "Counter Strike 1.6", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Classic multiplayer shooter.", price: "2,000", winprice: "2,500", playerslot: "5v5" },
  { id: 6, image: "https://via.placeholder.com/400", title: "Counter Strike 2", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Latest version of CS.", price: "2,500", winprice: "3,000", playerslot: "5v5" },
  { id: 7, image: "https://via.placeholder.com/400", title: "PUBG", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Battle royale game.", price: "2,000", winprice: "2,500", playerslot: "4v4" },
  { id: 8, image: "https://via.placeholder.com/400", title: "Valorant", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Tactical shooter.", price: "2,500", winprice: "3,000", playerslot: "5v5" },
  { id: 9, image: "https://via.placeholder.com/400", title: "Free Fire", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Mobile battle royale game.", price: "2,000", winprice: "2,500", playerslot: "4v4" },
];

export const geekgames = [
  { id: 1, image: "https://via.placeholder.com/400", title: "Speed Programming", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Competitive coding challenge.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 2, image: "https://via.placeholder.com/400", title: "Speed Debugging", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Debugging challenge for developers.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 3, image: "https://via.placeholder.com/400", title: "UI/UX Designing", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Design competition.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 4, image: "https://via.placeholder.com/400", title: "Logo Designing", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Creative logo design competition.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 5, image: "https://via.placeholder.com/400", title: "Network Designing", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Network setup challenge.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 6, image: "https://via.placeholder.com/400", title: "Hackathon", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Hackathon for innovators.", price: "1,000", winprice: "1,500", playerslot: "Team" },
  { id: 7, image: "https://via.placeholder.com/400", title: "Data Analytics", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Insights through data.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 8, image: "https://via.placeholder.com/400", title: "Robo War", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Robot combat challenge.", price: "1,000", winprice: "1,500", playerslot: "1v1" },
];

export const generalgames = [
  { id: 1, image: "https://via.placeholder.com/400", title: "Futsal", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Fast-paced football game.", price: "2,500", winprice: "3,000", playerslot: "5v5" },
  { id: 2, image: "https://via.placeholder.com/400", title: "Chess", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Classic strategy game.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 3, image: "https://via.placeholder.com/400", title: "Tug of War", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Team strength competition.", price: "2,000", winprice: "2,500", playerslot: "Team" },
  { id: 4, image: "https://via.placeholder.com/400", title: "Photo Contest", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Photography competition.", price: "500", winprice: "700", playerslot: "Individual" },
  { id: 5, image: "https://via.placeholder.com/400", title: "Brain Games", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Test your cognitive skills.", price: "2,000", winprice: "2,500", playerslot: "Individual" },
  { id: 6, image: "https://via.placeholder.com/400", title: "Treasure Hunt", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Exciting treasure search.", price: "2,000", winprice: "2,500", playerslot: "Team" },
  { id: 7, image: "https://via.placeholder.com/400", title: "Scrabble", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Word-building game.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 8, image: "https://via.placeholder.com/400", title: "Arm Wrestling", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Test your strength.", price: "500", winprice: "700", playerslot: "1v1" },
  { id: 9, image: "https://via.placeholder.com/400", title: "Creative Writing", date: "21-Feb-2025", time: "08:00 PM", gamedesc: "Showcase your writing skills.", price: "500", winprice: "700", playerslot: "Individual" },
];

export const egameWinners = [
  { id: 1, name: "Rameez Rafiq", game: "FIFA 25" },
  { id: 2, name: "Ali Ahmed", game: "FIFA 25" },
  { id: 3, name: "Sara Khan", game: "FIFA 25" },
  { id: 4, name: "John Doe", game: "FIFA 25" },
  { id: 5, name: "Jane Smith", game: "FIFA 25" },
  { id: 6, name: "Michael Brown", game: "FIFA 25" },
  { id: 7, name: "Emily Davis", game: "FIFA 25" },
];

export const geekWinners = [
  { id: 1, name: "Rameez Rafiq", game: "FIFA 25" },
  { id: 2, name: "Ali Ahmed", game: "FIFA 25" },
  { id: 3, name: "Sara Khan", game: "FIFA 25" },
  { id: 4, name: "John Doe", game: "FIFA 25" },
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
  { id: 5, name: "Jane Smith", game: "FIFA 25" },
  { id: 6, name: "Michael Brown", game: "FIFA 25" },
  { id: 7, name: "Emily Davis", game: "FIFA 25" },
  { id: 8, name: "Alice Cooper", game: "FIFA 25" },
  { id: 9, name: "Steve Rogers", game: "FIFA 25" },
  { id: 10, name: "Tony Stark", game: "FIFA 25" },
];

export const sponsors = [
  { id: 1, name: "ABC" },
  { id: 2, name: "ABC" },
  { id: 3, name: "ABC" },
  { id: 4, name: "ABC" },
  { id: 5, name: "ABC" },
  { id: 6, name: "ABC" },
  { id: 7, name: "ABC" },
  { id: 8, name: "ABC" },
];
