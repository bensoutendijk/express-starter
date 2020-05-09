import mongoose, { Schema, Document } from 'mongoose';
import { OAuthUser } from '../types';

export interface OAuthUserModel extends Document, OAuthUser {
  
}

const oauthUserSchema = new Schema({
  data: {
    username: {
      type: String,
      required: true,
    },
    userid: {
      type: Number,
      required: true,
    },
  },
  tokens: {
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Number,
      required: true,
    },
  },
  provider: String,
}, { timestamps: true });

mongoose.model<OAuthUserModel>('OAuthUser', oauthUserSchema);
