import { IsNotEmpty, IsString, MaxLength } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    readonly password: string;

    
}