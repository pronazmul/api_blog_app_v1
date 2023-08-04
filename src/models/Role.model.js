// Required Packeges
import { Schema, model } from 'mongoose'

const RoleSchema = Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String, required: true }],
    description: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
)

// Make User Modelresult
const RoleModel = model('Role', RoleSchema)

// Export User Model
export default RoleModel
