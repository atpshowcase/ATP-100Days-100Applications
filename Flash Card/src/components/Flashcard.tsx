import React from 'react';
import styles from './Flashcard.module.css';

interface FlashcardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer, isFlipped, onFlip }) => {
  return (
    <div 
      className={`${styles.cardContainer} ${isFlipped ? styles.flipped : ''}`} 
      onClick={onFlip}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.label}>Question</div>
          <div className={styles.content}>{question}</div>
        </div>
        <div className={styles.cardBack}>
          <div className={styles.label}>Answer</div>
          <div className={styles.content}>{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
