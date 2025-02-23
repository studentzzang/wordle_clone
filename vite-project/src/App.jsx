import { useState , useEffect, useRef} from 'react'
import './App.css'
import Input from './component/Input.jsx'

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState('');
  const [visiable, setVisiable] = useState("hidden");

  const [count, setCount] = useState(0);
  const [isCorrect, setCorrect] = useState(false);

  useEffect(()=>{ //6번째까지 못맞춤
    console.log(count);
    if (!isCorrect && count >= 6){
      setVisiable("visiable");
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
    <header className='flex justify-center items-center bg-gray-500 pb-3'>
      <h1 className='text-6xl m-4 text-white'>wordle clone by JES</h1>
    </header>

    <div className='flex justify-center items-center text-6xl'>
      <h1 className={visiable}>{word}</h1>
    </div>
    <div className='content-container flex flex-col justify-center items-center m-14 gap-4'>
      <Input correct={word} setCount={setCount} setCorrect={setCorrect}/>
      <Input correct={word} setCount={setCount} setCorrect={setCorrect}/>
      <Input correct={word} setCount={setCount} setCorrect={setCorrect}/>
      <Input correct={word} setCount={setCount} setCorrect={setCorrect}/>
      <Input correct={word} setCount={setCount} setCorrect={setCorrect}/>
      <Input correct={word} setCount={setCount} setCorrect={setCorrect}/>
    </div>
    <footer className='absolute bottom-0 w-full p-5 bg-black'>
      <h4 className='text-center text-white text-lg'>github : studentzzang</h4>
    </footer>
    </>
  );
}

export default App;
