import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const [username, password] = process.argv.slice(2);

if (!username || !password) {
    console.error('Usage: node src/scripts/createUser.js <username> <password>');
    process.exit(1);
}

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/klima');

    const existing = await User.findOne({ username });
    if (existing) {
        console.error(`User "${username}" already exists.`);
        process.exit(1);
    }

    await User.create({ username, password, isAdmin: true });
    console.log(`User "${username}" created.`);
    await mongoose.disconnect();
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
