import React, { useState, useEffect } from 'react';
import CharToggle from '../CharToggle';
import styles from './styles.module.css';

const CharDetails = (props) => {
  const [character, setCharacter] = useState(null);
  const [vocabulary, setVocabulary] = useState(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    if (props.currentCharacter) {
      const vocabData = []; const vocabRes = [];
      const char = props.currentCharacter;
      for (let key in char) {
        if (key.indexOf('vocab') > -1) {
          vocabData.push(char[key]);
        }
      }
      for (let i = 0; i < vocabData.length; i += 3) {
        const word = vocabData.slice(i, i + 3);
        if (word[0] !== "") {
          const wordUpdated = [
            { label: 'kanji', value: word[1] },
            { label: 'furigana', value: word[0] },
            { label: 'meaning', value: word[2] }
          ]
          vocabRes.push(wordUpdated);
        }
      }
      setCharacter(props.currentCharacter);
      setVocabulary(vocabRes);
      setIsPrevDisabled(props.currentList[0].id === props.currentCharacter.id);
      setIsNextDisabled(props.currentList[props.currentList.length - 1].id === props.currentCharacter.id);
    }
  }, [props.currentCharacter]);

  // used to copy word detail to clipboard
  const copyToClipboard = (value) => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = value;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  return character && vocabulary && (
    <div>
      <CharToggle
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        onNavigateCharacter={props.onNavigateCharacter} />
      <div className={styles.characterDescription}>
        <div className={styles.characterContainer}>
          <div className={styles.attribute}>
            <div className={styles.label}>no.</div>
            <div className={styles.value}>{character.id}</div>
          </div>
          <p className={styles.character}>{character.character}</p>
        </div>
        <div className={styles.meaningContainer}>
          <div className={styles.attribute}>
            <div className={styles.label}>meaning</div>
            <div className={styles.value}>{character.meaning}</div>
          </div>
          <div className={styles.attribute}>
            <div className={styles.label}>on reading</div>
            <div className={styles.value}>{character.on_reading || '—'}</div>
          </div>
          <div className={styles.attribute}>
            <div className={styles.label}>kun reading</div>
            <div className={styles.value}>{character.kun_reading || '—'}</div>
          </div>
        </div>
      </div>
      <div className={styles.vocabContainer}>
        {vocabulary.map((word, index) => (
          <div key={index} className={styles.vocabEntryContainer}>
            <div className={styles.number}>{index + 1}</div>
            <ul className={styles.vocabEntry}>
              {word.map((attribute, i) => (
                <li key={i}>
                  <div className={styles.attribute}>
                    <div className={styles.label}>{attribute.label}</div>
                    <div className={styles.value}>
                      <span>{attribute.value}</span>
                      <button
                        onClick={() => copyToClipboard(attribute.value)}
                        title="Copy to clipboard">
                        <i className="far fa-clone" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharDetails;