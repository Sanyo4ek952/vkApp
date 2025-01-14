export default {
    preset: 'ts-jest', // Используем ts-jest для обработки TypeScript
    testEnvironment: 'jsdom', // Для тестирования React-компонентов
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Файл с настройками
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Используем Babel для обработки файлов
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Мокаем CSS-модули
    },
    testMatch: ['**/?(*.)+(test).ts?(x)'], // Ищем файлы с суффиксом .test.ts или .test.tsx
};