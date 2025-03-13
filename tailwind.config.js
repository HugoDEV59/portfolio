/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'neon-blue': 'rgb(var(--neon-blue))',
          'neon-purple': 'rgb(var(--neon-purple))',
          'neon-pink': 'rgb(var(--neon-pink))',
          'neon-green': 'rgb(var(--neon-green))',
          'neon-orange': 'rgb(var(--neon-orange))',
          'neon-yellow': 'rgb(var(--neon-yellow))',
          'dark': 'rgb(var(--dark))',
          'darker': 'rgb(var(--darker))',
          'light': 'rgb(var(--light))',
        },
        fontFamily: {
          sans: ['var(--font-geist-sans)'],
          mono: ['var(--font-geist-mono)'],
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'cyber-grid': `
            linear-gradient(to right, rgba(var(--neon-blue), 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--neon-blue), 0.05) 1px, transparent 1px)
          `,
          'cyber-grid-purple': `
            linear-gradient(to right, rgba(var(--neon-purple), 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--neon-purple), 0.05) 1px, transparent 1px)
          `,
          'cyber-grid-pink': `
            linear-gradient(to right, rgba(var(--neon-pink), 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--neon-pink), 0.05) 1px, transparent 1px)
          `,
          'neon-gradient-blue': 'linear-gradient(to right, rgba(var(--neon-blue), 0.7), rgba(var(--neon-blue), 0.3))',
          'neon-gradient-purple': 'linear-gradient(to right, rgba(var(--neon-purple), 0.7), rgba(var(--neon-purple), 0.3))',
          'neon-gradient-pink': 'linear-gradient(to right, rgba(var(--neon-pink), 0.7), rgba(var(--neon-pink), 0.3))',
          'neon-gradient-green': 'linear-gradient(to right, rgba(var(--neon-green), 0.7), rgba(var(--neon-green), 0.3))',
          'neon-gradient-orange': 'linear-gradient(to right, rgba(var(--neon-orange), 0.7), rgba(var(--neon-orange), 0.3))',
          'neon-gradient-yellow': 'linear-gradient(to right, rgba(var(--neon-yellow), 0.7), rgba(var(--neon-yellow), 0.3))',
          'neon-gradient-multi': 'linear-gradient(to right, rgba(var(--neon-blue), 0.7), rgba(var(--neon-purple), 0.7), rgba(var(--neon-pink), 0.7))',
        },
        boxShadow: {
          'neon-blue': '0 0 15px rgba(var(--neon-blue), 0.7)',
          'neon-purple': '0 0 15px rgba(var(--neon-purple), 0.7)',
          'neon-pink': '0 0 15px rgba(var(--neon-pink), 0.7)',
          'neon-green': '0 0 15px rgba(var(--neon-green), 0.7)',
          'neon-orange': '0 0 15px rgba(var(--neon-orange), 0.7)',
          'neon-yellow': '0 0 15px rgba(var(--neon-yellow), 0.7)',
          'neon-blue-lg': '0 0 25px rgba(var(--neon-blue), 0.8), 0 0 40px rgba(var(--neon-blue), 0.5)',
          'neon-purple-lg': '0 0 25px rgba(var(--neon-purple), 0.8), 0 0 40px rgba(var(--neon-purple), 0.5)',
          'neon-pink-lg': '0 0 25px rgba(var(--neon-pink), 0.8), 0 0 40px rgba(var(--neon-pink), 0.5)',
          'neon-green-lg': '0 0 25px rgba(var(--neon-green), 0.8), 0 0 40px rgba(var(--neon-green), 0.5)',
          'neon-orange-lg': '0 0 25px rgba(var(--neon-orange), 0.8), 0 0 40px rgba(var(--neon-orange), 0.5)',
          'neon-yellow-lg': '0 0 25px rgba(var(--neon-yellow), 0.8), 0 0 40px rgba(var(--neon-yellow), 0.5)',
        },
        animation: {
          'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'spin-slow': 'spin 20s linear infinite',
          'float': 'float 6s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'neon-pulse': 'neon-pulse 2s infinite alternate',
          'neon-pulse-purple': 'neon-pulse-purple 2s infinite alternate',
          'neon-pulse-pink': 'neon-pulse-pink 2s infinite alternate',
          'neon-pulse-green': 'neon-pulse-green 2s infinite alternate',
          'neon-pulse-orange': 'neon-pulse-orange 2s infinite alternate',
          'neon-pulse-yellow': 'neon-pulse-yellow 2s infinite alternate',
          'border-pulse': 'border-pulse 2s infinite alternate',
          'scanline': 'scanline 2s linear infinite',
          'grid-pulse': 'grid-pulse 8s infinite alternate',
          'particle-float': 'particle-float 15s infinite linear',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          glow: {
            '0%': { textShadow: '0 0 5px rgba(var(--neon-blue), 0.7), 0 0 10px rgba(var(--neon-blue), 0.5)' },
            '100%': { textShadow: '0 0 10px rgba(var(--neon-blue), 0.9), 0 0 20px rgba(var(--neon-blue), 0.7), 0 0 30px rgba(var(--neon-blue), 0.5)' },
          },
          'neon-pulse': {
            '0%': { textShadow: '0 0 5px rgba(var(--neon-blue), 0.7), 0 0 10px rgba(var(--neon-blue), 0.5), 0 0 15px rgba(var(--neon-blue), 0.3)' },
            '100%': { textShadow: '0 0 10px rgba(var(--neon-blue), 0.9), 0 0 20px rgba(var(--neon-blue), 0.7), 0 0 30px rgba(var(--neon-blue), 0.5), 0 0 40px rgba(var(--neon-blue), 0.3)' },
          },
          'neon-pulse-purple': {
            '0%': { textShadow: '0 0 5px rgba(var(--neon-purple), 0.7), 0 0 10px rgba(var(--neon-purple), 0.5), 0 0 15px rgba(var(--neon-purple), 0.3)' },
            '100%': { textShadow: '0 0 10px rgba(var(--neon-purple), 0.9), 0 0 20px rgba(var(--neon-purple), 0.7), 0 0 30px rgba(var(--neon-purple), 0.5), 0 0 40px rgba(var(--neon-purple), 0.3)' },
          },
          'neon-pulse-pink': {
            '0%': { textShadow: '0 0 5px rgba(var(--neon-pink), 0.7), 0 0 10px rgba(var(--neon-pink), 0.5), 0 0 15px rgba(var(--neon-pink), 0.3)' },
            '100%': { textShadow: '0 0 10px rgba(var(--neon-pink), 0.9), 0 0 20px rgba(var(--neon-pink), 0.7), 0 0 30px rgba(var(--neon-pink), 0.5), 0 0 40px rgba(var(--neon-pink), 0.3)' },
          },
          'neon-pulse-green': {
            '0%': { textShadow: '0 0 5px rgba(var(--neon-green), 0.7), 0 0 10px rgba(var(--neon-green), 0.5), 0 0 15px rgba(var(--neon-green), 0.3)' },
            '100%': { textShadow: '0 0 10px rgba(var(--neon-green), 0.9), 0 0 20px rgba(var(--neon-green), 0.7), 0 0 30px rgba(var(--neon-green), 0.5), 0 0 40px rgba(var(--neon-green), 0.3)' },
          },
          'neon-pulse-orange': {
            '0%': { textShadow: '0 0 5px rgba(var(--neon-orange), 0.7), 0 0 10px rgba(var(--neon-orange), 0.5), 0 0 15px rgba(var(--neon-orange), 0.3)' },
            '100%': { textShadow: '0 0 10px rgba(var(--neon-orange), 0.9), 0 0 20px rgba(var(--neon-orange), 0.7), 0 0 30px rgba(var(--neon-orange), 0.5), 0 0 40px rgba(var(--neon-orange), 0.3)' },
          },
          'neon-pulse-yellow': {
            '0%': { textShadow: '0 0 5px rgba(var(--neon-yellow), 0.7), 0 0 10px rgba(var(--neon-yellow), 0.5), 0 0 15px rgba(var(--neon-yellow), 0.3)' },
            '100%': { textShadow: '0 0 10px rgba(var(--neon-yellow), 0.9), 0 0 20px rgba(var(--neon-yellow), 0.7), 0 0 30px rgba(var(--neon-yellow), 0.5), 0 0 40px rgba(var(--neon-yellow), 0.3)' },
          },
          'border-pulse': {
            '0%': { boxShadow: '0 0 5px rgba(var(--neon-blue), 0.5), inset 0 0 5px rgba(var(--neon-blue), 0.3)' },
            '100%': { boxShadow: '0 0 10px rgba(var(--neon-blue), 0.7), 0 0 15px rgba(var(--neon-blue), 0.4), inset 0 0 8px rgba(var(--neon-blue), 0.4)' },
          },
          'scanline': {
            '0%': { top: '0%' },
            '100%': { top: '100%' },
          },
          'grid-pulse': {
            '0%': { 
              opacity: 0.5,
              backgroundImage: 'linear-gradient(to right, rgba(var(--neon-blue), 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--neon-blue), 0.07) 1px, transparent 1px)'
            },
            '50%': { 
              opacity: 0.7,
              backgroundImage: 'linear-gradient(to right, rgba(var(--neon-purple), 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--neon-purple), 0.07) 1px, transparent 1px)'
            },
            '100%': { 
              opacity: 0.5,
              backgroundImage: 'linear-gradient(to right, rgba(var(--neon-pink), 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--neon-pink), 0.07) 1px, transparent 1px)'
            }
          },
          'particle-float': {
            '0%': { transform: 'translateY(0) translateX(0)', opacity: 0 },
            '10%': { opacity: 1 },
            '90%': { opacity: 1 },
            '100%': { transform: 'translateY(-100vh) translateX(100px)', opacity: 0 }
          },
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [
    ],
  } 