import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2563EB',
            light: '#60A5FA',
            dark: '#1D4ED8',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#0F766E',
            light: '#14B8A6',
            dark: '#115E59',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#16A34A',
            light: '#4ADE80',
            dark: '#15803D',
        },
        warning: {
            main: '#F59E0B',
            light: '#FBBF24',
            dark: '#D97706',
        },
        error: {
            main: '#DC2626',
            light: '#F87171',
            dark: '#B91C1C',
        },
        background: {
            default: '#F5F7FB',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#172033',
            secondary: '#64748B',
            disabled: '#94A3B8',
        },
    },

    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),

        h1: {
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
        },

        h2: {
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },

        h3: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.3,
        },

        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: 1.4,
        },

        h5: {
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.5,
        },

        h6: {
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: 1.5,
        },

        body1: {
            fontSize: '1rem',
            lineHeight: 1.7,
        },

        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },

        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#172033',
                    boxShadow: '0 1px 10px rgba(15, 23, 42, 0.06)',
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',

                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(37, 99, 235, 0.18)',
                        transform: 'translateY(-1px)',
                    },

                    '&.MuiButton-containedPrimary:hover': {
                        backgroundColor: '#1D4ED8',
                    },
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.07)',
                    border: '1px solid #E8ECF3',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },

        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: 20,
                    paddingRight: 20,
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,

                        '&:hover fieldset': {
                            borderColor: '#93C5FD',
                        },

                        '&.Mui-focused fieldset': {
                            borderWidth: '2px',
                        },
                    },
                },
            },
        },

        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    fontWeight: 500,
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;