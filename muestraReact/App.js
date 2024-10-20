function Greeting({ name }) {
    return <h1>Hola, {name}</h1>;
  }
  
  export default function App() {
    return <Greeting name="mundo" />
  }