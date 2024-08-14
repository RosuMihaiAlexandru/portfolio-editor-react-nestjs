import {
    IsString,
    IsNotEmpty,
    IsArray,
    IsOptional
} from 'class-validator';
export class CreatePortfolioDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required.' })
    "title": string;

    @IsNotEmpty({ message: 'Description is required.' })
    "description": string;

    @IsNotEmpty({ message: 'Livelink is required.' })
    "livelink": string;

    "status": boolean;

    // @IsArray()
    "skills": string[];

    @IsOptional()
    @IsString()
    image: string;


}