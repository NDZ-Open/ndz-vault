# NDZ Vault

A lead magnet site for NDZ Academy featuring curated resources organized by category. Each resource requires email capture before access.

## Features

- **Category-based Navigation**: Browse resources by category (Career & Remote Work, Freelancing, Design & Tech, Productivity, Learning, Content & Branding)
- **Search Functionality**: Search across all resources by title, description, or tags
- **Email Capture**: High-converting landing pages that require email before resource access
- **Modern Design**: Clean, Rinne-inspired design with NDZ branding colors
- **Responsive**: Fully responsive design that works on all devices

## Tech Stack

- **SvelteKit**: Modern web framework
- **TypeScript**: Type safety
- **Vite**: Fast build tool

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the site.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   │   ├── ResourceCard.svelte
│   │   └── EmailCapture.svelte
│   └── data/          # Data structures
│       └── resources.ts
└── routes/
    ├── +layout.svelte # Root layout
    ├── +page.svelte   # Home page
    └── resource/
        └── [id]/
            └── +page.svelte  # Individual resource pages
```

## Branding

- **Button Color**: #00EB98
- **Button Text**: #15181E
- **Background**: #15181E
- **Section Background**: #1B1E27
- **Secondary Text**: #6c7693
- **Primary Text**: #ffffff
- **Font**: Inter

## Resources

All resources are defined in `src/lib/data/resources.ts` and organized by category. Each resource includes:
- Title
- Description
- Category
- Tags

## Next Steps

1. Connect email capture to your email service (e.g., Mailchimp, ConvertKit, or your backend)
2. Add actual resource files/downloads
3. Implement analytics tracking
4. Add SEO optimizations
5. Set up production hosting
