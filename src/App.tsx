import { loginApi } from "./api/auth";

function App() {
  loginApi("smith@example.com", "pass123")
    .then(console.log)
    .catch(console.error);

  return (
    <>
      <div>PAYQUICK FE</div>
    </>
  );
}

export default App;
