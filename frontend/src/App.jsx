import "./App.css";

function App() {
    const fetchComponentHandler = async () => {
        const response = await fetch("http://localhost:8080");

        if (!response.ok) {
            throw new Error("Something went wrong...");
        }

        const data = await response.json();

        console.log(data);

        return data;
    };

    return (
        <>
            <h2>Welcome to the Pricing Portal</h2>

            <button onClick={fetchComponentHandler}>
                Fetch components
            </button>
        </>
    );
}

export default App;
