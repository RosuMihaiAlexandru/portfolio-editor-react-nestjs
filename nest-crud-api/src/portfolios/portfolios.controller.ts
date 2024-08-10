import { Controller, Get, Post, Body, Query, Res , Req, Put, Delete } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Request, Response } from 'express';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  async create(@Req() req:Request, @Res() res: Response, @Body() createPortfolioDto: CreatePortfolioDto) {
    let result:any  =  await this.portfoliosService.create(createPortfolioDto);
    return res.send(result);
  }

  @Get()
  async findAll(@Req() req:Request, @Res() res: Response) {
    let findAll: any =  await this.portfoliosService.findAll();
    return res.send(findAll);
  }

  @Get('/getOnePortfolio')
  async findOne(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let getOne : any = await this.portfoliosService.findOne(id);
    return res.send(getOne);
  }

  @Put('/updateOnePortfolios')
  async update(@Req() req:Request, @Res() res: Response, @Query('id') id: any, @Body() updatePortfolioDto: CreatePortfolioDto) {
    console.log(id, updatePortfolioDto)
    let updateOne : any = await this.portfoliosService.update(id, updatePortfolioDto);
    return res.send(updateOne);
  }

  @Delete('/deleteOnePortfolios')
  async remove(@Req() req:Request, @Res() res: Response, @Query('id') id: any) {
    let deleteOne : any = await this.portfoliosService.remove(id);
    return res.send(deleteOne);
  }
}