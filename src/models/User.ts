import mongoose from 'mongoose'

export interface IUser {
  readonly name: string
  readonly email: string
  readonly image?: string
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
})

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema, 'users')
