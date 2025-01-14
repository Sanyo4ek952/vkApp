import CharacterList from './components/CharacterList';
import styles from './App.module.css'

const App = () => {
    return (
        <div className={styles.App}>
            <h1>Rick and Morty Characters</h1>
            <CharacterList/>
        </div>
    );
};

export default App;