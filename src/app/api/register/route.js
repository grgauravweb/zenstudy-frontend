import User from '@/models/User';
import { bcrypt } from 'bcrypt';
import dbconnect from '@/lib/db';

export async function POST(req){
    try {
        await dbconnect()
        const {username, email, password: pass}=await req.json()
        const isExisting = await User.findOne({email})
        if(isExisting){
            throw new Error("User already exists")
        }
        const hashedPassword= await bcrypt.hash(pass, 10)
        const newUser = await User.create({username, email, password: hashedPassword})
        const {password, ...user} = newUser._doc
        return new Response(JSON.stringify(user), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify(user), {status: 500})
    }
}