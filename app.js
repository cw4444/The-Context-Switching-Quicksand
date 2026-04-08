const triggers = [
  {
    type: "Inbox receipt",
    tag: "Auto-parse",
    details: "PDF receipt from Hutton Supplies. Extract VAT, total, date, and vendor name.",
    sheet: { item: "Office paper", amount: "£48.00", category: "Ops" },
    account: "Filed to bookkeeping as expense #1842",
  },
  {
    type: "New invoice",
    tag: "Route to finance",
    details: "Invoice from Studio North. Match client, amount, and due date, then sync.",
    sheet: { item: "Brand workshop", amount: "£1,200.00", category: "Revenue" },
    account: "Drafted in accounting tool with due date set",
  },
  {
    type: "Booking email",
    tag: "Calendar link",
    details: "Discovery call request. Pull name, timezone, and preferred slot into calendar.",
    sheet: { item: "Discovery call", amount: "0", category: "Meetings" },
    account: "Event created, reminder sent, contact updated",
  },
];

const triggerList = document.getElementById("trigger-list");
const sheet = document.getElementById("sheet");
const accounting = document.getElementById("accounting");
const summary = document.getElementById("summary");
const template = document.getElementById("trigger-template");

function renderTriggers() {
  triggerList.innerHTML = "";
  triggers.forEach((trigger) => {
    const node = template.content.cloneNode(true);
    node.querySelector("strong").textContent = trigger.type;
    node.querySelector(".tag").textContent = trigger.tag;
    node.querySelector(".details").textContent = trigger.details;
    triggerList.appendChild(node);
  });
}

function renderOutput() {
  sheet.innerHTML = triggers
    .map(
      (trigger) => `
        <div class="sheet-row">
          <div><strong>${trigger.sheet.item}</strong><span>Item</span></div>
          <div><strong>${trigger.sheet.amount}</strong><span>Amount</span></div>
          <div><strong>${trigger.sheet.category}</strong><span>Category</span></div>
        </div>
      `,
    )
    .join("");

  accounting.innerHTML = triggers
    .map(
      (trigger) => `
        <div class="account-row">
          <strong>${trigger.type}</strong>
          <span>${trigger.account}</span>
        </div>
      `,
    )
    .join("");

  summary.innerHTML = `
    <div class="summary-row">
      <strong>${triggers.length} triggers processed</strong>
      <span>Admin Ghost parsed the inbox quietly in the background and updated the owner's records without any manual tab switching.</span>
    </div>
  `;
}

document.getElementById("scan-btn").addEventListener("click", renderOutput);

renderTriggers();
renderOutput();
