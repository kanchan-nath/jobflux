import { useState } from 'react';
import './FAQ.css';

export default function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span className="faq-q-text">{faq.question}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-answer">
        <p className="faq-a-text">{faq.answer}</p>
      </div>
    </div>
  );
}
