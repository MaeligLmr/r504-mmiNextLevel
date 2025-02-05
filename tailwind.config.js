/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Tous les fichiers dans le dossier src
  ],
  theme: {
      extend: {
        backgroundImage: {
          'background': "url('/public/img/fond.png')"
        }
      }, // Tu peux étendre les thèmes ici
  },
  plugins: [], // Tu peux ajouter des plugins ici
};
