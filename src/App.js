import './App.css';
import Books from "./components/Books";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Books />
            </header>
        </div>
    );
}

export default App;
