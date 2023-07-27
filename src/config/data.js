// Initialize Module
const DummyData = {}

DummyData.users = [
  {
    name: 'Nazmul Huda',
    password: 'Password@1234',
    email: 'nazmul@gmail.com',
    mobile: '01746000000',
    roles: ['admin'],
    avatar: 'abcd.png',
    age: 10,
    city: 'a',
  },
  {
    name: 'Sumit Saha',
    password: 'Password@1234',
    email: 'sumit@gmail.com',
    mobile: '01746000001',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 20,
    city: 'b',
  },
  {
    name: 'Jhanker Mahabub',
    password: 'Password@1234',
    email: 'jhankar@gmail.com',
    mobile: '01746000002',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 30,
    city: 'c',
  },
  {
    name: 'Brad Traversy',
    password: 'Password@1234',
    email: 'traversy@gmail.com',
    mobile: '01746000003',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 40,
    city: 'd',
  },
  {
    name: 'Fayzul Karim',
    password: 'Password@1234',
    email: 'fayzul@gmail.com',
    mobile: '01746000004',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 50,
    city: 'e',
  },
  {
    name: 'Sunny Sungha',
    password: 'Password@1234',
    email: 'sunny@gmail.com',
    mobile: '01746000005',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 60,
    city: 'f',
  },
  {
    name: 'Adrian Twrag',
    password: 'Password@1234',
    email: 'adrian@gmail.com',
    mobile: '01746000006',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 70,
    city: 'g',
  },
  {
    name: 'Tanvir Hasan',
    password: 'Password@1234',
    email: 'tanvir@gmail.com',
    mobile: '01746000007',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 80,
    city: 'h',
  },
  {
    name: 'Hasin Hayder',
    password: 'Password@1234',
    email: 'hasin@gmail.com',
    mobile: '01746000008',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 90,
    city: 'i',
  },
  {
    name: 'Rashadul Alam',
    password: 'Password@1234',
    email: 'rashadul@gmail.com',
    mobile: '01746000009',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 100,
    city: 'j',
  },
  {
    name: 'Hafizul Hayder',
    password: 'Password@1234',
    email: 'hafuzul@gmail.com',
    mobile: '01746000010',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 110,
    city: 'k',
  },
  {
    name: 'Tonmoy',
    password: 'Password@1234',
    email: 'tonmoy@gmail.com',
    mobile: '01746000011',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 120,
    city: 'l',
  },
  {
    name: 'Abdul Ahad',
    password: 'Password@1234',
    email: 'ahad@gmail.com',
    mobile: '01746000012',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 3,
    city: 'm',
  },
  {
    name: 'Mr Alauddin',
    password: 'Password@1234',
    email: 'alauddin@gmail.com',
    mobile: '01746000013',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 140,
    city: 'n',
  },
  {
    name: 'Hafuzur Babu',
    password: 'Password@1234',
    email: 'babu@gmail.com',
    mobile: '01746000014',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 150,
    city: 'o',
  },
  {
    name: 'Jahid Hasan',
    password: 'Password@1234',
    email: 'jahid@gmail.com',
    mobile: '01746000016',
    roles: ['user'],
    avatar: 'abcd.png',
    age: 160,
    city: 'p',
  },
]

DummyData.address = [
  {
    addressLine: 'Gulshan 2',
    postCode: '1307',
    city: 'Gulshan',
    country: 'Bangladesh',
  },
  {
    addressLine: 'Banani',
    postCode: '1203',
    city: 'Mohakhali',
    country: 'Bangladesh',
  },
  {
    addressLine: 'Taltola, Mirpur Road',
    postCode: '1204',
    city: 'Mirpur',
    country: 'Bangladesh',
  },
  {
    addressLine: 'BCS Computer City',
    postCode: '1207',
    city: 'Agargaon',
    country: 'Bangladesh',
  },
  {
    addressLine: 'Elephant Road, Motaleb Plaza',
    postCode: '1557',
    city: 'Dhanmondi',
    country: 'Bangladesh',
  },
]

DummyData.blogs = [
  {
    title: 'The Best Travel Destinations for Adventurers',
    description:
      "Explore some of the world's most breathtaking destinations for adrenaline seekers and adventure enthusiasts.",
    category: 'Travel',
    banner: 'hotel-1.jpg',
  },
  {
    title: '10 Ways to Boost Your Personal Growth and Development',
    description:
      'Tips and strategies to help you reach your personal growth and development goals, from self-reflection to taking action.',
    category: 'Personal Development',
    banner: 'hotel-2.jpg',
  },
  {
    title: 'Healthy and Delicious Recipes for the Whole Family',
    description:
      'Discover new and exciting recipes that are both nutritious and satisfying, perfect for family dinners and gatherings.',
    category: 'Food and Recipe',
    banner: 'hotel-3.jpg',
  },
  {
    title: 'The Latest Trends in Technology You Should Know About',
    description:
      'Stay up-to-date with the latest technology trends, from artificial intelligence to blockchain and beyond.',
    category: 'Technology',
    banner: 'hotel-4.jpg',
  },
  {
    title: '10 Effective Workout Routines to Improve Your Fitness',
    description:
      'Get fit and healthy with these effective workout routines, designed to help you build strength, endurance, and flexibility.',
    category: 'Fitness',
    banner: 'hotel-5.jpg',
  },
  {
    title: 'How to Start a Successful Online Business',
    description:
      'Learn the basics of starting an online business, from creating a business plan to building a website and marketing your products or services.',
    category: 'Business',
    banner: 'hotel-6.jpg',
  },
  {
    title: 'The Top Travel Destinations for Budget-Conscious Travelers',
    description:
      "Discover affordable travel destinations that won't break the bank, from hidden gems to popular tourist spots with budget-friendly options.",
    category: 'Travel',
    banner: 'hotel-7.jpg',
  },
  {
    title: '5 Mindfulness Practices to Help You Stay Present and Focused',
    description:
      'Discover the benefits of mindfulness and learn practical techniques to help you stay present and focused in your daily life.',
    category: 'Personal Development',
    banner: 'hotel-8.jpg',
  },
  {
    title: 'Comfort Food Recipes for Cozy Nights In',
    description:
      'Warm up with these comforting and delicious recipes, perfect for cozy nights in with family and friends.',
    category: 'Food and Recipe',
    banner: 'hotel-9.jpg',
  },
  {
    title: 'The Future of Work: How Technology is Changing the Workplace',
    description:
      'Explore the latest trends in workplace technology and how they are impacting the way we work and do business.',
    category: 'Technology',
    banner: 'hotel-10.jpg',
  },
]

export default DummyData
