# UAF CGPA Calculator 🎓

A modern, beautiful web application to calculate CGPA for University of Agriculture Faisalabad (UAF) students. This application fetches real student results from the UAF LMS and calculates semester-wise GPA and cumulative CGPA.

## ✨ Features

- **Real Data**: Fetches actual student results from UAF LMS (no mock data)
- **CGPA Calculation**: Calculates semester-wise GPA and cumulative CGPA
- **Blur Effect**: CGPA is initially blurred with a reveal button
- **Sound Effect**: Plays sound when CGPA is revealed
- **Modern UI**: Beautiful, responsive design with dark mode support
- **Semester-wise Breakdown**: View detailed course information for each semester
- **Real-time Fetching**: Direct scraping from UAF servers

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd uaf-cgpa-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
uaf-cgpa-calculator/
├── app/
│   ├── api/
│   │   └── result/
│   │       └── route.ts          # API endpoint for fetching results
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── Header.tsx                # Header with branding
│   ├── Footer.tsx                # Footer with credits
│   ├── SearchForm.tsx            # Registration number input
│   └── ResultDisplay.tsx         # Results and CGPA display
├── lib/
│   └── scraper/
│       ├── config.ts             # Scraper configuration
│       └── index.ts              # Main scraping logic
├── types/
│   └── index.ts                  # TypeScript type definitions
├── utils/
│   └── gpaCalculations.ts        # GPA/CGPA calculation utilities
└── package.json
```

## 🎯 How It Works

1. **User Input**: Student enters their UAF registration number (format: YYYY-ag-XXXX)
2. **Data Fetching**: Backend scrapes the UAF LMS using the original scraping logic
3. **Calculation**: System calculates semester-wise GPA and cumulative CGPA
4. **Display**: Results are displayed with blur effect on CGPA
5. **Reveal**: User clicks "Reveal CGPA" button to unblur and play sound

## 🔧 Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Scraping**: Axios, Cheerio
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📝 Registration Number Format

Enter your UAF registration number in this format:
- Example: `2021-ag-1234`
- Pattern: `YYYY-ag-XXXX`

## 🙏 Credits

**Made by**: Adil

**Scraping Logic Credits**: [Original UAF Result Scraper](https://github.com/original-repo)
- The core scraping logic is preserved from the original repository
- Full credit to the original developers for the LMS scraping implementation

## ⚠️ Disclaimer

This is an educational project and is not officially affiliated with the University of Agriculture, Faisalabad (UAF). Use at your own discretion.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, please reach out to the developer.

---

**Note**: This application fetches real data from UAF servers. Please ensure you have permission to access your academic records.
