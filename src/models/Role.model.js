// Required Packeges
import { Schema, model } from 'mongoose'

const RoleSchema = Schema({}, { timestamps: true, versionKey: false })

// Make User Modelresult
const RoleModel = model('Role', RoleSchema)

// Export User Model
export default RoleModel
