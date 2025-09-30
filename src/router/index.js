import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import ProjectSelect from "../views/ProjectSelect.vue";
import Dashboard from "../views/Dashboard.vue";
import Notes from "../views/Notes.vue";
import RecordingNote from "../views/RecordingNote.vue";
import NoteDone from "../views/NoteDone.vue";
import Calendar from "../views/Calendar.vue";
import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectSelect,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
  },
  {
    path: "/recording-note",
    name: "RecordingNote",
    component: RecordingNote,
  },
  {
    path: "/note-done/:id",
    name: "NoteDone",
    component: NoteDone,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
