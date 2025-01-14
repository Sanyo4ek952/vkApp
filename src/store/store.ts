import { makeAutoObservable } from 'mobx';
import { fetchCharacters, Character } from '../services/api.ts';

type CharacterStatus = 'Dead' | 'unknown' | 'Alive' | null;
type CharacterDirection = 'asc' | 'desc';
type CharacterField = keyof Character | null;

class CharacterStore {
    characters: Character[] = [];
    filteredCharacters: Character[] = [];
    page = 1;
    loading = false;
    hasMore = true;
    sortField: CharacterField = null;
    sortDirection: CharacterDirection = 'asc';
    sortStatus: CharacterStatus = null;

    constructor() {
        makeAutoObservable(this);
    }

    loadCharacters = async () => {
        if (this.loading || !this.hasMore) return;

        this.loading = true;
        try {
            const response = await fetchCharacters(this.page);
            this.characters = [...this.characters, ...response.results];
            this.page += 1;
            this.hasMore = !!response.info.next;
            this.applyFilters();
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
        }
    };

    deleteCharacter = (id: number) => {
        this.characters = this.characters.filter(character => character.id !== id);
        this.applyFilters();
    };

    editCharacter = (id: number, newName: string) => {
        this.characters = this.characters.map(character =>
            character.id === id ? { ...character, name: newName } : character
        );
        this.applyFilters();
    };

    applyFilters = () => {
        let filteredCharacters = [...this.characters];

        if (this.sortStatus) {
            filteredCharacters = filteredCharacters.filter(
                character => character.status.toLowerCase() === this.sortStatus!.toLowerCase()
            );
        }

        if (this.sortField) {
            filteredCharacters.sort((a, b) => {
                if (a[this.sortField!] < b[this.sortField!]) return this.sortDirection === 'asc' ? -1 : 1;
                if (a[this.sortField!] > b[this.sortField!]) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        this.filteredCharacters = filteredCharacters;
    };

    setSortField = (field: keyof Character) => {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'asc';
        }
        this.applyFilters();
    };

    setSortStatus = (status: CharacterStatus) => {
        this.sortStatus = status;
        this.applyFilters();
    };
}

export const characterStore = new CharacterStore();