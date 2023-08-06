// Initialize Module
const ProjectionConst = {}

ProjectionConst.userAuth =
  'role name email username password avatar phone dob bio followers following address active'

ProjectionConst.user =
  'role name email username avatar phone dob bio followers following address active'
ProjectionConst.user_with_follower = 'name username avatar bio'

ProjectionConst.role = 'name permissions description active'
ProjectionConst.role_with_user = 'name'

ProjectionConst.follower = 'follower following active createdAt'

export default ProjectionConst
