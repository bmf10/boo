import mongoose from 'mongoose'
import { EnneagramType, MbtiType, ZodiacType } from './Comment'

export interface IProfile {
  readonly name: string
  readonly image?: string
  readonly mbti: MbtiType
  readonly enneagram: EnneagramType
  readonly zodiac: ZodiacType
}

const ProfileSchema = new mongoose.Schema<IProfile>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  mbti: {
    type: String,
    required: true,
  },
  enneagram: {
    type: String,
    required: true,
  },
  zodiac: {
    type: String,
    required: true,
  },
})

export default mongoose.models.Profile ||
  mongoose.model<IProfile>('Profile', ProfileSchema, 'profiles')
