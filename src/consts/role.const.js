// Initialize Module
const RoleConst = {}

// Searching | Sorting | Filtering
RoleConst.searchOptions = ['name', 'city']
RoleConst.filterOptions = ['age', 'roles', 'status', 'city']
RoleConst.sortOptions = []

RoleConst.defaultRole = 'user'

RoleConst.rolesData = [
  {
    name: 'admin',
    permissions: [
      'full_access',
      'manage_users',
      'manage_roles',
      'manage_categories',
      'manage_blogs',
      'manage_tags',
      'manage_comments',
      'manage_likes',
      'manage_followers',
      'manage_notifications',
    ],
    description: 'Full access to all features and settings of the application.',
  },
  {
    name: 'moderator',
    permissions: [
      'manage_users',
      'manage_blogs',
      'manage_tags',
      'manage_comments',
    ],
    description: 'Ability to manage users,blogs and comments',
  },
  {
    name: 'user',
    permissions: [
      'create_edit_own_blogs',
      'manage_tags',
      'comment_on_blogs',
      'like_blogs',
      'follow_users',
    ],
    description:
      'Ability to create and edit their own blogs. Can manage tags, comment on blogs, like blogs, and follow other users.',
  },
]

export default RoleConst
