// @/utils/fetchPetImages.js
import { Platform } from 'react-native';

export const fetchPetImages = async (pets, token) => {
  const urls = {};

  for (const pet of pets) {
    try {
      const res = await fetch(`http://192.168.1.15:8080/yowpet/pet/${pet.id}/photo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.warn(`Image not found for pet ${pet.id}`);
        continue;
      }

      const blob = await res.blob();

      // Use React Native compatible image URI
      const reader = new FileReader();
      const readPromise = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
      reader.readAsDataURL(blob);
      const base64Image = await readPromise;

      urls[pet.id] = base64Image;
    } catch (error) {
      console.warn(`Failed to load image for pet ${pet.id}`, error);
    }
  }

  return urls;
};
