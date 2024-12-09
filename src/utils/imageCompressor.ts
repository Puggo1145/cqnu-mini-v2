/**
 * 压缩单张图片
 * @param imagePath 单张图片的路径
 * @param quality 压缩质量，默认为80
 * @returns 压缩后的图片路径
 */
export default function compressImages(imagePath: string, quality?: number): Promise<string>;

/**
 * 压缩多张图片
 * @param imagePaths 多张图片的路径数组
 * @param quality 压缩质量，默认为80
 * @returns 压缩后的图片路径数组
 */
export default function compressImages(imagePaths: string[], quality?: number): Promise<string[]>;

/**
 * 实现压缩图片的函数
 * @param imagePath 图片路径或路径数组
 * @param quality 压缩质量，默认为80
 * @returns 压缩后的图片路径或路径数组
 * @description 使用 uni.compressImage 压缩图片
 */
export default async function compressImages(imagePath: string | string[], quality: number = 80): Promise<string | string[]> {
    // 将单个路径转换为数组,方便统一处理
    const paths = Array.isArray(imagePath) ? imagePath : [imagePath];

    try {
        // 使用 Promise.all 并发处理多张图片
        const compressedPaths = await Promise.all(paths.map(async (path) => {
            try {
                const result = await uni.compressImage({
                    src: path,
                    quality: quality
                });
                return result.tempFilePath;
            } catch (err) {
                uni.showToast({
                    title: '图片压缩失败',
                    icon: 'none',
                    duration: 1200
                });
                return path; // 如果压缩失败,返回原路径
            }
        }));

        // 如果输入是单个路径,返回单个结果;否则返回数组
        return Array.isArray(imagePath) ? compressedPaths : compressedPaths[0];
    } catch (err) {
        uni.showToast({
            title: '图片压缩失败',
            icon: 'none',
            duration: 1200
        });

        throw err;
    }
}