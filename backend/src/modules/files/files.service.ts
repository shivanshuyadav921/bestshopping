import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export class FileService {
  /**
   * Register uploaded file metadata in the database
   */
  static async registerFile({
    filename,
    url,
    fileType,
    size,
    ownerId,
    rfqId,
    orderId,
  }: {
    filename: string;
    url: string;
    fileType: string;
    size: number;
    ownerId: string;
    rfqId?: string;
    orderId?: string;
  }) {
    return await db.uploadedFile.create({
      data: {
        filename,
        url,
        fileType,
        size,
        ownerId,
        rfqId: rfqId || null,
        orderId: orderId || null,
      },
    });
  }

  /**
   * Verify if a user is allowed to access/download a file
   */
  static async canAccessFile(userId: string, userRole: UserRole, fileId: string): Promise<boolean> {
    // 1. Internal team (Owner, Admin, Engineers) can access all files
    const isEmployee = (
      [
        UserRole.OWNER,
        UserRole.ADMIN,
        UserRole.PRODUCTION_ENGINEER,
        UserRole.QUALITY_ENGINEER,
        UserRole.SALES_ENGINEER,
      ] as UserRole[]
    ).includes(userRole);

    if (isEmployee) return true;

    // 2. Fetch file to check ownership
    const file = await db.uploadedFile.findFirst({
      where: {
        id: fileId,
        deletedAt: null,
      },
    });

    if (!file) return false;

    // 3. Customer must be the owner of the file
    return file.ownerId === userId;
  }

  /**
   * Get file metadata
   */
  static async getFile(fileId: string) {
    return await db.uploadedFile.findFirst({
      where: {
        id: fileId,
        deletedAt: null,
      },
    });
  }

  /**
   * Soft delete a file
   */
  static async deleteFile(fileId: string, userId: string, userRole: UserRole) {
    const file = await this.getFile(fileId);
    if (!file) throw new Error("File not found");

    const canDelete = file.ownerId === userId || userRole === UserRole.OWNER || userRole === UserRole.ADMIN;
    if (!canDelete) throw new Error("Forbidden: Cannot delete this file");

    return await db.uploadedFile.update({
      where: { id: fileId },
      data: { deletedAt: new Date() },
    });
  }
}
