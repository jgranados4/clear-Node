import mongoose from "mongoose";

interface Options{
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase{

  static async connect(options:Options){
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl,{
        dbName:dbName,
      });
      console.log('MongoDB connection success');
      return true;
    } catch (error) {
      console.log('MongoDB connection error');
      throw error;
    }
  }

}