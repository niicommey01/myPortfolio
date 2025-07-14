import React, { useState, useRef, useEffect } from "react";

// Terminal data and commands
const terminalData = {
  welcome: [
    {
      type: "output",
      value:
        "Welcome to Nii's portfolio. Type “help” or “\\h” to get help for commands",
    },
  ],
  help: [
    { type: "output", value: "about   \\a   -  Brings the information about Nii" },
    { type: "output", value: "contact \\c   -  Get Nii’s contact details" },
    { type: "output", value: "projects \\p  -  See projects Nii has worked on" },
    { type: "output", value: "clear   \\cls -  Clear the terminal" },
  ],
  about: [
    { type: "output", value: "Name: Jude Nii Klemesu Commey" },
    { type: "output", value: "Tagline: Aspiring Cybersecurity Professional & Backend Developer" },
    { type: "output", value: "" },
    { type: "output", value: "I'm a Computer Science student at the University of Ghana with a passion for cybersecurity and backend development. I enjoy building secure, user-focused applications using Django, .NET, and REST APIs. I’m currently expanding my skills in Python and exploring the cybersecurity landscape through hands-on projects and certifications." },
    { type: "output", value: "" },
    { type: "output", value: "I believe technology should empower and protect and I’m committed to helping individuals and organizations stay safe online." },
    { type: "output", value: "" },
    { type: "output", value: "Fun Fact: The stress from bugs entices me." }
  ],
  contact: [
    {
      type: "output",
      label: "Email",
      value: [
        { text: "jude.niicommey@outlook.com", href: "mailto:jude.niicommey@outlook.com" },
        { text: "jnkcommey@gmail.com", href: "mailto:jnkcommey@gmail.com" }
      ]
    },
    { type: "output", label: "Phone", value: "+233 209 365 355" },
    { type: "output", label: "Location", value: "Ofankor, Accra, Ghana" },
    {
      type: "output",
      label: "LinkedIn",
      value: { text: "Jude (Nii Klemesu) Commey", href: "https://linkedin.com/in/niicommey01" }
    },
    {
      type: "output",
      label: "GitHub",
      value: { text: "Nii Commey", href: "https://github.com/niicommey01" }
    }
  ],
  projects: [
    { type: "output", value: " - Fallen Angel – Online Clothing Brand Startup" },
    { type: "output", value: "   • Tech Stack: React, Django, PostgreSQL, REST APIs" },
    { type: "output", value: "   • Built backend with Django" },
    { type: "output", value: "   • Integrated Google & Facebook OAuth" },
    { type: "output", value: "   • Payment system via Paystack" },
    { type: "output", value: "   • Project still in progress" },
    { type: "output", value: "" },

    { type: "output", value: " - Task Tracker – CLI Version" },
    { type: "output", value: "   • Tech Stack: Python" },
    { type: "output", value: "   • Command-line interface for task management" },
    { type: "output", value: "   • Categorizes tasks and stores them in JSON" },
    { type: "output", value: "   • Prints task records to screen" },
    { type: "output", 
      label: " • Project Link",
      value: {text: "https://github.com/niicommey01/task-tracker", href: "https://github.com/niicommey01/task-tracker"} 
    },
    { type: "output", value: "" },

    // { type: "output", value: " - Airline Database" },
    // { type: "output", value: "  • Tech Stack: MySQL" },
    // { type: "output", value: "  • Designed ERD diagram" },
    // { type: "output", value: "  • Created relational tables using MySQL Workbench" },
    // { type: "output", value: "" },

    { type: "output", value: " - Task Tracker – Desktop App" },
    { type: "output", value: "  • Tech Stack: Python, PyQt5, JSON" },
    { type: "output", value: "  • Cross-platform desktop app (Linux & Windows)" },
    { type: "output", value: "  • Stores tasks in JSON" },
    { type: "output", value: "  • GUI built with PyQt5" },
    {
      type: "output",
      label: " • Project Link",
      value: {text: "https://github.com/niicommey01/Task-Tracker-App", href: "https://github.com/niicommey01/Task-Tracker-App"} 
    },
    { type: "output", value: "" },

    { type: "output", value: " -CauseHive - A donation platform" },
    { type: "output", value: "  • Tech Stack: React, Django, PostgreSQL, REST APIs" },
    { type: "output", value: "  • Built backend with Django" },
    { type: "output", value: "  • Integrated Google OAuth" },
    { type: "output", value: "  • Payment system via Paystack" },
    { type: "output", value: "  • Project still in progress" },
    { type: "output", value: "" },
  ],
};

