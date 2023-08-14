import './App.css';
import Container from 'react-bootstrap/esm/Container';
import { ToastContainer } from 'react-toastify';
import TableUsers from './components/Tables/TableUsers';

function App() {

  return (
    <>
    <div className="app-container">
          <TableUsers/>
    </div>
    </>
  );
}

export default App;

