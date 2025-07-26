import CheckboxList from "./ui/list/CheckboxList.jsx";

export default function TaskMenu({tasks, checked, setChecked}) {
    const taskNames = tasks.map((task, index) => `${task.name}`);
    return (
        <>
            <CheckboxList list={taskNames} checked={checked} setChecked={setChecked} />
        </>
    )
}
