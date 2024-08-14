import { Controller, Get, Post, Body, Query, Res, Req, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { Request, Response } from 'express';
import { PortfoliosService } from './portfolios.service';
import { Multer } from 'multer'; // Import Multer type

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPortfolioDto: CreatePortfolioDto,
    @UploadedFile() file: Multer.File
  ) {

    if (typeof createPortfolioDto.skills === 'string') {
      try {
        
        createPortfolioDto.skills = JSON.parse(createPortfolioDto.skills as unknown as string);
        console.log("############", createPortfolioDto.skills);

      } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Error" })
      }
      // createPortfolioDto.skills = JSON.parse(createPortfolioDto.skills as unknown as string);
    }

    console.log(createPortfolioDto.skills);


    // Handle the uploaded file and any other logic
    let result: any = await this.portfoliosService.create(createPortfolioDto, file);
    return res.send(result);
  }

  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    let findAll: any = await this.portfoliosService.findAll();
    return res.send(findAll);
  }

  @Get('/getOnePortfolio')
  async findOne(@Req() req: Request, @Res() res: Response, @Query('id') id: any) {
    let getOne: any = await this.portfoliosService.findOne(id);
    return res.send(getOne);
  }

  @Put('/updateOnePortfolios')
  async update(@Req() req: Request, @Res() res: Response, @Query('id') id: any, @Body() updatePortfolioDto: CreatePortfolioDto) {
    console.log(id, updatePortfolioDto)
    let updateOne: any = await this.portfoliosService.update(id, updatePortfolioDto);
    return res.send(updateOne);
  }

  @Delete('/deleteOnePortfolios')
  async remove(@Req() req: Request, @Res() res: Response, @Query('id') id: any) {
    let deleteOne: any = await this.portfoliosService.remove(id);
    return res.send(deleteOne);
  }
}