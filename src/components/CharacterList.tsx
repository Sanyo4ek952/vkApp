import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react';
import { characterStore } from '../store/store.ts';
import { Spin } from 'antd';
import styles from './CharacterList.module.css';

const CharacterList = observer(() => {
    useEffect(() => {
        characterStore.loadCharacters();
    }, []);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const bottom =
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
        if (bottom && !characterStore.loading && characterStore.hasMore) {
            characterStore.loadCharacters();
        }
    }, []);

    const statusButtons: { status: 'Dead' | 'unknown' | 'Alive' | null; label: string }[] = [
        { status: null, label: 'Все' },
        { status: 'Dead', label: 'Dead' },
        { status: 'unknown', label: 'Unknown' },
        { status: 'Alive', label: 'Alive' },
    ];

    return (
        <div>
            <div className={styles.container}>
                <span className={styles.strong}>Сортировать по:</span>
                <button
                    onClick={() => characterStore.setSortField('name')}
                    className={styles.sortButton}
                >
                    {'Имя'} {characterStore.sortField === 'name' ? (characterStore.sortDirection === 'asc' ? '▲' : '▼') : ''}
                </button>
            </div>

            <div className={styles.container}>
                <span className={styles.strong}>Фильтровать по статусу:</span>
                {statusButtons.map(({ status, label }) => (
                    <button
                        key={status || 'all'}
                        onClick={() => characterStore.setSortStatus(status)}
                        className={styles.sortButton}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div onScroll={handleScroll} className={styles.listContainer}>
                {characterStore.filteredCharacters.map(character => (
                    <div key={character.id} className={styles.characterItem}>
                        <img
                            src={character.image}
                            alt={character.name}
                            className={styles.characterImage}
                        />
                        <div className={styles.characterInfo}>
                            <h3 className={styles.characterName}>{character.name}</h3>
                            <p className={styles.characterDetails}>
                                {character.status} - {character.species}
                            </p>
                        </div>
                        <button
                            onClick={() => characterStore.deleteCharacter(character.id)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                        <input
                            defaultValue={character.name}
                            onBlur={(e) => characterStore.editCharacter(character.id, e.target.value)}
                            className={styles.editInput}
                        />
                    </div>
                ))}
                {characterStore.loading && (
                    <div className={styles.loadingContainer}>
                        <Spin size="large"/>
                    </div>
                )}
            </div>
        </div>
    );
});

export default CharacterList;