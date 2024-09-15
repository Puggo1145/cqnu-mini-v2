interface ImageUploadParams {
    uploadFile: string;
    bucket: "cqnu-v2-img";
    objectName: "rating-item" | "easy-note";
}

interface ImageUploadResponse {
    code: string;
    data: string;
    success: boolean;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const uploadImages = async (params: ImageUploadParams) => {
    try {
        const token = uni.getStorageSync("token");
        if (!token) {
            uni.showToast({
                title: "请先登录",
                icon: "error",
            });

            return null;
        }

        const res = await uni.uploadFile({
            url: `${baseUrl}oss/v1/images/upload`, // Replace with your actual upload URL
            header: {
                authentication: token,
            },
            filePath: params.uploadFile,
            name: 'uploadFile', // The name of the form data parameter
            formData: {
                bucket: params.bucket,
                objectName: params.objectName,
            },
        });

        const serverData = JSON.parse(res.data) as ImageUploadResponse;

        if (serverData.success) {
            return serverData.data;
        } else {
            uni.showToast({
                title: "上传图片失败",
                icon: "error",
            });

            return null;
        }
    } catch (err) {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        });

        return null;
    }
};
