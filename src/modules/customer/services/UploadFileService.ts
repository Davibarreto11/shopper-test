import { injectable, inject } from "tsyringe";

import IStorageProvider from "../../../shared/container/providers/StorageProvider/models/IStorageProvider";

@injectable()
class UploadUserAvatarService {
  constructor(
    @inject("StorageProvider")
    private readonly storageProvider: IStorageProvider
  ) {}

  public async execute(avatarFilename: string | undefined): Promise<any> {
    if (avatarFilename) {
      const fileName = await this.storageProvider.saveFile(avatarFilename);

      return fileName;
    }
  }
}

export default UploadUserAvatarService;
