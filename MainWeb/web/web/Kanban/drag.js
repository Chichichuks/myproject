document.addEventListener("DOMContentLoaded", () => {
    const lanesContainer = document.getElementById("lanes");

    lanesContainer.addEventListener("dragstart", (e) => {
        if (e.target.classList.contains("task")) {
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => {
                e.target.classList.add("is-dragging");
            }, 0);
        }
    });

    lanesContainer.addEventListener("dragend", (e) => {
        if (e.target.classList.contains("task")) {
            e.target.classList.remove("is-dragging");
        }
    });

    lanesContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(lanesContainer, e.clientY);
        const draggable = document.querySelector(".is-dragging");
        if (afterElement == null) {
            lanesContainer.appendChild(draggable);
        } else {
            lanesContainer.insertBefore(draggable, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [
            ...container.querySelectorAll(".task:not(.is-dragging)"),
        ];

        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY }
        ).element;
    }
});
