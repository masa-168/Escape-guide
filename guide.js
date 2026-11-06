"use strict";

const { skills, builds, tactics } = window.escapeGuide;
const skillById = new Map(skills.map((skill) => [skill.id, skill]));
const typeNames = { active: "アクティブ", passive: "パッシブ" };
const catalog = document.querySelector("#skill-list");
const detail = document.querySelector("#skill-detail");
const closeButton = detail.querySelector(".close-detail");
let returnFocus = null;

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function icon(skill) {
  const frame = element("span", "skill-icon");
  frame.style.setProperty("--accent", skill.color);
  const image = element("img");
  image.src = "./assets/icons/" + (skill.icon ?? skill.id) + ".png";
  image.alt = "";
  image.width = 32;
  image.height = 32;
  frame.append(image);
  return frame;
}

function detailLink(skill, className) {
  const link = element("a", className);
  link.href = "#skill/" + skill.id;
  link.dataset.skill = skill.id;
  link.setAttribute("aria-haspopup", "dialog");
  return link;
}

function skillTags(skill) {
  const tags = element("div", "skill-tags");
  tags.append(element("span", "type-tag " + skill.type, typeNames[skill.type]), element("span", "role-tag", skill.role));
  return tags;
}

function skillLinks(ids) {
  const list = element("ul", "skill-links");
  for (const id of ids) {
    const skill = skillById.get(id);
    const item = element("li");
    const link = detailLink(skill, "skill-link");
    link.append(icon(skill), element("span", "", skill.name));
    item.append(link);
    list.append(item);
  }
  return list;
}

function buildCard(build, index) {
  const card = element("article", "build-card");
  card.style.setProperty("--build-color", build.color);
  const heading = element("div", "build-index");
  const glyph = element("span", "build-glyph", build.glyph);
  glyph.setAttribute("aria-hidden", "true");
  heading.append(element("span", "", "LOADOUT " + String(index + 1).padStart(2, "0")), glyph);
  card.append(
    heading, element("p", "build-label", build.label), element("h3", "", build.name),
    element("p", "build-summary", build.summary), skillLinks(build.skills),
    element("p", "build-tactic", build.tactic)
  );
  return card;
}

function tacticCard(tactic) {
  const card = element("article", "tactic-card");
  card.append(skillLinks(tactic.skills), element("h3", "", tactic.title), element("p", "", tactic.text));
  return card;
}

function skillCard(skill, index) {
  const link = detailLink(skill, "skill-card");
  link.style.setProperty("--accent", skill.color);
  link.dataset.type = skill.type;
  const top = element("div", "skill-card-top");
  top.append(icon(skill), element("span", "skill-number", String(index + 1).padStart(2, "0")));
  const name = element("h3", "", skill.name);
  const arrow = element("span", "card-arrow", "↗");
  arrow.setAttribute("aria-hidden", "true");
  link.append(top, skillTags(skill), name, element("p", "", skill.summary), arrow);
  return link;
}

function statTable(skill) {
  const table = element("table", "stat-table");
  table.append(element("caption", "", "レベル別の性能"));
  const heading = table.createTHead().insertRow();
  for (const column of ["レベル", ...skill.columns]) {
    const cell = element("th", "", column);
    cell.scope = "col";
    heading.append(cell);
  }
  const body = table.createTBody();
  skill.values.forEach((values, index) => {
    const row = body.insertRow();
    const label = element("th", "", "Lv." + (index + 1));
    label.scope = "row";
    row.append(label);
    for (const value of values) row.insertCell().textContent = value;
  });
  return table;
}

function detailSection(title, description, className) {
  const section = element("section", className);
  section.append(element("h3", "", title), element("p", "", description));
  return section;
}

function showSkill(skill) {
  const heading = element("div", "detail-heading");
  const nameGroup = element("div");
  const title = element("h2", "", skill.name);
  title.id = "detail-title";
  nameGroup.append(skillTags(skill), title, element("p", "detail-game-id", skill.gameId));
  heading.append(icon(skill), nameGroup);
  const content = document.querySelector("#detail-content");
  content.replaceChildren(
    heading,
    detailSection("効果", skill.effect, "detail-section"),
    detailSection("強化", skill.upgrade, "detail-section"),
    statTable(skill)
  );
  if (skill.type === "active") {
    content.append(element("p", "stat-note", "再使用時間は無詠唱を含まない参考値です。小数第2位まで表示しています。"));
  }
  content.append(detailSection("立ち回り", skill.tip, "detail-tip"));
  if (!detail.open) detail.showModal();
  detail.scrollTop = 0;
}

function syncDetail() {
  const prefix = "#skill/";
  const skill = location.hash.startsWith(prefix) && skillById.get(location.hash.slice(prefix.length));
  if (skill) {
    if (!detail.open || detail.dataset.skill !== skill.id) {
      detail.dataset.skill = skill.id;
      showSkill(skill);
    }
  } else if (detail.open) {
    detail.close();
    const focusTarget = returnFocus || document.querySelector('[data-filter="all"]');
    returnFocus = null;
    // The browser may restore the fragment's focus after dispatching popstate.
    requestAnimationFrame(() => {
      if (!detail.open) focusTarget.focus({ preventScroll: true });
    });
  }
}

function dismissDetail() {
  if (history.state?.escapeSkill) {
    history.back();
  } else {
    history.replaceState(null, "", "#skills");
    document.querySelector("#skills").scrollIntoView();
    syncDetail();
  }
}

function applyFilter(type) {
  let visible = 0;
  for (const card of catalog.children) {
    card.hidden = type !== "all" && card.dataset.type !== type;
    if (!card.hidden) visible += 1;
  }
  for (const button of document.querySelectorAll("[data-filter]")) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === type));
  }
  document.querySelector("#result-count").textContent = "掲載" + skills.length + "種中 " + visible + "種を表示";
}

document.querySelector("#build-list").append(...builds.map(buildCard));
document.querySelector("#tactic-list").append(...tactics.map(tacticCard));
catalog.append(...skills.map(skillCard));
for (const [type, count] of Object.entries({
  total: skills.length,
  active: skills.filter((skill) => skill.type === "active").length,
  passive: skills.filter((skill) => skill.type === "passive").length
})) {
  for (const label of document.querySelectorAll("[data-" + type + "]")) {
    label.textContent = String(count).padStart(2, "0");
  }
}
applyFilter("all");

document.querySelector(".filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (button) applyFilter(button.dataset.filter);
});
document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-skill]");
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  returnFocus = link;
  history.pushState({ escapeSkill: true }, "", link.hash);
  syncDetail();
});
closeButton.addEventListener("click", dismissDetail);
detail.addEventListener("cancel", (event) => {
  event.preventDefault();
  dismissDetail();
});
let backdropPressed = false;
detail.addEventListener("pointerdown", (event) => {
  backdropPressed = event.target === detail;
});
detail.addEventListener("click", (event) => {
  if (backdropPressed && event.target === detail) dismissDetail();
  backdropPressed = false;
});
window.addEventListener("popstate", syncDetail);
window.addEventListener("hashchange", syncDetail);
syncDetail();
