import mongoose from 'mongoose';

const MONGOURL = process.env.MONGOURL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL, {
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
