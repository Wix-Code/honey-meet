export const initialChats = [
  {
    id: 1,
    name: "Nindy Lendika",
    lastMessage: "How're you doing today?",
    time: "2 PM",
    image: require("../assets/images/3.jpg"),
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    lastMessage: "See you tomorrow!",
    time: "1:30 PM",
    image: require("../assets/images/2.jpg"),
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: 3,
    name: "Mike Wilson",
    lastMessage: "Thanks for the help",
    time: "12:45 PM",
    image: require("../assets/images/5.jpg"),
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: 4,
    name: "Emma Davis",
    lastMessage: "That sounds great!",
    time: "11:20 AM",
    image: require("../assets/images/4.jpg"),
    isOnline: true,
    unreadCount: 1,
  },
  {
    id: 5,
    name: "James Brown",
    lastMessage: "I'll check it out",
    time: "Yesterday",
    image: require("../assets/images/1.jpg"),
    isOnline: false,
    unreadCount: 0,
  },
];

export // Sample matches data
const matchesData = [
  {
    id: 1,
    name: "Wisdom",
    location: "FCT, Abuja",
    distance: "2.4 Km",
    image: require("../assets/images/1.jpg"),
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 2,
    name: "Sarah",
    location: "Lagos, Nigeria",
    distance: "5.1 Km",
    image: require("../assets/images/2.jpg"),
    isOnline: true,
    isFavorite: false,
  },
  {
    id: 3,
    name: "Amara",
    location: "Port Harcourt",
    distance: "1.8 Km",
    image: require("../assets/images/3.jpg"),
    isOnline: false,
    isFavorite: true,
  },
  {
    id: 4,
    name: "Chioma",
    location: "Enugu, Nigeria",
    distance: "3.2 Km",
    image: require("../assets/images/4.jpg"),
    isOnline: true,
    isFavorite: false,
  },
  {
    id: 5,
    name: "Blessing",
    location: "Ibadan, Oyo",
    distance: "4.5 Km",
    image: require("../assets/images/1.jpg"),
    isOnline: false,
    isFavorite: false,
  },
  {
    id: 6,
    name: "Jennifer",
    location: "Kano, Nigeria",
    distance: "0.9 Km",
    image: require("../assets/images/2.jpg"),
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 7,
    name: "Grace",
    location: "Calabar, Nigeria",
    distance: "6.7 Km",
    image: require("../assets/images/3.jpg"),
    isOnline: false,
    isFavorite: false,
  },
  {
    id: 8,
    name: "Faith",
    location: "Benin City",
    distance: "2.1 Km",
    image: require("../assets/images/5.jpg"),
    isOnline: true,
    isFavorite: true,
  },
];

export const accounts = [
  {
    name: "Personal Info",
    details: [
      {
        id: 1,
        name: "Profile",
        icon: "",
      },
      {
        id: 2,
        name: "Payment Method",
        icon: "",
      },
    ],
  },
  {
    name: "Security",
    details: [
      {
        id: 1,
        name: "Change Password",
        icon: "",
      },
      {
        id: 2,
        name: "Forgot Password",
        icon: "",
      },
      {
        id: 3,
        name: "Security",
        icon: "",
      },
    ],
  },
  {
    name: "General",
    details: [
      {
        id: 1,
        name: "Language",
        icon: "",
      },
      {
        id: 2,
        name: "Clear Cache",
        icon: "",
      },
    ],
  },
  {
    name: "About",
    details: [
      {
        id: 1,
        name: "Legal and Policies",
        icon: "",
      },
      {
        id: 2,
        name: "Help & Support",
        icon: "",
      },
    ],
  },
];
