import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ddd',
      borderRadius: '12px',
      textAlign: 'center'
    }}>
      <h1>Khair Jafin Awali</h1>
      <h3>NIM: 2602191024</h3>

      <p>
        I am a Computer Science student specializing in Software Engineering
        at Bina Nusantara University.
      </p>

      <hr />

      <h2>React Counter</h2>

      <input
        ref={inputRef}
        placeholder="Type something..."
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <button
        onClick={() => setCount(0)}
        style={{ marginLeft: '10px' }}
      >
        Reset
      </button>

      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;