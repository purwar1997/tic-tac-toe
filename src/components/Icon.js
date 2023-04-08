import { FaTimes, FaRegCircle, FaPen } from 'react-icons/fa';

export default function Icon({ item }) {
  switch (item) {
    case 'circle':
      return <FaRegCircle className="text-3xl" />;

    case 'cross':
      return <FaTimes className="text-3xl" />;

    default:
      return <FaPen className="text-3xl" />;
  }
}
