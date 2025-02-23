import {useState, useRef, useEffect} from 'react';

function Input(correct, increaseCount, increaseNum, setCorrect){

  const [letters, setLetters] = useState(["", "", "", "", ""]);

  const inputsRef = useRef([]);

  const [isDisabled, setDisabled] = useState(false);

  const handleChange=(e, index)=> {
    const value = e.target.value.toUpperCase();

    if(/^[A-Z]?$/.test(value)) {
      const newLetters = [...letters];

      newLetters[index] = value;

      setLetters(newLetters);

      if (value && index < 4) {
        inputsRef.current[index + 1].focus();
      }
    }
  }

  // 5글자 모두 입력된거 체크
  useEffect(() => { 
    if (!letters.includes("") && letters.length === 5) {
      checkLetters();
      onDisabled();
      () => increaseCount(increaseNum);
    }
  }, [letters]); // letters가 변경될 때 실행됨

  const handleKeyDown = (e, index) => {
    if(e.key === "Backspace") { //지우기
      const newLetters = [...letters];

      if (newLetters[index]) {
        newLetters[index] = "";

      } else if(index>0) {
        newLetters[index-1] = "";
        inputsRef.current[index-1].focus();
      }
      setLetters(newLetters);
    }
  }
    //답 쓴 후 스타일
  const [styles, setStyles] = useState(["","","","",""]);
  const grayStyle = "border-b-gray-300 bg-gray-300 text-white";
  const yellowStyle = "border-b-amber-400 bg-amber-300 text-white";
  const greenStyle = "border-green-400 bg-green-400 text-white"

  const getAllIndexes =(word, letter) => {
    return word.split("").map((char, index) => (char === letter ? index : -1)).filter(index => index !== -1);
  }

  const checkLetters = ()=>{

    let cor = JSON.parse(JSON.stringify(correct)).correct.toUpperCase();

    if (letters.join('')==cor){ // 모두 맞음
      ()=>setCorrect(true);
    }

    let newArr = [...styles]
    letters.forEach((element, index) => {
      
      if(getAllIndexes(cor, element).length === 0){ // wrong(gray)
        newArr[index] = grayStyle;
      } else if (getAllIndexes(cor,element).includes(index)) { //correct(green)
        newArr[index] = greenStyle;
      } else {
        newArr[index] = yellowStyle;
      }

    });

    setStyles(newArr);
  }

  const onDisabled = () => {
    setDisabled(true);
  }

  return (
    <>
    <div className="container flex justify-center gap-4">
      {letters.map((letter,index)=> (
        <input className={`w-30 h-30 text-4xl text-center uppercase border-2 border-b-gray-600 rounded-2xl ${styles[index]}`}
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          value={letter}
          disabled={isDisabled}
          maxLength={1}
          onChange= {(event)=>handleChange(event, index)}
          onKeyDown={(event)=>handleKeyDown(event, index)}
        />
      ))}
    </div>
    </>
  )
}

export default Input;
