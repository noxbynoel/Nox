const fs = require('fs');
const path = require('path');

const files = [
    'src/components/AlternateCollections.tsx',
    'src/components/AlternateHero.tsx',
    'src/components/AuthModal.tsx',
    'src/components/BrandShowcase.tsx',
    'src/components/CartSidebar.tsx',
    'src/components/Checkout.tsx',
    'src/components/Dashboard.tsx',
    'src/components/Footer.tsx',
    'src/components/ProductCard.tsx',
    'src/components/ProductCatalog.tsx',
    'src/components/ProductModal.tsx',
    'src/components/ProductReviews.tsx',
    'src/components/UserProfile.tsx',
    'src/App.tsx'
];

let replacedCount = 0;

files.forEach(file => {
    const fullPath = path.resolve(__dirname, file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let orig = content;

        // Use replaceAll to replace strings directly
        const replaces = {
            'dark:bg-primary-light': 'dark:bg-[#1A1A1A]',
            'dark:bg-primary-dark': 'dark:bg-[#0A0A0A]',
            'dark:bg-primary': 'dark:bg-[#121212]',
            'dark:bg-[#363636]': 'dark:bg-[#121212]',
            'dark:bg-[#424242]': 'dark:bg-[#1A1A1A]',
            'dark:bg-[#282828]': 'dark:bg-[#0A0A0A]',

            'dark:text-accent-light': 'dark:text-gray-200',
            'dark:text-accent-dark': 'dark:text-gray-300',
            'dark:text-accent/60': 'dark:text-white/60',
            'dark:text-accent/40': 'dark:text-white/40',
            'dark:text-accent': 'dark:text-white',
            'dark:text-primary': 'dark:text-[#121212]',

            'dark:border-primary': 'dark:border-[#2A2A2A]',
            'dark:border-accent/10': 'dark:border-white/10',
            'dark:border-accent/20': 'dark:border-white/20',
            'dark:border-accent': 'dark:border-white',

            'dark:hover:bg-accent-light': 'dark:hover:bg-gray-200',
            'dark:hover:bg-accent-dark': 'dark:hover:bg-gray-300',
            'dark:hover:bg-accent': 'dark:hover:bg-white',
            'dark:hover:bg-primary': 'dark:hover:bg-[#1A1A1A]',
            'dark:hover:text-accent': 'dark:hover:text-white',
            'dark:shadow-accent/10': 'dark:shadow-white/10',
            'dark:shadow-accent/20': 'dark:shadow-white/20',
            'dark:drop-shadow-[0_20px_20px_rgba(255,237,168,0.05)]': 'dark:drop-shadow-[0_20px_20px_rgba(255,255,255,0.05)]',

            'bg-[#003631] text-accent font-serif': 'bg-[#003631] dark:bg-[#121212] text-accent dark:text-white font-serif',
            'bg-[#002420]': 'bg-[#002420] dark:bg-[#0A0A0A]',
            'bg-[#004D45]/30': 'bg-[#004D45]/30 dark:bg-[#1A1A1A]/30',
            'text-[#FFEDA8]': 'text-[#FFEDA8] dark:text-white'
        };

        for (const [key, val] of Object.entries(replaces)) {
            if (content.includes(key)) {
                content = content.split(key).join(val);
            }
        }

        if (content !== orig) {
            fs.writeFileSync(fullPath, content);
            console.log('Updated ' + file);
            replacedCount++;
        }
    } else {
        console.log('Not found:', fullPath);
    }
});

console.log('Total files updated:', replacedCount);
