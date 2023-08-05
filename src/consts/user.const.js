// Initialize Module
const UserConst = {}

UserConst.createFields = [
  'name',
  'email',
  'password',
  'username',
  'phone',
  'dob',
  'address',
]

UserConst.searchOptions = ['name', 'bio', 'username', 'address.city']
UserConst.sortOptions = [
  'name',
  'dob',
  'following',
  'followers',
  'address.city',
]
UserConst.filterOptions = ['address.city', 'username', 'active']

export default UserConst
