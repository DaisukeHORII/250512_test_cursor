import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 分野別のサンプル問題
const categoryData = {
  strategy: [
    {
      term: '<ruby>企業<rt>きぎょう</rt></ruby>が情報システム戦略を立案する際、まず最初に実施すべきことは？',
      definition: '<ruby>経営<rt>けいえい</rt></ruby>目標や現状分析から情報化の目的を明確にすること'
    },
    {
      term: 'SWOT分析の<ruby>S<rt>エス</rt></ruby>は何を表すか？',
      definition: '<ruby>Strength<rt>ストレングス</rt></ruby>、<ruby>企業<rt>きぎょう</rt></ruby>内部の<ruby>強み<rt>つよみ</rt></ruby>'
    },
    {
      term: '<ruby>ROE<rt>アールオーイー</rt></ruby>の意味は何か？',
      definition: '<ruby>自己資本利益率<rt>じこしほんりえきりつ</rt></ruby>'
    }
  ],
  management: [
    {
      term: 'システム開発におけるウォーターフォールモデルの最初の工程は何か？',
      definition: '<ruby>要求定義<rt>ようきゅうていぎ</rt></ruby>'
    },
    {
      term: '情報セキュリティポリシの運用・管理を行う部門を何と呼ぶか？',
      definition: '<ruby>CSIRT<rt>シーサート</rt></ruby> または 情報セキュリティ管理部門'
    },
    {
      term: 'ITサービスマネジメントの国際規格は何か？',
      definition: 'ISO/IEC 20000'
    }
  ],
  technology: [
    {
      term: 'OSI参照モデルでトランスポート層に該当するプロトコルはどれか？',
      definition: 'TCPやUDP'
    },
    {
      term: '主記憶装置に比べて高速でCPUに近い位置にある記憶装置を何というか？',
      definition: '<ruby>キャッシュメモリ<rt>きゃっしゅめもり</rt></ruby>'
    },
    {
      term: '公開鍵暗号方式でデータを暗号化するために必要な鍵はどれか？',
      definition: '受信者の<ruby>公開鍵<rt>こうかいかぎ</rt></ruby>'
    }
  ]
};

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
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #22223b;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-align: center;
`;

const FlashcardContainer = styled.div`
  perspective: 1000px;
  width: 350px;
  height: 220px;
  margin: 1rem 0 5rem 0; /* ボタンとの間をさらに広げる */
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

const CategoryButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #e0e7ff;
  color: #22223b;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &.active {
    background-color: #6366f1;
    color: #fff;
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
  const [selectedCategory, setSelectedCategory] = useState('strategy');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcardData = categoryData[selectedCategory];

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

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
        <Title>ITパスポート サンプル問題</Title>
        <CategoryButtons>
          <CategoryButton
            onClick={() => handleCategoryChange('strategy')}
            className={selectedCategory === 'strategy' ? 'active' : ''}
          >
            ストラテジ系
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryChange('management')}
            className={selectedCategory === 'management' ? 'active' : ''}
          >
            マネジメント系
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryChange('technology')}
            className={selectedCategory === 'technology' ? 'active' : ''}
          >
            テクノロジ系
          </CategoryButton>
        </CategoryButtons>
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