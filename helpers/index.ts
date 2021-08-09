import { distanceTo } from 'geolocation-utils';

export const generateImgScr = (image: string) => {
    if (!image) {
        return '';
    }
    return image.replace('https://img.katchkw.com', '');
};

export const distance = (from: any, center: any) => {
    if (center && from)
        return (distanceTo(from, center) / 1000).toFixed(1);
    else
        return ""
}
