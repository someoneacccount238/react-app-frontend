import mongoose from "mongoose";

//дата
//кол-во калорий
//юзернейм
//пароль

const DaySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    calories: {
      type: Number,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Day", DaySchema);
