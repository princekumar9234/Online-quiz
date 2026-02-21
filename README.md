# 🎓 Online Quiz / MCQ Test App

A premium, interactive, and fully responsive **React-based Quiz Application** designed with a modern **Glassmorphic UI**. This app features advanced quiz mechanics, a gamified experience, and a dynamic question management system.

---

## 🚀 Live Demo Features

### ✨ Key Features
- **Modern Glassmorphic UI**: High-end design using blurred backgrounds, 3D tilt effects, and smooth CSS animations.
- **Interactive Timer**: 30-second countdown for each question to simulate a real exam environment.
- **Functional 50:50 Lifeline**: Automatically hides two random incorrect options to help the user.
- **Dynamic Progress Bar**: Real-time visual tracking of quiz completion.
- **Gamified Scoring**: Performance-based XP scoring system.
- **Custom Question Creator**: Admin-side functionality to add custom questions dynamically during the session.
- **Detailed Analytics**: A comprehensive result screen showing:
  - Final Score & Percentage.
  - Question-by-question summary.
  - Comparison between user selection and correct answers.
- **Fully Responsive**: Optimized for Mobile, Tablet, and Desktop with adaptive layouts.

---

## 🛠️ Tech Stack
- **Frontend**: React (Functional Components & Hooks)
- **Styling**: Vanilla CSS3 (Custom Variables, Flexbox, Grid, Keyframe Animations)
- **Build Tool**: Vite
- **Icons**: SVG-based system icons

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── AddQuestionForm.jsx   # Dynamic question creation form
│   ├── OptionButton.jsx      # Interactive MCQ option components
│   ├── QuestionCard.jsx      # Main question display logic
│   └── ResultScreen.jsx      # Post-quiz analytics & summary
├── App.jsx                   # Central state & quiz flow management
├── questions.js              # Initial question dataset (Editable)
├── index.css                 # Global styles & design system
└── main.jsx                  # React entry point
```

---

## 🏃 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Online-quiz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🎨 Customizing the App
- **Editing Questions**: Open `src/questions.js` and modify the `initialQuestions` array.
- **Changing Colors**: All theme colors are defined as CSS variables in `src/index.css` under the `:root` selector.
- **Adjusting Timer**: Locate `timeLeft` state in `App.jsx` to change the default duration per question.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

Developed with ❤️ using React.
