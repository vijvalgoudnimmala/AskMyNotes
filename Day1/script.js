const fileInput = document.getElementById("fileInput");
const questionEl = document.getElementById("questionInput");
const askBtn = document.getElementById("askButton");
const signOutBtn = document.getElementById("signOutButton");
const uploadStatus = document.getElementById("uploadStatus");
const statusEl = document.getElementById("statusEl");
const answerEl = document.getElementById("answerEl");
const answerTextEl = document.getElementById("answerTextEl");
const qtypePill = document.getElementById("qtypePill");
const toolPill = document.getElementById("toolPill");
const sourcesEl = document.getElementById("sourcesEl");
const sourcesListEl = document.getElementById("sourcesListEl");

// Base look every pill shares: small mono badge, colored per-state below.
const PILL_BASE =
    "px-3 py-1 rounded-full text-xs font-mono font-medium border";

const QTYPE_COLORS = {
    definition: "bg-annotate/10 text-annotate border-annotate/30",
    example: "bg-highlighter/30 text-ink border-highlighter-deep/60",
    comparison: "bg-flag/10 text-flag border-flag/30"
};

const TOOL_COLORS = {
    search_notes: "bg-paper text-ink-soft border-rule",
    calculator: "bg-highlighter-deep/25 text-ink border-highlighter-deep/60"
};

signOutBtn.addEventListener("click", () => {
    window.location.href = "signup.html";
});

fileInput.addEventListener("change", () => {

    if(fileInput.files.length > 0){
        uploadStatus.innerHTML = `
            <span class="text-ink font-medium">
                <span class="bg-highlighter-deep px-1.5 py-0.5 rounded-[2px] -rotate-1 inline-block">Uploaded</span>
                ${fileInput.files[0].name}
            </span>
        `;
    }
    else{
        uploadStatus.innerHTML = `
            <span class="text-flag font-medium">
                Failed to upload notes
            </span>
        `;
    }
});

function resetAnswerUI(){
    answerEl.classList.add("hidden");
    answerTextEl.textContent = "";
    qtypePill.className = `hidden ${PILL_BASE}`;
    toolPill.className = `hidden ${PILL_BASE}`;
    sourcesEl.classList.add("hidden");
    sourcesListEl.innerHTML = "";
}
askBtn.addEventListener("click", () => {
    const question = questionEl.value.trim();
    if(fileInput.files.length === 0){
        statusEl.textContent =
        "Please upload your notes first.";

        statusEl.className =
        "text-sm font-mono text-flag mt-2 min-h-[1.25rem]";
        resetAnswerUI();
        return;
    }
    if(question === ""){
        statusEl.textContent =
        "Please type a question first.";

        statusEl.className =
        "text-sm font-mono text-flag mt-2 min-h-[1.25rem]";
        resetAnswerUI();
        return;
    }
    resetAnswerUI();
    statusEl.textContent = "Thinking...";

    statusEl.className =
    "text-sm font-mono text-ink-soft mt-2 min-h-[1.25rem]";

    setTimeout(() => {
        let placeholderType = "definition";
        const lowerQuestion = question.toLowerCase();
        if(lowerQuestion.startsWith("what is")){
            placeholderType = "definition";
        }
        else if(
            lowerQuestion.startsWith("give") ||
            lowerQuestion.includes("example")
        ){
            placeholderType = "example";
        }
        else if(
            lowerQuestion.includes("vs") ||
            lowerQuestion.includes("versus") ||
            lowerQuestion.includes("compare") ||
            lowerQuestion.includes("difference")
        ){
            placeholderType = "comparison";
        }
        let placeholderTool = "search_notes";
        const calculatorPattern = /^[0-9+\-*/().\s]+$/;
        if(calculatorPattern.test(question)){
            placeholderTool = "calculator";
        }
        const placeholderAnswer =
        `Placeholder answer for: "${question}". Real answers will appear here once the backend is connected.`;

        answerTextEl.textContent = placeholderAnswer;

        qtypePill.textContent =
        `type: ${placeholderType}`;

        qtypePill.className =
        `${PILL_BASE} ${QTYPE_COLORS[placeholderType]}`;

        toolPill.textContent =
        `tool: ${placeholderTool}`;

        toolPill.className =
        `${PILL_BASE} ${TOOL_COLORS[placeholderTool]}`;

        const source1 = document.createElement("li");
        source1.textContent =
        "Sample source chunk 1 — example excerpt from the uploaded notes.";
        const source2 = document.createElement("li");
        source2.textContent =
        "Sample source chunk 2 — another excerpt.";
        const source3 = document.createElement("li");

        source3.textContent =
        "Sample source chunk 3 — final excerpt.";
        sourcesListEl.appendChild(source1);
        sourcesListEl.appendChild(source2);
        sourcesListEl.appendChild(source3);

        if(placeholderTool === "calculator"){
            sourcesEl.classList.add("hidden");
        }
        else{
            sourcesEl.classList.remove("hidden");
        }
        answerEl.classList.remove("hidden");
        qtypePill.classList.remove("hidden");
        toolPill.classList.remove("hidden");
        statusEl.textContent = "";
    }, 600);
});
