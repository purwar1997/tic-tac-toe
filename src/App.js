import { useState } from 'react';
import Icon from './components/Icon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.css';

export default function App() {
  const [items, setItems] = useState(new Array(9).fill('empty'));
  const [isCross, setIsCross] = useState(true);
  const [winningMessage, setWinningMessage] = useState('');
  const [noWinnerMessage, setNoWinnerMessage] = useState('');

  function changeItems(index) {
    if (winningMessage) {
      toast.info(`${isCross ? 'Circle' : 'Cross'} has already won the game`);
    } else if (noWinnerMessage) {
      toast.info('Click play again button to reload the game');
    } else {
      if (items[index] === 'empty') {
        items[index] = isCross ? 'cross' : 'circle';
        setIsCross(!isCross);
      } else {
        toast.error("Item once set can't be changed");
      }
    }
  }

  if (!winningMessage) {
    if (items.filter(item => item !== 'empty').length > 4) {
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
      }
    }
  }

  if (!noWinnerMessage) {
    if (!items.includes('empty') && !winningMessage) {
      setNoWinnerMessage('No one wins the game');
    }
  }

  function reloadGame() {
    setItems(new Array(9).fill('empty'));
    setIsCross(true);
    setWinningMessage('');
    setNoWinnerMessage('');
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={true}
        theme="dark"
        toastClassName="toastBody"
      />

      {winningMessage || noWinnerMessage ? (
        <p className="text-4xl text-white font-normal">{winningMessage || noWinnerMessage}</p>
      ) : (
        ''
      )}

      <div className="grid grid-cols-3 gap-3">
        {items.map((item, index) => (
          <div
            className="h-24 w-32 rounded-lg bg-white text-black flex items-center justify-center cursor-pointer"
            onClick={() => changeItems(index)}
          >
            <Icon item={item} />
          </div>
        ))}
      </div>

      {winningMessage || noWinnerMessage ? (
        <button
          className="bg-[#218838] text-white  rounded px-5 py-2 cursor-pointer transition-opacity hover:opacity-90"
          onClick={reloadGame}
        >
          Play Again
        </button>
      ) : (
        ''
      )}
    </>
  );
}
