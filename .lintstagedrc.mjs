export default {
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
    '**/*.ts?(x)': () => 'npm run type-check',
    '*.{json,yaml}': ['prettier --write'],
};
