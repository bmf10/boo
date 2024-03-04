import mongoose, { ObjectId } from 'mongoose'

export const mbti = [
  'INFP',
  'INFJ',
  'ENFP',
  'ENFJ',
  'INTJ',
  'INTP',
  'ENTP',
  'ENTJ',
  'ISFP',
  'ISFJ',
  'ESFP',
  'ESFJ',
  'ISTP',
  'ISTJ',
  'ESTP',
  'ESTJ',
] as const

export type MbtiType = (typeof mbti)[number]

export const enneagram = [
  '1w2',
  '2w3',
  '3w2',
  '3w4',
  '4w3',
  '4w5',
  '5w4',
  '5w6',
  '6w5',
  '6w7',
  '7w6',
  '7w8',
  '8w7',
  '8w9',
  '9w8',
  '9w1',
] as const

export type EnneagramType = (typeof enneagram)[number]

export const zodiac = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const

export type ZodiacType = (typeof zodiac)[number]

export interface IComment {
  readonly profileId: ObjectId
  readonly userId: ObjectId
  readonly title: string
  readonly description: string
  readonly mbti: MbtiType
  readonly enneagram: EnneagramType
  readonly zodiac: ZodiacType
  readonly likeCount: number
  readonly createdAt: Date
  readonly updateAt: Date
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    profileId: {
      type: mongoose.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mbti: {
      type: String,
    },
    enneagram: {
      type: String,
    },
    zodiac: {
      type: String,
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Comment ||
  mongoose.model<IComment>('Comment', CommentSchema, 'comments')
