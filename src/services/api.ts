import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';


type ApiResponse = {
    info: {
        next: string | null;
    };
    results: Character[];
}


export type Character ={
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
}

export const fetchCharacters = async (page: number): Promise<ApiResponse> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/character?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке персонажей:', error);
        throw error;
    }
};