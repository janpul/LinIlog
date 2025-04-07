import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with the actual API base URL

export const fetchRiverStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/river-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching river statistics:', error);
    throw error;
  }
};

export const signPetition = async (signatureData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sign-petition`, signatureData);
    return response.data;
  } catch (error) {
    console.error('Error signing the petition:', error);
    throw error;
  }
};