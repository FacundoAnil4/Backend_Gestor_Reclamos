import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Response } from 'express';
import * as fs from 'fs';

@Controller('uploads')
export class UploadController {

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|doc|docx)$/)) {
                return cb(new BadRequestException('Solo se permiten imágenes y documentos PDF/Word'), false);
            }
            cb(null, true);
        }
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('No se subió ningún archivo');


        return {
            url: `uploads/${file.filename}`,
            nombre_archivo: file.originalname,
            mimetype: file.mimetype
        };
    }

    @Get(':filename')
    serveFile(@Param('filename') filename: string, @Res() res: Response) {
        const path = `./uploads/${filename}`;
        if (fs.existsSync(path)) {
            return res.sendFile(filename, { root: './uploads' });
        } else {
            throw new BadRequestException('Archivo no encontrado');
        }
    }
}