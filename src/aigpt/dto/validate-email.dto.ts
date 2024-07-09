
import { IsNotEmpty, IsString } from 'class-validator';
export class MailValidator{
    @IsNotEmpty()
    @IsString()
    wholeMail:string
    @IsNotEmpty()
    @IsString()
    subject:string
    @IsNotEmpty()
    @IsString()
    email:string
}