import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfoliosRepository: MongoRepository<Portfolio>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const  { title, description, livelink, skills, status } = createPortfolioDto;
    let createPortfolioObj = {
      title : title,
      description : description,
      livelink : livelink,
      skills : skills,
      status : status
    }
    const portfoliosDetails = await this.portfoliosRepository.save(createPortfolioObj);
    return {
      msg : "Data Added successfully",
      status:HttpStatus.OK,
      data:portfoliosDetails
    };
  }

  async findAll() {
    return await this.portfoliosRepository.find();
  }

  async findOne(id: any) {
    console.log(id)
    const result : any = await this.portfoliosRepository.findOne(id);
    console.log(result);
    if(!result) throw new BadRequestException({ error : "Data Not Found" });
    return {
      status  : HttpStatus.OK,
      messsage : "Data fetch successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }

  async update(id: any, updatePortfolioDto: CreatePortfolioDto) {
    const result : any = await this.portfoliosRepository.findOneAndUpdate({_id: new ObjectId(id) }, { $set: updatePortfolioDto });
    
    return {
      status  : HttpStatus.OK,
      messsage : "Data updated successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
}


  async remove(id: any) {
    const result : any = await this.portfoliosRepository.findOneAndDelete({_id: new ObjectId(id)});
    return {
      status  : HttpStatus.OK,
      messsage : "Data deleted successfully",
      totalData : result && result.length ? result.length :  0,
      result : result
    }
  }
}