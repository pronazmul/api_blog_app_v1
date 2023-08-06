// Initialize Module
const UserConst = {}

UserConst.createFields = [
  'name',
  'email',
  'password',
  'username',
  'phone',
  'dob',
  'bio',
  'address',
]

UserConst.updateFields = ['name', 'username', 'phone', 'dob', 'bio', 'address']

UserConst.searchOptions = [
  'name',
  'bio',
  'username',
  'address.city',
  'role.name',
]
UserConst.sortOptions = [
  'name',
  'dob',
  'following',
  'followers',
  'address.city',
]
UserConst.filterOptions = ['address.city', 'username', 'active']

export default UserConst
