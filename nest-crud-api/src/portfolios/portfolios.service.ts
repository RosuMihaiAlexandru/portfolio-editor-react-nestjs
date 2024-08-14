import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { Multer } from 'multer'; // Import Multer type
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfoliosRepository: MongoRepository<Portfolio>,
  ) { }

  async create(createPortfolioDto: CreatePortfolioDto, file: Multer.File) {

    const { title, description, livelink, skills, status } = createPortfolioDto;

    // Define the uploads directory
    const uploadsDir = path.join(process.cwd(), 'uploads');

    // Check if the uploads directory exists, if not, create it
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Define the file path
    let filePath = "";
    let randomFileName = "";
    if (file) {
      // Generate a random string
      const randomName = crypto.randomBytes(16).toString('hex');
      // Get the file extension
      const fileExtension = path.extname(file.originalname);
      // Combine the random name with the file extension
      randomFileName = `${randomName}${fileExtension}`;
      // Define the full path where the file will be saved
      filePath = path.join(uploadsDir, randomFileName);

      // Save the file to the desired location
      fs.writeFileSync(filePath, file.buffer);
    }

    const createPortfolioObj = {
      title,
      description,
      livelink,
      skills,
      status,
      image: randomFileName
    };

    const portfoliosDetails = await this.portfoliosRepository.save(createPortfolioObj);
    return {
      msg: 'Data added successfully',
      status: HttpStatus.OK,
      data: portfoliosDetails,
    };
  }

  async findAll() {
    return await this.portfoliosRepository.find();
  }

  async findOne(id: any) {
    console.log(id)
    const result: any = await this.portfoliosRepository.findOne(id);
    console.log(result);
    if (!result) throw new BadRequestException({ error: "Data Not Found" });
    return {
      status: HttpStatus.OK,
      messsage: "Data fetch successfully",
      totalData: result && result.length ? result.length : 0,
      result: result
    }
  }

  async update(id: any, updatePortfolioDto: CreatePortfolioDto) {
    const result: any = await this.portfoliosRepository.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatePortfolioDto });

    return {
      status: HttpStatus.OK,
      messsage: "Data updated successfully",
      totalData: result && result.length ? result.length : 0,
      result: result
    }
  }


  async remove(id: any) {
    const result: any = await this.portfoliosRepository.findOneAndDelete({ _id: new ObjectId(id) });
    return {
      status: HttpStatus.OK,
      messsage: "Data deleted successfully",
      totalData: result && result.length ? result.length : 0,
      result: result
    }
  }
}