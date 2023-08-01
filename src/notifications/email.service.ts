import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService{
    constructor(private readonly configService: ConfigService) {
        SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    }

    async sendActivationCode(name:string,code:string, email:string){
        SendGrid.send({
            to: email,
            subject: 'Invitation | IvoryPay',
            from: 'no-reply@dillionsoft.com',
            text: `Dear ${name}, you have been invited to IvoryPay. Click following link to accept the invitation. ${this.configService.get<string>('FE_URL')}?code=${code}`,
            html: `<p>Dear ${name}, you have been invited to IvoryPay. Click following link to accept the invitation.</p>
            <a href=${this.configService.get<string>('FE_URL')}?code=${code}>Accept Invitation</a>`
        })
    }
}