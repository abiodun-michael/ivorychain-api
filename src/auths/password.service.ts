import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import * as Crypto from 'crypto';

@Injectable()
export class PasswordService{
    constructor(){}

    async hashPassword(password:string){
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt);
    }

    async comparePassword(hash:string, plain:string){
        return await bcrypt.compare(plain, hash);
    }

    generateCode(){
        const size = 21
        return Crypto.randomBytes(size).toString('base64').slice(0, size)
    }
}