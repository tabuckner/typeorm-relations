import { Tag } from '../../tags/entities/tag.entity';

export class CreatePhotoDto {
  name: string;
  description: string;
  filename: string;
  isPublished: boolean;
  userID?: string;
  tagIDs?: Array<Tag['id']>;
}
