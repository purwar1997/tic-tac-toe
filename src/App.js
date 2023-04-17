import { useEffect, useState } from 'react';
import Icon from './components/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

export default function App() {
  const [items, setItems] = useState(new Array(9).fill('empty'));
  const [isCross, setIsCross] = useState(true);
  const [winningMessage, setWinningMessage] = useState('');
  const [noWinnerMessage, setNoWinnerMessage] = useState('');

  let winnerExists = false;

  function changeItems(index) {
    if (winningMessage) {
      return toast.info(`${isCross ? 'Circle' : 'Cross'} has already won the game`);
    }

    if (noWinnerMessage) {
      return toast.info('Click play again button to reload the game');
    }

    if (items[index] !== 'empty') {
      return toast.info("Item once set can't be changed");
    }

    const newItems = items.map((item, itemIndex) => {
      if (itemIndex === index) {
        return isCross ? 'cross' : 'circle';
      } else {
        return item;
      }
    });

    setItems(newItems);
    setIsCross(!isCross);
  }

  function reloadGame() {
    setItems(new Array(9).fill('empty'));
    setIsCross(true);
    setWinningMessage('');
    setNoWinnerMessage('');
  }

  useEffect(() => {
    if (
      (items[0] !== 'empty' && items[0] === items[1] && items[1] === items[2]) ||
      (items[3] !== 'empty' && items[3] === items[4] && items[4] === items[5]) ||
      (items[6] !== 'empty' && items[6] === items[7] && items[7] === items[8]) ||
      (items[0] !== 'empty' && items[0] === items[3] && items[3] === items[6]) ||
      (items[1] !== 'empty' && items[1] === items[4] && items[4] === items[7]) ||
      (items[2] !== 'empty' && items[2] === items[5] && items[5] === items[8]) ||
      (items[0] !== 'empty' && items[0] === items[4] && items[4] === items[8]) ||
      (items[2] !== 'empty' && items[2] === items[4] && items[4] === items[6])
    ) {
      setWinningMessage(`${isCross ? 'Circle' : 'Cross'} wins the game`);
      winnerExists = true;
    }
  }, [items, isCross]);

  useEffect(() => {
    if (!items.includes('empty') && !winnerExists) {
      setNoWinnerMessage('No one wins the game');
    }
  }, [items, winnerExists]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={true}
        theme="dark"
        toastClassName="toastBody"
      />
      <div className="h-screen flex flex-col items-center justify-center gap-12">
        {(winningMessage || noWinnerMessage) && (
          <p className="text-4xl text-white font-normal">{winningMessage || noWinnerMessage}</p>
        )}

        <div className="grid grid-cols-3 gap-3">
          {items.map((item, index) => (
            <div
              className="h-24 w-32 rounded-lg bg-white text-black flex items-center justify-center cursor-pointer"
              key={index}
              onClick={() => changeItems(index)}
            >
              <Icon item={item} />
            </div>
          ))}
        </div>

        {(winningMessage || noWinnerMessage) && (
          <button
            className="bg-[#218838] text-white rounded px-5 py-2 cursor-pointer transition-opacity hover:opacity-90"
            onClick={reloadGame}
          >
            Play Again
          </button>
        )}
      </div>
    </>
  );
}
