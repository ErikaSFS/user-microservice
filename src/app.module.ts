import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from "./config/config.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'USER_MICROSERVICE',
      useFactory: (configService: ConfigService) => {
        const options = {
          transport: Transport.TCP,
          options: {
            host: configService.get('USERS_MICROSERVICE_HOST'),
            port: Number(configService.get('USERS_MICROSERVICE_PORT')),
          },
        };
        return ClientProxyFactory.create(options as ClientOptions);
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule {}