import mongoose from "mongoose";



const PostShema = new mongoose.Schema({

      text: {
        type: String,
      required: true
      },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Post', PostShema);