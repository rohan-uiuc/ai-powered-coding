import { defineAppSetup } from '@slidev/types'
import '../styles/theme.css'

export default defineAppSetup(({ app, router }) => {
  // Check for saved theme preference on app load
  const savedTheme = localStorage.getItem('slidev-theme') || 'light'
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Additional setup can go here
}) 