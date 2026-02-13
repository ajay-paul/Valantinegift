<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>For Aielin</title>
    <!-- Tailwind CDN for rapid prototyping styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400&family=Great+Vibes&display=swap" rel="stylesheet">
    <style>
      body {
        margin: 0;
        background-color: #1a0505;
        color: #ffffff;
        font-family: 'Montserrat', sans-serif;
        overflow-x: hidden;
      }
      .font-cinzel { font-family: 'Cinzel', serif; }
      .font-playfair { font-family: 'Playfair Display', serif; }
      .font-vibes { font-family: 'Great Vibes', cursive; }
      
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #1a0505; }
      ::-webkit-scrollbar-thumb { background: #4a0f18; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #7f1d2e; }
      
      .animate-pulse-slow {
        animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <!-- FIX: Use relative path ./index.tsx and remove importmap -->
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
