import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://admin:jyg4!muVwEmG*5b@sass-app.wa2bfb6.mongodb.net/',
      database: 'portfolios',
      useNewUrlParser: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    PortfoliosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
