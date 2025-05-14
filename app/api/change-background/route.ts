import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';


export const POST = async (req: NextRequest) => {
    try {
        const { foregroundPath, backgroundPath } = await req.json();

        const resolvedBackgroundPath = path.join(process.cwd(), 'public', backgroundPath);


        const foregroundBuffer = Buffer.from(foregroundPath, 'base64');
        const foreground = sharp(foregroundBuffer);

        const { width, height } = await foreground.metadata();

        const padding = 50; 
        const paddedForeground = await foreground
            .extend({
                top: 0,
                bottom: 0,
                left: padding,
                right: padding,
                background: { r: 0, g: 0, b: 0, alpha: 0 }, 
            })
            .toBuffer();

        const background = sharp(resolvedBackgroundPath);
        const resizedBackground = await background.resize(width! + 2 * padding, height).toBuffer();

        const processedImageBuffer = await sharp(resizedBackground)
            .composite([{ input: paddedForeground, blend: 'over' }])
            .toBuffer();

        const uniqueName = `${uuidv4()}.png`;

        return new NextResponse(processedImageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename=${uniqueName}`,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
    }
};