const commands = {
  "help": "help",
  "\\h": "help",
  "about": "about",
  "\\a": "about",
  "contact": "contact",
  "\\c": "contact",
  "projects": "projects",
  "\\p": "projects",
  "clear": "clear",
  "\\cls": "clear",
};

const allCommands = [
  "help", "\\h", "about", "\\a", "contact", "\\c", "projects", "\\p", "clear", "\\cls"
];

// Rendering function for output lines
function renderOutputLine(item) {
  // Multiple links (e.g., emails)
  if (Array.isArray(item.value)) {
    return (
      <span>
        {item.label ? item.label + ": " : ""}
        {item.value.map((v, i) => (
          <React.Fragment key={i}>
            <a
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#7fff00", textDecoration: "underline" }}
            >
              {v.text}
            </a>
            {i < item.value.length - 1 ? " || " : ""}
          </React.Fragment>
        ))}
      </span>
    );
  }
  // Single link (LinkedIn, GitHub)
  if (item.value && typeof item.value === "object" && item.value.href) {
    return (
      <span>
        {item.label ? item.label + ": " : ""}
        <a
          href={item.value.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#7fff00", textDecoration: "underline" }}
        >
          {item.value.text}
        </a>
      </span>
    );
  }
  // Plain text
  return (
    <span>
      {item.label ? item.label + ": " : ""}
      {item.value}
    </span>
  );
}

function App() {
  const [history, setHistory] = useState([
    { type: "output", value: terminalData.welcome[0].value },
  ]);
  const [input, setInput] = useState("");
  const [caretPos, setCaretPos] = useState(0);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(true);

  const terminalEndRef = useRef(null);
  const inputLineRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, showHelp]);

  // Focus input when clicking anywhere on the input line
  useEffect(() => {
    if (isInputFocused && inputLineRef.current) {
      inputLineRef.current.focus();
    }
  }, [isInputFocused]);

  // Command history navigation and caret movement
  const handleFakeInputKeyDown = (e) => {
    const inputs = history.filter(h => h.type === "input").map(h => h.value);
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim() !== "") {
        handleCommand(input);
        setInput("");
        setCaretPos(0);
        setHistoryIndex(null);
      }
    } else if (e.key === "Backspace") {
      if (caretPos > 0) {
        setInput((prev) => prev.slice(0, caretPos - 1) + prev.slice(caretPos));
        setCaretPos((pos) => pos - 1);
      }
      setHistoryIndex(null);
      e.preventDefault();
    } else if (e.key === "Delete") {
      if (caretPos < input.length) {
        setInput((prev) => prev.slice(0, caretPos) + prev.slice(caretPos + 1));
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      setCaretPos((pos) => Math.max(0, pos - 1));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setCaretPos((pos) => Math.min(input.length, pos + 1));
      e.preventDefault();
    } else if (e.key === "Home") {
      setCaretPos(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setCaretPos(input.length);
      e.preventDefault();
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab completion
      const matches = allCommands.filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
        setCaretPos(matches[0].length);
      } else if (matches.length > 1) {
        // If multiple matches, show them as output
        setHistory((h) => [
          ...h,
          { type: "input", value: input },
          { type: "output", value: matches.join("    ") }
        ]);
      }
    } else if (e.key === "ArrowUp") {
      if (inputs.length === 0) return;
      const idx = historyIndex === null ? inputs.length - 1 : Math.max(0, historyIndex - 1);
      setInput(inputs[idx]);
      setCaretPos(inputs[idx].length);
      setHistoryIndex(idx);
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (inputs.length === 0) return;
      const idx = historyIndex === null ? inputs.length - 1 : Math.min(inputs.length - 1, historyIndex + 1);
      setInput(inputs[idx]);
      setCaretPos(inputs[idx].length);
      setHistoryIndex(idx);
      e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      setInput((prev) => prev.slice(0, caretPos) + e.key + prev.slice(caretPos));
      setCaretPos((pos) => pos + 1);
      setHistoryIndex(null);
      e.preventDefault();
    }
    // Ignore all other keys (Tab, etc.)
  };

  // Handle command
  const handleCommand = (cmd) => {
    const key = cmd.trim().toLowerCase();
    if (commands[key] === "clear") {
      setHistory([
        { type: "output", value: terminalData.welcome[0].value }
      ]);
      return;
    }
    if (commands[key]) {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        ...(terminalData[commands[key]] || []),
      ]);
    } else {
      setHistory((h) => [
        ...h,
        { type: "input", value: cmd },
        {
          type: "output",
          value: `Unknown command: ${cmd}. Type help or \\h for a list of commands.`,
        },
      ]);
    }
  };

  // Command suggestions
  const suggestions = input
    ? allCommands.filter((cmd) => cmd.startsWith(input) && cmd !== input)
    : [];

  // Render the input line with a blinking underscore at the caret position
  function renderInputLine() {
    const before = input.slice(0, caretPos);
    const after = input.slice(caretPos);
    return (
      <>
        {before}
        <span className={`terminal-underscore${isInputFocused ? " blink" : ""}`}>_</span>
        {after}
      </>
    );
  }

  return (
    <div className="terminal-bg">
      <div className="terminal-header">
        <span className="terminal-help" onClick={() => setShowHelp(true)}>?</span>
        <span className="terminal-title">Nii’s Portfolio</span>
        <span className="terminal-close" title="Close">×</span>
      </div>
      <div className="terminal-body">
        {history.map((item, idx) =>
          item.type === "input" ? (
            <div key={idx} className="terminal-input-line">
              <span className="terminal-caret">&gt;</span> {item.value}
            </div>
          ) : (
            <div key={idx} className="terminal-output-line">
              {renderOutputLine(item)}
            </div>
          )
        )}
        <form
          className="terminal-form"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="terminal-caret">&gt;</span>
          <div
            className="terminal-fake-input"
            tabIndex={0}
            ref={inputLineRef}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onKeyDown={handleFakeInputKeyDown}
            onClick={() => {
              setIsInputFocused(true);
              // Place caret at end if not already focused
              setCaretPos(input.length);
            }}
            spellCheck={false}
            aria-label="Terminal input"
          >
            {renderInputLine()}
          </div>
        </form>
        {suggestions.length > 0 && (
          <div className="terminal-suggestions">
            {suggestions.map((cmd) => (
              <div key={cmd} className="terminal-suggestion">{cmd}</div>
            ))}
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
      {showHelp && (
        <div className="terminal-help-overlay" onClick={() => setShowHelp(false)}>
          <div className="terminal-help-content" onClick={e => e.stopPropagation()}>
            <h2>Available Commands</h2>
            <ul>
              <li><b>about</b> or <b>\a</b> – About Nii</li>
              <li><b>contact</b> or <b>\c</b> – Contact details</li>
              <li><b>projects</b> or <b>\p</b> – Projects</li>
              <li><b>help</b> or <b>\h</b> – Help</li>
              <li><b>gitclear</b> or <b>\cls</b> – Clear terminal</li>
            </ul>
            <button onClick={() => setShowHelp(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;