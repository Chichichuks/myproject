document.addEventListener("DOMContentLoaded", () => {
  const lanesContainer = document.getElementById("lanes");
  const addLaneBtn = document.getElementById("add-lane-btn");

  const taskModal = document.getElementById("task-modal");
  const closeTaskModal = document.getElementById("close-task-modal");
  const taskForm = document.getElementById("task-form");
  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskLane = document.getElementById("task-lane");
  const taskId = document.getElementById("task-id");
  const deleteTaskBtn = document.getElementById("delete-task-btn");

  const laneModal = document.getElementById("lane-modal");
  const closeLaneModal = document.getElementById("close-lane-modal");
  const laneForm = document.getElementById("lane-form");
  const laneTitle = document.getElementById("lane-title");
  const laneId = document.getElementById("lane-id");
  const deleteLaneBtn = document.getElementById("delete-lane-btn");

  let editingTask = null;
  let editingLane = null;

  addLaneBtn.onclick = () => openLaneModal();

  closeTaskModal.onclick = () => closeModal(taskModal);
  closeLaneModal.onclick = () => closeModal(laneModal);

  window.onclick = (event) => {
      if (event.target == taskModal) closeModal(taskModal);
      if (event.target == laneModal) closeModal(laneModal);
  };

  taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const id = taskId.value;
      const title = taskTitle.value;
      const desc = taskDesc.value;
      const laneId = taskLane.value;

      if (!title) return;

      if (id) {
          // Edit task
          const task = document.getElementById(id);
          task.querySelector(".task-title").innerText = title;
          task.querySelector(".task-desc").innerText = desc;
      } else {
          // Create task
          const newTask = document.createElement("div");
          const taskId = `task-${Date.now()}`;
          newTask.id = taskId;
          newTask.className = "task";
          newTask.draggable = true;
          newTask.innerHTML = `
              <p class="task-title">${title}</p>
              <p class="task-desc" style="display:none">${desc}</p>
          `;

          newTask.addEventListener("dblclick", (e) => {
              if (e.target.classList.contains("task-title")) {
                  openTaskModal(newTask);
              }
          });

          newTask.addEventListener("dragstart", () => newTask.classList.add("is-dragging"));
          newTask.addEventListener("dragend", () => newTask.classList.remove("is-dragging"));

          document.getElementById(laneId).appendChild(newTask);
      }

      closeModal(taskModal);
  });

  deleteTaskBtn.addEventListener("click", () => {
      if (editingTask) {
          editingTask.remove();
          closeModal(taskModal);
      }
  });

  laneForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const id = laneId.value;
      const title = laneTitle.value;

      if (!title) return;

      if (id) {
          // Edit lane
          const lane = document.getElementById(id);
          lane.querySelector(".heading").innerText = title;
      } else {
          // Create lane
          const newLane = document.createElement("div");
          const laneId = `lane-${Date.now()}`;
          newLane.id = laneId;
          newLane.className = "swim-lane";
          newLane.innerHTML = `
              <h3 class="heading">${title}</h3>
              <button class="add-task-btn">Add Task +</button>
          `;

          newLane.querySelector(".heading").addEventListener("dblclick", () => openLaneModal(newLane));
          newLane.querySelector(".add-task-btn").addEventListener("click", () => openTaskModal(null, laneId));

          lanesContainer.appendChild(newLane);

          updateTaskLaneOptions();
      }

      closeModal(laneModal);
  });

  deleteLaneBtn.addEventListener("click", () => {
      if (editingLane) {
          editingLane.remove();
          updateTaskLaneOptions();
          closeModal(laneModal);
      }
  });

  function openTaskModal(task = null, laneId = null) {
      if (task) {
          editingTask = task;
          taskId.value = task.id;
          taskTitle.value = task.querySelector(".task-title").innerText;
          taskDesc.value = task.querySelector(".task-desc").innerText;
          taskLane.value = task.parentElement.id;
          deleteTaskBtn.style.display = "block";
      } else {
          editingTask = null;
          taskId.value = "";
          taskTitle.value = "";
          taskDesc.value = "";
          taskLane.value = laneId || "";
          deleteTaskBtn.style.display = "none";
      }

      openModal(taskModal);
  }

  function openLaneModal(lane = null) {
      if (lane) {
          editingLane = lane;
          laneId.value = lane.id;
          laneTitle.value = lane.querySelector(".heading").innerText;
          deleteLaneBtn.style.display = "block";
      } else {
          editingLane = null;
          laneId.value = "";
          laneTitle.value = "";
          deleteLaneBtn.style.display = "none";
      }

      openModal(laneModal);
  }

  function openModal(modal) {
      modal.style.display = "block";
  }

  function closeModal(modal) {
      modal.style.display = "none";
  }

  function updateTaskLaneOptions() {
      taskLane.innerHTML = "";
      document.querySelectorAll(".swim-lane").forEach((lane) => {
          const option = document.createElement("option");
          option.value = lane.id;
          option.innerText = lane.querySelector(".heading").innerText;
          taskLane.appendChild(option);
      });
  }
});
