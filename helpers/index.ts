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

export const getGreetings = () => {
    const hours = new Date().getHours();
    switch (true) {
      case hours >= 0 && hours < 12:
        return 'Morning';
      case hours >= 12 && hours < 17:
        return 'Afternoon';
      case hours >= 17 && hours < 24:
        return 'Evening';
    }
  };