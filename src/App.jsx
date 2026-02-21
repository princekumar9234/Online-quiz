import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { create, all } from 'mathjs';

const math = create(all);

const App = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isScientific, setIsScientific] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const buttons = [
    // Row 1
    { label: 'AC', action: 'clear', type: 'clear' },
    { label: '⌫', action: 'delete', type: 'spec' },
    { label: '%', action: 'append', val: '%', type: 'spec' },
    { label: '÷', action: 'append', val: '/', type: 'op' },
    { label: 'sin', action: 'append', val: 'sin(', type: 'spec', hidden: !isScientific },

    // Row 2
    { label: '7', action: 'append', val: '7' },
    { label: '8', action: 'append', val: '8' },
    { label: '9', action: 'append', val: '9' },
    { label: '×', action: 'append', val: '*', type: 'op' },
    { label: 'cos', action: 'append', val: 'cos(', type: 'spec', hidden: !isScientific },

    // Row 3
    { label: '4', action: 'append', val: '4' },
    { label: '5', action: 'append', val: '5' },
    { label: '6', action: 'append', val: '6' },
    { label: '−', action: 'append', val: '-', type: 'op' },
    { label: 'tan', action: 'append', val: 'tan(', type: 'spec', hidden: !isScientific },

    // Row 4
    { label: '1', action: 'append', val: '1' },
    { label: '2', action: 'append', val: '2' },
    { label: '3', action: 'append', val: '3' },
    { label: '+', action: 'append', val: '+', type: 'op' },
    { label: 'log', action: 'append', val: 'log10(', type: 'spec', hidden: !isScientific },

    // Row 5
    { label: '0', action: 'append', val: '0', className: 'btn-wide' },
    { label: '.', action: 'append', val: '.' },
    { label: '=', action: 'calculate', type: 'op' },
    { label: 'ln', action: 'append', val: 'log(', type: 'spec', hidden: !isScientific },

    // Scientific Only Row
    { label: '(', action: 'append', val: '(', type: 'spec', hidden: !isScientific },
    { label: ')', action: 'append', val: ')', type: 'spec', hidden: !isScientific },
    { label: 'π', action: 'append', val: 'pi', type: 'spec', hidden: !isScientific },
    { label: 'e', action: 'append', val: 'e', type: 'spec', hidden: !isScientific },
    { label: '√', action: 'append', val: 'sqrt(', type: 'spec', hidden: !isScientific },
    { label: '^', action: 'append', val: '^', type: 'spec', hidden: !isScientific },
    { label: 'deg', action: 'append', val: 'deg', type: 'spec', hidden: !isScientific },
  ];

  const handleAction = (btn) => {
    switch (btn.action) {
      case 'append':
        if (display === '0' || lastResult !== null) {
          setDisplay(btn.val);
          setLastResult(null);
        } else {
          setDisplay(prev => prev + btn.val);
        }
        break;
      case 'clear':
        setDisplay('0');
        setExpression('');
        setLastResult(null);
        break;
      case 'delete':
        if (display.length > 1) {
          setDisplay(prev => prev.slice(0, -1));
        } else {
          setDisplay('0');
        }
        break;
      case 'calculate':
        try {
          const result = math.evaluate(display);
          setExpression(display + ' =');
          const formattedResult = Number.isFinite(result) ? 
            (Number.isInteger(result) ? result : result.toFixed(8).replace(/\.?0+$/, "")) : 
            "Infinity";
          setDisplay(String(formattedResult));
          setLastResult(result);
        } catch (error) {
          setDisplay('Error');
          setTimeout(() => setDisplay('0'), 1500);
        }
        break;
    }
  };

  return (
    <div className="calculator-wrapper">
      <motion.div 
        layout
        className={`neumorphic-body ${isScientific ? 'scientific-active' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="mode-toggle">
          <div 
            className={`toggle-item ${!isScientific ? 'active' : ''}`}
            onClick={() => setIsScientific(false)}
          >
            STANDARD
          </div>
          <div 
            className={`toggle-item ${isScientific ? 'active' : ''}`}
            onClick={() => setIsScientific(true)}
          >
            SCIENTIFIC
          </div>
        </div>

        <div className="neu-screen">
          <div className="expression-box">{expression}</div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={display}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="result-box"
            >
              {display}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="button-grid">
          {buttons.filter(b => !b.hidden).map((btn, idx) => (
            <motion.button
              key={idx}
              layout
              whileTap={{ scale: 0.95 }}
              className={`neu-btn ${btn.type ? `btn-${btn.type}` : ''} ${btn.className || ''}`}
              onClick={() => handleAction(btn)}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
