import { Link } from "react-router-dom";

function ErrorPage() {
    const styles = {
        "background" : "rgb(47, 3, 61)",
        "display": "flex",
        "justifyContent" :"center",
        "alignItems" : "center",
        "height": "100vh",
        "width":"100vw",
        "fontSize": "23px",
        "flexDirection" : "column"
    }

    return (
        <div style={styles}>
            <p>The page you're looking for doesn't exist pal.</p>
            <button><Link to='/' style={{"color" : "lightGray"}}>Take this shortcut to go back Home instead</Link></button>
        </div>
    );
}

export default ErrorPage;