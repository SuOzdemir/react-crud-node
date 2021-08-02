import './App.css';
import Books from "./components/Books";
import Users from "./components/Users";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Users />
            </header>
        </div>
    );
}

export default App;
