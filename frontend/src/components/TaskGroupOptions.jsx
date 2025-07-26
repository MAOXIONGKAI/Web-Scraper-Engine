import SplitButton from "./ui/SplitButton.jsx";
import {taskGroupMenuOptions} from "../data/menu.js";

export default function TaskGroupOptions({setValue}) {
    const options = ["email-bomber"];

    return (
        <>
            <SplitButton setValue={setValue} options={taskGroupMenuOptions} />
        </>
    )
}
