import { useState , useEffect, useRef} from 'react'
import './App.css'
import Input from './component/Input.jsx'

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');

  const [count, setCount] = useState();
  const [isCorrect, setCorrect] = useState(false);

  const increaseCount= (n) => {
    setCount(n);
  }

  useEffect(()=>{ //6번째까지 못맞춤
    if (!isCorrect && count >= 6){
      console.log("긑");
    }
  }, [count])

  useEffect(() => { //단어리스트 저장
    async function fetchWords() {
      const response = await fetch("https://api.datamuse.com/words?sp=?????");
      const data = await response.json();
      const wordList = data.map(word => word.word);
      setWords(wordList);
    }
    fetchWords();
  }, []); // 첫 렌더링 때 실행

  useEffect(() => { //정답 단어 저장
    if (words.length > 0) {
      setWord(words[Math.floor(Math.random() * words.length)]); // words가 업데이트될 때 실행
    }
  }, [words]); // words가 변경될 때 실행

  console.log(word);

  return (
    <>
    <header className='flex justify-center items-center'>
      <h1 className='text-5xl m-4'>wordle clone by JES</h1>
    </header>

    <div className='flex justify-center items-center text-6xl'>
      {word}
    </div>
    <div className='content-container flex flex-col justify-center items-center m-14 gap-4'>
      <Input correct={word} increaseCount={increaseCount} increaseNum={1} setCorrect={setCorrect}/>
      <Input correct={word} increaseCount={increaseCount} increaseNum={2} setCorrect={setCorrect}/>
      <Input correct={word} increaseCount={increaseCount} increaseNum={3} setCorrect={setCorrect}/>
      <Input correct={word} increaseCount={increaseCount} increaseNum={4} setCorrect={setCorrect}/>
      <Input correct={word} increaseCount={increaseCount} increaseNum={5} setCorrect={setCorrect}/>
      <Input correct={word} increaseCount={increaseCount} increaseNum={6} setCorrect={setCorrect}/>
    </div>
    <footer className='flex justify-center'>
      <h4>github : studentzzang</h4>
    </footer>
    </>
  );
}

export default App;
