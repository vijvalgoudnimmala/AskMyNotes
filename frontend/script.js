const fileInput = document.getElementById("fileInput");
const questionEl = document.getElementById("questionInput");
const askBtn = document.getElementById("askButton");
const uploadStatus = document.getElementById("uploadStatus");
const statusEl = document.getElementById("statusEl");
const answerEl = document.getElementById("answerEl");
const answerTextEl = document.getElementById("answerTextEl");
const qtypePill = document.getElementById("qtypePill");
const toolPill = document.getElementById("toolPill");
const sourcesEl = document.getElementById("sourcesEl");
const sourcesListEl = document.getElementById("sourcesListEl");

const QTYPE_COLORS = {
    definition: "bg-blue-100 text-blue-700",
    example: "bg-green-100 text-green-700",
    comparison: "bg-purple-100 text-purple-700"
};

fileInput.addEventListener("change", () => {

    if(fileInput.files.length > 0){
        uploadStatus.innerHTML = `
            <span class="text-green-600 font-medium">
                Uploaded: ${fileInput.files[0].name}
            </span>
        `;
    }
    else{
        uploadStatus.innerHTML = `
            <span class="text-red-600">
                Failed to upload notes
            </span>
        `;
    }
});

function resetAnswerUI(){
    answerEl.classList.add("hidden");
    answerTextEl.textContent = "";
    qtypePill.className =
    "hidden px-3 py-1 rounded-full text-sm font-medium";
    toolPill.className =
    "hidden px-3 py-1 rounded-full text-sm font-medium";
    sourcesEl.classList.add("hidden");
    sourcesListEl.innerHTML = "";
}
askBtn.addEventListener("click", () => {
    const question = questionEl.value.trim();
    if(fileInput.files.length === 0){
        statusEl.textContent =
        "Please upload your notes first.";

        statusEl.className =
        "text-sm text-red-500 mt-2 min-h-[1.25rem]";
        resetAnswerUI();
        return;
    }
    if(question === ""){
        statusEl.textContent =
        "Please type a question first.";

        statusEl.className =
        "text-sm text-red-500 mt-2 min-h-[1.25rem]";
        resetAnswerUI();
        return;
    }
    resetAnswerUI();
    statusEl.textContent = "Thinking...";

    statusEl.className =
    "text-sm text-gray-500 mt-2 min-h-[1.25rem]";

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
        `px-3 py-1 rounded-full text-sm font-medium ${QTYPE_COLORS[placeholderType]}`;

        toolPill.textContent =
        `tool: ${placeholderTool}`;

        toolPill.className =
        "px-3 py-1 rounded-full text-sm font-medium bg-slate-200 text-slate-700";
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