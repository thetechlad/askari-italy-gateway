import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			spacing: {
				// Default Tailwind spacing only defines .5 steps up to 3.5 — these
				// three were being used throughout (mb-4.5, py-5.5, px-6.5, etc.)
				// but silently generated no CSS at all since they're outside the
				// default scale. Extending it here fixes every existing usage.
				'4.5': '1.125rem',
				'5.5': '1.375rem',
				'6.5': '1.625rem',
			},
			fontFamily: {
				sans: ['Poppins', 'system-ui', 'sans-serif'],
				serif: ['Poppins', 'system-ui', 'sans-serif'],
			},
			colors: {
				askari: {
					navy: '#0B1736',
					navyDark: '#08112A',
					navyLight: '#13234A',
					navySlate: '#3B4560',
					cream: '#F7F4EC',
					white: '#FFFFFF',
					sand: '#E2E0D8',
					sandLight: '#EEECE6',
					gold: '#F5C518',
					goldDark: '#B88A00',
					goldLight: '#FFD43B',
					goldMuted: '#B88A00',
					green: '#1F6F4A',
					coral: '#D97757',
					coralLight: '#F0B6A0',
					sky: '#3F7CAC',
					whatsapp: '#25D366',
					whatsappDark: '#075E54',
					flagRed: '#CE2B37',
					flagGreen: '#009246',
					textBody: '#5B6478',
					textBody2: '#8A90A0',
					textBody3: '#3B4560',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-hero': 'var(--gradient-hero)',
			},
			boxShadow: {
				'elegant': 'var(--shadow-elegant)',
				'soft': 'var(--shadow-soft)',
				'gold': 'var(--shadow-gold)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' },
				},
				'pulse-ring': {
					'0%': { boxShadow: '0 0 0 0 rgba(37,211,102,0.45)' },
					'70%': { boxShadow: '0 0 0 14px rgba(37,211,102,0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(37,211,102,0)' },
				},
				fadeUp: {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'none' },
				},
				wiggle: {
					'0%, 100%': { transform: 'rotate(-1.5deg)' },
					'50%': { transform: 'rotate(1.5deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				marquee: 'marquee 26s linear infinite',
				'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite',
				'fade-up': 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1)',
				wiggle: 'wiggle 0.5s ease-in-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
