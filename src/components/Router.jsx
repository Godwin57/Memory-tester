import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import WelcomePage from "./WelcomePage";
import DisplayGame from "./DisplayGame";
import SelectDifficulty from "./SelectDifficulty";
import ErrorPage from "./ErrorPage";

function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <ErrorPage />
        },

        {
            path: 'welcome',
            element: <WelcomePage />
        },

        {
            path: 'displayGame',
            element: <DisplayGame />
        },

        {
            path: 'selectDifficulty',
            element: <SelectDifficulty />
        }
    ])

    return (
        <RouterProvider router={router} />
    );
}

export default Router;