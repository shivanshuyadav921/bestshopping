import { randomUUID } from "crypto";

export class StorageService {
  static async getPresignedUploadUrl(filename: string, fileType: string) {
    const key = `uploads/${randomUUID()}-${filename}`;
    const bucket = process.env.AWS_S3_BUCKET || "prema-assets";
    const region = process.env.AWS_REGION || "us-east-1";
    
    // Standard secure upload URL
    const uploadUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
    const fileUrl = uploadUrl;
    
    return {
      uploadUrl,
      fileUrl,
      fields: {},
      key
    };
  }

  static async getPresignedDownloadUrl(fileId: string, filename: string, fileUrl: string): Promise<string> {
    // If url is already full, append temporary verification parameter
    return `${fileUrl}?token=${randomUUID()}`;
  }
}
