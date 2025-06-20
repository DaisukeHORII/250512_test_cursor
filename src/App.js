import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// サンプルのフラッシュカードデータ（ルビ付き）
const flashcardData = [
  {
    term: '<ruby>CPU<rt>シーピーユー</rt></ruby>',
    definition: 'Central Processing Unitの略。<ruby>コンピュータ<rt>こんぴゅーた</rt></ruby>の<ruby>中心的<rt>ちゅうしんてき</rt></ruby>な<ruby>処理<rt>しょり</rt></ruby>を行う<ruby>装置<rt>そうち</rt></ruby>。'
  },
  {
    term: '<ruby>RAM<rt>ラム</rt></ruby>',
    definition: 'Random Access Memoryの略。<ruby>コンピュータ<rt>こんぴゅーた</rt></ruby>の<ruby>主記憶装置<rt>しゅきおくそうち</rt></ruby>。'
  },
  {
    term: '<ruby>OS<rt>オーエス</rt></ruby>',
    definition: 'Operating Systemの略。<ruby>コンピュータ<rt>こんぴゅーた</rt></ruby>の<ruby>基本<rt>きほん</rt></ruby><ruby>ソフトウェア<rt>そふとうぇあ</rt></ruby>。'
  }
];

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #e0e7ff 0%, #f5f5f5 100%);
    font-family: 'Segoe UI', 'Hiragino Sans', 'Meiryo', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Changed from center */
  min-height: 100vh;
  padding: 2rem;
  width: 100%; /* Explicitly set width */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

const Title = styled.h1`
  color: #22223b;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  letter-spacing: 0.05em;
  font-weight: 700;
`;

const FlashcardContainer = styled.div`
  perspective: 1000px;
  width: 350px;
  height: 220px;
  /* Update the margin to correctly position the card considering AppContainer's padding */
  margin-top: 1rem;
  margin-right: 0;
  margin-bottom: 5rem;
  margin-left: calc(25vw - 2rem); /* Adjusted */
  transform: translateX(-175px); /* Translate left by half of its width */
  /* Ensure it's not pushed off-screen if 25vw is less than 175px + AppContainer padding */
  /* Adding a safeguard with max for margin-left if needed, or adjust strategy */
  /* For now, let's proceed with the direct approach. We can refine if testing shows issues. */
`;

const Flashcard = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; /* 中央に固定するために absolute を使用 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
  cursor: pointer;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 120, 0.12), 0 1.5px 4px rgba(0,0,0,0.08);
  background-color: #fff;
  font-size: 1.25rem;
  text-align: center;
  color: #22223b;
  font-weight: 500;
  line-height: 2;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  background-color: #f8fafc;
  color: #3a3a40;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  margin-top: 0.5rem;
  gap: 1.5rem;

  @media (max-width: 400px) {
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 0.7rem 0;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(60, 60, 120, 0.08);
  transition: background 0.2s, transform 0.1s;
  margin: 0 0.2rem;

  &:hover {
    background: linear-gradient(90deg, #4f46e5 0%, #2563eb 100%);
    transform: translateY(-2px) scale(1.04);
  }
`;

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcardData.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcardData.length) % flashcardData.length);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>ITパスポート フラッシュカード</Title>
        <FlashcardContainer>
          <Flashcard isFlipped={isFlipped} onClick={() => setIsFlipped(!isFlipped)}>
            <CardFace>
              <span dangerouslySetInnerHTML={{ __html: flashcardData[currentCardIndex].term }} />
            </CardFace>
            <CardBack>
              <span dangerouslySetInnerHTML={{ __html: flashcardData[currentCardIndex].definition }} />
            </CardBack>
          </Flashcard>
        </FlashcardContainer>
        <NavigationButtons>
          <Button onClick={handlePrevious}>前へ</Button>
          <Button onClick={handleNext}>次へ</Button>
        </NavigationButtons>
      </AppContainer>
    </>
  );
}

export default App;