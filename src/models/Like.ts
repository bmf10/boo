import mongoose, { ObjectId } from 'mongoose'

export interface ILike {
  readonly commentId: ObjectId
  readonly userId: ObjectId
  readonly createdAt: Date
  readonly updateAt: Date
}

const LikeSchema = new mongoose.Schema<ILike>(
  {
    commentId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Like ||
  mongoose.model<ILike>('Like', LikeSchema, 'likes')
