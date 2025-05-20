import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: {
            DEFAULT: '#0d1117',
            secondary: '#161b22',
            tertiary: '#21262d',
          },
          surface: {
            DEFAULT: '#1a1f24',
            hover: '#24292e',
            active: '#2d333b',
          },
          border: {
            DEFAULT: '#30363d',
            light: '#484f58',
            focus: '#58a6ff',
          },
          text: {
            primary: '#f0f6fc',
            secondary: '#c9d1d9',
            tertiary: '#8b949e',
            disabled: '#6e7681',
          },
          accent: {
            primary: {
              DEFAULT: '#7ee787',
              hover: '#56d364',
              muted: 'rgba(126, 231, 135, 0.15)',
            },
            blue: {
              DEFAULT: '#58a6ff',
              muted: 'rgba(88, 166, 255, 0.15)',
            },
            purple: {
              DEFAULT: '#bc8cff',
              muted: 'rgba(188, 140, 255, 0.15)',
            },
            pink: {
              DEFAULT: '#ff7b72',
              muted: 'rgba(255, 123, 114, 0.15)',
            },
            orange: {
              DEFAULT: '#ffa657',
              muted: 'rgba(255, 166, 87, 0.15)',
            },
          },
          status: {
            danger: {
              DEFAULT: '#f85149',
              muted: 'rgba(248, 81, 73, 0.15)',
            },
            warning: {
              DEFAULT: '#f0883e',
              muted: 'rgba(240, 136, 62, 0.15)',
            },
            success: {
              DEFAULT: '#56d364',
              muted: 'rgba(86, 211, 100, 0.15)',
            },
            info: {
              DEFAULT: '#58a6ff',
              muted: 'rgba(88, 166, 255, 0.15)',
            },
          },
        },
        bg: '#0d1117',
        surface: '#1a1f24',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        default: {
          200: '#333333',
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: '#56d364',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        danger: '#f85149',
        warning: '#f0883e',
        success: '#56d364',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        h1: ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        h3bold: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        body: ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5' }],
      },
      fontWeight: {
        bold: '700',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-slow-reverse': 'spin 25s linear infinite reverse',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
        'bar-change': 'bar-change 0.5s ease-in-out'
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
        'bar-change': {
          '0%': { opacity: '0.5', transform: 'scaleY(0.9)' },
          '100%': { opacity: '1', transform: 'scaleY(1)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 229, 153, 0.5), 0 0 20px rgba(0, 229, 153, 0.3)',
        'neon-hover': '0 0 15px rgba(0, 229, 153, 0.6), 0 0 30px rgba(0, 229, 153, 0.4)',
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'dark-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'dark-outline': '0 0 0 3px rgba(0, 229, 153, 0.5)',
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
