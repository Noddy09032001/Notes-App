import Home from "@/components/templates/home"
import {lazy} from "react"
import { createBrowserRouter } from "react-router-dom"

const NotesPage = lazy(() => 
    import("../pages/NotesDisplay/index").then((module) => ({
        default: module.NotesCreationPage,
    }))
)

const NotesList = lazy(() => 
    import("../pages/NotesListPage/index").then((module) => ({
        default: module.NotesListPage,
    }))
)

export const router = createBrowserRouter(
    [
       {
        path: "/",
        element: <Home />,
       },
       {
        path: "/notes-display",
        element: <NotesList/>,
       }
    ]
)

export default router;