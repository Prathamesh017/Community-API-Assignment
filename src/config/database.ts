import mongoose from 'mongoose'
async function connectDB() {
  await mongoose.connect(process.env.DATABASE_URL!).then(() => {
    console.log('Connected to database ')
  }).catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })
}

export default connectDB;