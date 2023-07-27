// Required Packeges
import { Schema, model } from 'mongoose'

const RoleSchema = Schema(
  {
    name: String,
    permissions: [{ type: String }],
    description: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

// Make User Modelresult
const RoleModel = model('Role', RoleSchema)

// Export User Model
export default RoleModel
