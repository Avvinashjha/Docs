import { useTheme } from "../ThemeManager/ThremeContext";

export default function ThemedButton() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            style={{
                backgroundColor: theme === 'light' ? '#fff' : '#333',
                color: theme === 'light' ? '#000' : '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
        >
            Toggle Theme
        </button>
    );
}