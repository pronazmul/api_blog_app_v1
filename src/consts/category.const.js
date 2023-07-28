// Initialize Module
const CategoryConst = {}

// Searching | Sorting | Filtering
CategoryConst.searchOptions = ['name', 'city']
CategoryConst.filterOptions = ['age', 'roles', 'status', 'city']
CategoryConst.sortOptions = []

CategoryConst.categoryData = [
  {
    title: 'Sports',
    description: 'Stay updated with the latest sports news and events.',
    image: 'sports.jpg',
    subCategories: [
      {
        name: 'Football',
        image: 'football.webp',
        description: 'Keep track of football matches, teams, and players.',
      },
      {
        name: 'Basketball',
        image: 'basketball.jpg',
        description: 'Follow the excitement of basketball games and leagues.',
      },
      {
        name: 'Tennis',
        image: 'tennis.webp',
        description: 'Get the latest updates from the world of tennis.',
      },
    ],
  },
  {
    title: 'Business',
    description:
      'Explore the world of business, finance, and entrepreneurship.',
    image: 'business.jpg',
    subCategories: [
      {
        name: 'Finance',
        image: 'finance.jpg',
        description: 'Stay informed about financial markets and investments.',
      },
      {
        name: 'Startups',
        image: 'startups.png',
        description:
          'Discover the latest news and success stories of startups.',
      },
      {
        name: 'Entrepreneurship',
        image: 'entrepreneurship.webp',
        description: 'Learn from successful entrepreneurs and their journeys.',
      },
    ],
  },
  {
    title: 'Technology',
    description: 'Explore the latest tech trends and innovations.',
    image: 'technology.jpg',
    subCategories: [
      {
        name: 'Gadgets',
        image: 'gadgets.jpeg',
        description: 'Discover the coolest gadgets in the market.',
      },
      {
        name: 'Artificial Intelligence',
        image: 'ai.webp',
        description:
          'Learn about the fascinating world of Artificial Intelligence.',
      },
      {
        name: 'Internet of Things',
        image: 'iot.webp',
        description: 'Explore the interconnected world of IoT devices.',
      },
    ],
  },
  {
    title: 'Learning',
    description: 'Expand your knowledge with various educational topics.',
    image: 'learning.jpg',
    subCategories: [
      {
        name: 'Science',
        image: 'science.jpg',
        description: 'Stay informed about the latest scientific discoveries.',
      },
      {
        name: 'History',
        image: 'history.jpg',
        description: 'Dive into the past and learn about historical events.',
      },
      {
        name: 'Programming',
        image: 'programming.webp',
        description:
          'Enhance your coding skills and learn programming languages.',
      },
    ],
  },
]

export default CategoryConst
