import { PartialType } from '@nestjs/mapped-types';
import { CreateAigptDto } from './create-aigpt.dto';

export class UpdateAigptDto extends PartialType(CreateAigptDto) {}
