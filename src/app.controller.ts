import { Body, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { IsString, IsEmail } from 'class-validator';
import { ClientProxy, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('User_Microservices') private readonly, 
    client: ClientProxy,
    private readonly AppService: AppService
  ) {}

  @MessagePattern('create_user')
  async createUser(@Payload() payload: 
  CreateUserDto) {
    const user = await 
    this.appService.createUser(payload);
    return user;
  }

  @post('create-user')
 async  creareUser(@Body() Payload: CreateUserDto) {
   return this.client.send( 'create_user',
   Payload).toPromise();
 }   
 }


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
