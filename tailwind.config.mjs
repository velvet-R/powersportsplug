import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  // Merged content tracks to accommodate standard Next.js layouts, standard Payload subdirectories, and root components
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],

  // Preserves Payload's explicit administrative layout selection styling
  darkMode: 'class',

  // Fully merged administrative layout components and custom asset safelist rules
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'bg-surface',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'text-status-available',
    'text-status-on-order',
    'text-status-sold',
    'bg-condition-new',
    'bg-condition-used',
  ],

  theme: {
    // Retains Payload's layout grid containers for proper dashboard rendering
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },

    extend: {
      colors: {
        // Core dark motorsport palette integration
        background: '#0F0F12',
        surface: '#1C1C24',
        border: '#27272A',
        'border-hover': '#3F3F46',

        // Primary accent: blazing racing orange
        primary: {
          DEFAULT: '#FF4500',
          hover: '#FF5722',
          muted: '#FF450022',
          foreground: '#FFFFFF',
        },

        // Utility accent: yellow/gold for badges and ratings
        accent: {
          DEFAULT: '#FFB703',
          foreground: '#0F0F12',
        },

        // Text hierarchy matching your specification
        foreground: '#F4F4F5',
        'muted-foreground': '#A1A1AA',
        subtle: '#52525B',

        // Dedicated status and condition tokens for powersports catalog states
        'status-available': '#22C55E',
        'status-on-order': '#FFB703',
        'status-sold': '#EF4444',
        'condition-new': '#3B82F6',
        'condition-used': '#78716C',

        // Retaining fallback aliases for standard administrative interfaces
        card: {
          DEFAULT: '#1C1C24',
          foreground: '#F4F4F5',
        },
        success: '#22C55E',
        error: '#EF4444',
        warning: '#FFB703',
      },

      // Merging your fluid typography scaling directly with standard line heights
      fontSize: {
        hero: ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        section: ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        card: ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.2' }],
      },

      // Sharp, micro-radius definitions to drive the aggressive motorsport design system
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },

      // Immersive glowing textures for interaction states and asset badges
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 69, 0, 0.35)',
        'glow-gold': '0 0 16px rgba(255, 183, 3, 0.3)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },

      // High-performance background layouts
      backgroundImage: {
        'grid-dark':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zm0 39h40v1H0zM0 0v40h1V0zm39 0v40h1V0z' fill='%2327272A' fill-opacity='0.4'/%3E%3C/svg%3E\")",
        'hero-gradient': 'linear-gradient(135deg, #0F0F12 0%, #1a0a00 50%, #0F0F12 100%)',
        'card-gradient': 'linear-gradient(180deg, transparent 60%, rgba(15,15,18,0.95) 100%)',
        'orange-glow':
          'radial-gradient(ellipse at center, rgba(255,69,0,0.15) 0%, transparent 70%)',
      },

      // Clean typography system using your CSS variables
      fontFamily: {
        display: ['"Barlow Condensed"', '"Oswald"', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },

      // Merged keyframes tracking system
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeOut: { from: { opacity: '1' }, to: { opacity: '0' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 10px rgba(255,69,0,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255,69,0,0.6)' },
        },
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        in: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0%)' } },
        out: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(100%)' } },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        blink: { '0%, 100%': { opacity: '0.2' }, '20%': { opacity: '1' } },
      },

      // Merged animation presets
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        ticker: 'ticker 30s linear infinite',
        in: 'in 0.2s ease-out',
        out: 'out 0.2s ease-out',
        carousel: 'ticker 60s linear infinite',
        blink: 'blink 1.4s both infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      // Standard prose integration
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#F4F4F5',
            '--tw-prose-headings': '#F4F4F5',
            h1: {
              fontFamily: '"Barlow Condensed", "Oswald", sans-serif',
              textTransform: 'uppercase',
              fontWeight: '700',
            },
            a: {
              color: '#FF4500',
              '&:hover': {
                color: '#FF5722',
              },
            },
          },
        },
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [
    require('@tailwindcss/typography'),
    // Unified functional delay utility plugin matching scaffold output
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        },
      )
    }),
  ],
}
