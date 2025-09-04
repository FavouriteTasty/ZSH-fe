export const resizeImageToBase64 = (
    file: File,
    maxBytes: number,
    maxWidth = 512,
    maxHeight = 512,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target?.result as string;
        };

        img.onload = () => {
            const canvas = document.createElement("canvas");
            let { width, height } = img;

            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width = width * ratio;
                height = height * ratio;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject("Canvas context not found");

            ctx.drawImage(img, 0, 0, width, height);

            let quality = 0.9;
            let base64 = canvas.toDataURL("image/jpeg", quality);

            while (base64.length * 0.75 > maxBytes && quality > 0.1) {
                quality -= 0.1;
                base64 = canvas.toDataURL("image/jpeg", quality);
            }

            resolve(base64);
        };

        img.onerror = reject;
        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
};
